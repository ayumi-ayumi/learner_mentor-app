import { useState, useEffect } from "react";
import MapWindow from "../components/MapWindow";
import Navbar from "../components/Navbar";
import MarkerFilter from "../components/MarkerFilter";
import "../styles/Home.scss";
import { db } from "../firebase/BaseConfig";
import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import React from "react";
import { UserProfile } from "../interfaces/interfaces";

export default function Home() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filter, setFilter] = useState<string>("all");

  //Obtain data from firebase
  useEffect(() => {
    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    // users.then((snap) => setUsers(snap.docs.map((doc) => ({ ...doc.data() }))));
    // const querySnapshot = await getDocs(collection(db, "users"));
    // console.log(querySnapshot)
    //   try {
    //     const fetchedData = querySnapshot.docs.map(doc => doc.data())
    //     // setUsers(fetchedData)
    //     // setUsers(querySnapshot.docs.map(doc => doc.data()))
    //     // users.then((snap) => setUsers(snap.docs.map((doc) => ({ ...doc.data() }))));

    //   } catch (error) {
    //   console.error("Error fetching projects:", error);
    // throw new Error("Could not fetch projects"); 
    // }

    async function getUsers() {
      // setDocsLoading(true);
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const usersData: UserProfile[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as UserProfile),
        // id: doc.id,
      }));
      setUsers(usersData);
      // setDocsLoading(false);
    }

    getUsers();

  }, []);

  return (
    <>
      <Navbar users={users} />
      <MarkerFilter setFilter={setFilter} />
      <MapWindow users={users} filter={filter} />
    </>
  );
}


import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
