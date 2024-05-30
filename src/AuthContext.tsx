import React, { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "./firebase/BaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";

type UserType = User | null;

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  currentUser: {} as User | null,
  setCurrentUser: () => { },
  loading: {} as boolean,
  // setCurrentUser: (user: User) => { },
  setLoading: () => { },
});

export default function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, [currentUser]);

  console.log(currentUser);

  const authValue = {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };