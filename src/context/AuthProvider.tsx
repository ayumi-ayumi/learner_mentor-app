import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/BaseConfig";
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, } from "firebase/auth";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { UserProfile, Props } from "../interfaces/interfaces";

// interface AuthDataContextType {
//   logInUser: UserProfile | undefined,
//   users: UserProfile[],
// }

type UserType = User | null;

interface AuthContextType {
  createUser: (email: string, password: string) => Promise<UserCredential>,
  loginUser: (email: string, password: string) => Promise<UserCredential>,
  logOut: () => Promise<void>,
  currentUser: UserType,
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  logInUser: UserProfile | undefined,
  users: UserProfile[],
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<UserType>(null); //email, password, uid
  const [loading, setLoading] = useState<boolean>(true);

  const [logInUser, setLogInUser] = useState<UserProfile>();
  const [users, setUsers] = useState<UserProfile[]>([]);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  //Obtain data from firebase
  useEffect(() => {
    async function getUsers() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const usersData: UserProfile[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as UserProfile),
      }));
      setUsers(usersData);
    }
    getUsers();
  }, [loading]);

  const currentLogInUser: UserProfile | undefined = users.find(user => user.uid === currentUser?.uid)
  
  useEffect(() => {
    setLogInUser(currentLogInUser)
  })


  const authValue = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    createUser,
    loginUser,
    logOut,
    logInUser,
    users,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
// const AuthContext = createContext<AuthContextType>(null!);

// export function AuthProvider({ children }: Props) {
//   const [currentUser, setCurrentUser] = useState<UserType>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const createUser = (email: string, password: string) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const loginUser = (email: string, password: string) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {

//       if (user) {
//         setCurrentUser(user);
//         setLoading(false);
//       } else {
//         setCurrentUser(null);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   const authValue = {
//     currentUser,
//     setCurrentUser,
//     loading,
//     setLoading,
//     createUser,
//     loginUser,
//     logOut,
//   };

//   return (
//     <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
