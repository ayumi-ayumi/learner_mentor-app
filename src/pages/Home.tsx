import { useState, useEffect } from "react";
import MapWindow from "../components/MapWindow";
import Navbar from "../components/Navbar";
import MarkerFilter from "../components/MarkerFilter";
import "../styles/Home.scss";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  //Obtain data from firebase
  useEffect(() => {
    const users = getDocs(collection(db, "users"));
    users.then((snap) => setUsers(snap.docs.map((doc) => ({ ...doc.data() }))));
  }, []);

  return (
    <>
      <Navbar users={users} />
      <MarkerFilter setFilter={setFilter}  />
      <MapWindow users={users} filter={filter} />
    </>
  );
}
