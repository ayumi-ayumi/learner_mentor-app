import React, { createContext, useState, useContext, useEffect, } from 'react';
import { useAuth } from "./AuthProvider";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { UserProfile, Props } from "../interfaces/interfaces";

interface AuthDataContextType {
  logInUser: UserProfile | undefined,
  users: UserProfile[],
}

const UsersDataContext = createContext<AuthDataContextType>(null!);

export function UsersDataProvider({ children }: Props) {
  const { currentUser } = useAuth();
  const [logInUser, setLogInUser] = useState<UserProfile>();
  const [users, setUsers] = useState<UserProfile[]>([]);

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
  }, []);

  const currentLogInUser: UserProfile | undefined = users.find(user => user.uid === currentUser?.uid)
  
  useEffect(() => {
    setLogInUser(currentLogInUser)
  }, [currentLogInUser])

  const value = {
    logInUser,
    users,
  };

  return (
    <UsersDataContext.Provider value={value}>{children}</UsersDataContext.Provider>
  );
}

export function useUsersData() {
  return useContext(UsersDataContext);
}