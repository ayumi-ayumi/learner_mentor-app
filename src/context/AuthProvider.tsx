import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/BaseConfig";
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, } from "firebase/auth";
import { db } from "../firebase/BaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { UserProfileType, Props } from "../interfaces/interfaces";

type UserType = User | null;

interface AuthContextType {
  createUser: (email: string, password: string) => Promise<UserCredential>,
  loginUser: (email: string, password: string) => Promise<UserCredential>,
  logOut: () => Promise<void>,
  currentUser: UserType,
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  logInUserProfile: UserProfileType | undefined,
  users: UserProfileType[],
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserType>(null); //email, password, uid
  const [logInUserProfile, setLogInUserProfile] = useState<UserProfileType>();
  const [users, setUsers] = useState<UserProfileType[]>([]);

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Watch if an user is signed in or out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    // return unsubscribe;
    return () => unsubscribe();
    
  }, []);

  //Obtain data from firebase by onSnapshot
  const dataCollectionRef = collection(db, 'users')
  useEffect(() => {
    const unsubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
      const newData: UserProfileType[] = snapshot.docs.map((doc) => doc.data() as UserProfileType);
      setUsers(newData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const currentLogInUser: UserProfileType | undefined = users.find(user => user.uid === currentUser?.uid)
    setLogInUserProfile(currentLogInUser)
  }, [currentUser, users])

  const authValue = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    createUser,
    loginUser,
    logOut,
    logInUserProfile,
    users,
  };

  return (
    <AuthContext.Provider value={authValue}>{!loading && children}</AuthContext.Provider>
    // <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
