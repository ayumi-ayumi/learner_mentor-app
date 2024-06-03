import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { auth } from "./firebase/BaseConfig";
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, } from "firebase/auth";

type UserType = User | null;

interface Props {
  children?: ReactNode;
}

interface AuthContextType {
  createUser: (email: string, password: string) => Promise<UserCredential>,
  loginUser: (email: string, password: string) => Promise<UserCredential>,
  logOut: () => Promise<void>,
  currentUser: User | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const authValue = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    createUser,
    loginUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
