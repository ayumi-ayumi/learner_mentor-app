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
  const [currentUser, setCurrentUser] = useState<UserType>(null); //email, password, uid
  const [loading, setLoading] = useState<boolean>(true);
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
      // if (user) {
        // setCurrentUser(user);
        // setLoading(false);
      // } else {
      //   setCurrentUser(null);
      // }
        setCurrentUser(user);
        setLoading(false);
      console.log(user)
    });
    return unsubscribe;
  }, []);

    //Obtain data from firebase by onSnapshot
  const dataCollectionRef = collection(db, 'users')
  useEffect(() => {
    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const unsubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData: UserProfileType[] = snapshot.docs.map((doc) => doc.data() as UserProfileType);
      
      // Update the component state with the new data
      setUsers(newData);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array ensures the effect runs only once

    //Obtain data from firebase
  // useEffect(() => {
  //   async function getUsers() {
  //     const q = query(collection(db, "users"));
  //     const querySnapshot = await getDocs(q);
  //     const usersData: UserProfileType[] = querySnapshot.docs.map((doc) => ({
  //       ...(doc.data() as UserProfileType),
  //     }));
  //     setUsers(usersData);
  //     const currentLogInUser: UserProfileType | undefined = usersData.find(user => user.uid === currentUser?.uid)
  //   setLogInUserProfile(currentLogInUser)


  //   }
  //   getUsers();
  // }, [currentUser]);

  useEffect(() => {
    const currentLogInUser: UserProfileType | undefined = users.find(user => user.uid === currentUser?.uid)
    setLogInUserProfile(currentLogInUser)
  }, [loading])

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
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
