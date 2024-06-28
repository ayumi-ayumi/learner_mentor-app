import React, { useEffect, useRef, useState } from 'react'
import ChatMsgInput from './ChatMsgInput'

export default function ChatRoom() {
  const scroll = useRef();
  const { currentUser, logInUserProfile } = useAuth();

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <div>
      <div className="msgs">
        {messages.map(({ id, text, photoURL, uid }) => (
          <div key={id} className={`msg ${uid === currentUser.uid ? "sent" : "received"}`}>
            <img src={photoURL} alt="" />
            <p>{text}</p>
          </div>
        ))}
      </div>
      <ChatMsgInput scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  )
}

