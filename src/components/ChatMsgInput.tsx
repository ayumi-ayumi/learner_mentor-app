import { Input } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase/BaseConfig";
import '../styles/ChatMsgInput.scss';


import SendIcon from "@mui/icons-material/Send";
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

export default function ChatMsgInput({ scroll }) {
  const [message, setMessage] = useState("");
  const { currentUser, logInUserProfile } = useAuth(); //uid

  function sendMessage(e) {
    e.preventDefault();
    // const messagesRef = doc(db, 'messages', currentUser.uid)
    const messagesRef = collection(db, "messages");
    // setDoc(messagesRef,{
    addDoc(messagesRef, {
      text: message,
      avatar: logInUserProfile?.avatar,
      uid: logInUserProfile?.uid,
      createdAt: serverTimestamp(),
      created_by: logInUserProfile?.uid
    })
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="sendMsg">
      <form onSubmit={sendMessage}>
        <div>
          <Input
            style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            placeholder="..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <button type="submit" disabled={!message}>🕊️</button> */}
          <button type="submit" disabled={!message}><SendIcon style={{ color: "#7AC2FF", marginLeft: "20px" }} /></button>
        </div>
      </form>
    </div>
  )
}

