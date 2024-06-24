import React, { createContext, useState, useContext, useEffect, } from 'react';
import { useAuth } from "./AuthProvider";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { UserProfileType, Props } from "../interfaces/interfaces";

interface AuthDataContextType {
  logInUserProfile: UserProfileType | undefined,
  users: UserProfileType[],
}

const UsersDataContext = createContext<AuthDataContextType>(null!);

export function UsersDataProvider({ children }: Props) {
  const { currentUser, loading } = useAuth();
  const [logInUserProfile, setLogInUser] = useState<UserProfileType>();
  const [users, setUsers] = useState<UserProfileType[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  //Obtain data from firebase
  // useEffect(() => {
  //   async function getUsers() {
  //     const q = query(collection(db, "users"));
  //     const querySnapshot = await getDocs(q);
  //     const usersData: UserProfileType[] = querySnapshot.docs.map((doc) => ({
  //       ...(doc.data() as UserProfileType),
  //     }));
  //     setUsers(usersData);
  //     setLoaded(true)
  //   }
  //   getUsers();
  // }, [loading]);
  useEffect(() => {
    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const dataCollectionRef = collection(db, 'users')
    const unsubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData: UserProfileType[] = snapshot.docs.map((doc) => doc.data() as UserProfileType);
      // Update the component state with the new data
      setUsers(newData);
      // setUsers((prevData) => [...prevData, ...newData]);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array ensures the effect runs only once

  const currentLogInUser: UserProfileType | undefined = users.find(user => user.uid === currentUser?.uid)

  useEffect(() => {
    setLogInUser(currentLogInUser)
  })
  // }, [currentLogInUser])

  const value = {
    logInUserProfile,
    users,
    loaded
  };

  return (
    <UsersDataContext.Provider value={value}>{children}</UsersDataContext.Provider>
  );
}

export function useUsersData() {
  return useContext(UsersDataContext);
}