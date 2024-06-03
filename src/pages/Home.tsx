import { useState, useEffect } from "react";
import MapWindow from "../components/MapWindow";
import Navbar from "../components/Navbar";
import MarkerFilter from "../components/MarkerFilter";
import "../styles/Home.scss";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import React from "react";
import { UserProfile } from "../interfaces/interfaces";

export default function Home() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filter, setFilter] = useState<string>("all");

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

  return (
    <>
      <Navbar/>
      <MarkerFilter setFilter={setFilter} />
      <MapWindow users={users} filter={filter} />
    </>
  );
}
