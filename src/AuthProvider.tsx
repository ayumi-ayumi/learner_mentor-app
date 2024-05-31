import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { auth } from "./firebase/BaseConfig";
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";

// type UserType = User | null;

// interface AuthContextType {
//   signin: (user: string, callback: VoidFunction) => void;f
//   signout: (callback: VoidFunction) => void;
//   currentUser: {} as User | null,
//   setCurrentUser: () => { },
//   loading: {} as boolean,
//   setLoading: () => { },
// }

// export const AuthContext = createContext<AuthContextType>(null!);

// export default function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const loginUser = (email, password) => {
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

//   console.log(currentUser);

//   const authValue = {
//     currentUser,
//     setCurrentUser,
//     loading,
//     setLoading,
//   };

//   return (
//     <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
//   );
// }
type UserType = User | null;

interface Props {
  children?: ReactNode;
}


interface AuthContextType {
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  currentUser: User | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line prefer-const
// let AuthContext = createContext<AuthContextType>(null!);
const AuthContext = createContext<AuthContextType>(null!);


export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
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
        // console.log(user)
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  // console.log(currentUser);

  const authValue = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    createUser,
    loginUser,
    logOut,
  };

  // console.log(authValue);
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
