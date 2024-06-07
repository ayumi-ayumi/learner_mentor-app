import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from "./AuthProvider";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { UserProfile } from "../interfaces/interfaces";

interface Props {
  children?: ReactNode;
}

interface AuthDataContextType {
  logInUser: UserProfile | null,
  setLogInUser: React.Dispatch<React.SetStateAction<UserProfile | undefined>>,
  users: UserProfile[],
  setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>
}

const UsersDataContext = createContext<AuthDataContextType>();

export function UsersDataProvider({ children }: Props) {

  const { currentUser } = useAuth();
  const [logInUser, setLogInUser] = useState<UserProfile>();
  const [users, setUsers] = useState<UserProfile[]>([]);

  // console.log(currentUser)


  //Obtain data from firebase
  useEffect(() => {
    console.log(123)
    async function getUsers() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const usersData: UserProfile[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as UserProfile),
      }));
      setUsers(usersData);
      // const login = usersData.find(user => user.uid === currentUser?.uid)
      // setLogInUser(login)
      // setLogInUser(usersData.find(user => user.uid === currentUser?.uid))
    }
    getUsers();
    
  }, []);

    useEffect(()=>{
      console.log(456)
    const login: UserProfile | undefined = users.find(user=>user.uid === currentUser?.uid)
   setLogInUser(login)
  }, [users])

  const value = {
    logInUser,
    // setLogInUser,
    users,
    // setUsers
  };

  console.log(value)
  return (
    <UsersDataContext.Provider value={value}>{children}</UsersDataContext.Provider>
  );
}

export function useUsersData() {
  return useContext(UsersDataContext);
}