import { Input } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase/BaseConfig";


import SendIcon from "@mui/icons-material/Send";
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

export default function ChatMsgInput({ scroll }) {
  const [message, setMessage] = useState("");
  const { currentUser, logInUserProfile } = useAuth(); //uid

  function sendMessage(e) {
    e.preventDefault();
    console.log("submitting")
    const messagesRef = collection(db, "messages");
    addDoc(messagesRef,{
      text: message,
      photoURL: logInUserProfile?.avater,
      uid: logInUserProfile?.uid,
      createdAt: serverTimestamp(),
    })
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
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

