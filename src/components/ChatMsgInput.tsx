import { Input } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { db } from "../firebase/BaseConfig";


import SendIcon from "@mui/icons-material/Send";
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

export default function ChatMsgInput({ scroll }) {
  const [message, setMessage] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    const { currentUser } = useAuth(); //uid

    const messagesRef = doc(collection(db, "messages"));
    addDoc(messagesRef,{
      text: message,
      photoURL: currentUser.avater,
      uid: currentUser?.uid,
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
          <SendIcon style={{ color: "#7AC2FF", marginLeft: "20px" }} />
        </div>
      </form>
    </div>
  )
}

