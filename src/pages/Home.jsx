import React, { useState, useEffect, useRef, useCallback } from "react";
import MapWindow from "../components/MapWindow";
import Navbar from "../components/Navbar";
import MarkerFilter from "../components/MarkerFilter";
import "../styles/Home.scss";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [users, setUsers] = useState([]);

  //Obtain data from firebase
  useEffect(() => {
    const users = getDocs(collection(db, "users"));
    users.then((snap) => setUsers(snap.docs.map((doc) => ({ ...doc.data() }))));
  }, []);
  console.log(users)
  return (
    <>
      <Navbar />
      <MarkerFilter users={users}/>
      {/* <MapWindow users={users}/> */}
    </>
  );
}
