import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../context/AuthProvider";
import { ChatContext } from "../context/ChatContext";
import { db } from '../firebase/BaseConfig';


export default function Chats (props) {
  const [chats, setChats] = useState([]);
  const [clickedUser, setClickedUser] = useState("");  //the data of clicked user
  const { currentUser, users } = useAuth();
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

    useEffect(() => {
    const clickedUserData = users.find(user => user.uid === props.sendTo)
    setClickedUser(clickedUserData);
    if (clickedUser) handleSelect({photoURL: clickedUser.photoURL, displayName: clickedUser.name, uid: props.sendTo})
  },[]);

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={`../${chat[1].userInfo.photoURL}`} alt="" />
          {/* <img src={chat[1].userInfo.photoURL} alt="" /> */}
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
