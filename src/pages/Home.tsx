import { useState, useEffect, SetStateAction } from "react";
import MapWindow from "../components/MapWindow";
import Navbar from "../components/Navbar";
import MarkerFilter from "../components/MarkerFilter";
import "../styles/Home.scss";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import React from "react";
import { UserProfile } from "../interfaces/interfaces";
import { useAuth } from "../context/AuthProvider";

export default function Home() {
  const [filter, setFilter] = useState<string>("all");
  // const [users, setUsers] = useState<UserProfile[]>([]);
  // const [logInUser, setLogInUser] = useState<UserProfile>();

  // const { currentUser } = useAuth();


  //Obtain data from firebase
  // useEffect(() => {
  //   async function getUsers() {
  //     const q = query(collection(db, "users"));
  //     const querySnapshot = await getDocs(q);
  //     const usersData: UserProfile[] = querySnapshot.docs.map((doc) => ({
  //       ...(doc.data() as UserProfile),
  //     }));
  //     setUsers(usersData);
  //     setLogInUser(usersData.find(user=>user.uid === currentUser?.uid))

  //   }
  //   getUsers();
  // }, []);

  // useEffect(()=>{
  //   const LogInUser: UserProfile | undefined = users.find(user=>user.uid === currentUser?.uid)
  //  setLogInUser(LogInUser)
  // }, [users])

  return (
    <>
      {/* <Navbar logInUser={logInUser}/> */}
      <MarkerFilter setFilter={setFilter} />
      <MapWindow filter={filter} /> 
      {/* <MapWindow users={users} filter={filter} /> */}
    </>
  );
}
