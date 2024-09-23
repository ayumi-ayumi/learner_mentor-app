import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
// import { db } from "../firebase";
import { db } from '../firebase/BaseConfig';

// import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../context/AuthProvider";



export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState();
  // const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // const { currentUser } = useContext(AuthContext);
  const { currentUser } = useAuth();


  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      // const querySnapshot = await getDocs(q);
      // const userData = querySnapshot.forEach((doc) => doc.data());
      // console.log(userData)
      // setUser(userData);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err)
      setErr(true);
    }
  };

  console.log(user)

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    // try {
    //   const res = await getDoc(doc(db, "chats", combinedId));

    //   if (!res.exists()) {
    //     //create a chat in chats collection
    //     console.log(123)
    //     await setDoc(doc(db, "chats", combinedId), { messages: [] });

    //     //create user chats
    //     await updateDoc(doc(db, "userChats", currentUser.uid), {
    //       [combinedId + ".userInfo"]: {
    //         uid: user.uid,
    //         displayName: user.displayName,
    //         photoURL: user.photoURL,
    //       },
    //       [combinedId + ".date"]: serverTimestamp(),
    //     });

    //     await updateDoc(doc(db, "userChats", user.uid), {
    //       [combinedId + ".userInfo"]: {
    //         uid: currentUser.uid,
    //         displayName: currentUser.displayName,
    //         photoURL: currentUser.photoURL,
    //       },
    //       [combinedId + ".date"]: serverTimestamp(),
    //     });
    //   }
    // } catch (err) {
    //   console.log(err)
    // }


    // try {
    const res = await getDoc(doc(db, "chats", combinedId));
    if (!res.exists()) {
      //create a chat in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });
      console.log(combinedId)

      //create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
    // } catch (err) {
    // console.log(err)
    // }
    // setUser(null);
    // setUsername("")
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        // <div className="userChat">
        <div className="userChat" onClick={handleSelect}>
          <img src={`../${user.photoURL}`}alt="" />
          {/* <img src={user.photoURL} alt="" /> */}
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
