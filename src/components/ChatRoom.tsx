import React, { useEffect, useRef, useState } from 'react'
import ChatMsgInput from './ChatMsgInput'
import { db } from '../firebase/BaseConfig';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAuth } from '../context/AuthProvider';
import { avaterImgs } from '../Props/props';
import '../styles/Chat.scss'

export default function ChatRoom() {
  const scroll = useRef();
  const { currentUser, logInUserProfile } = useAuth();

  //Fetch messages
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy("createdAt"), limit(25));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // const fetchedMessages = snapshot.docs.map((doc) => console.log(doc.id));
      const fetchedMessages = snapshot.docs.map((doc) =>  ({...doc.data(), id: doc.id}));
      setMessages(fetchedMessages);
    });
    return () => unsubscribe();
  }, []);

  console.log(messages)

  // const showDescription = (src) => {
  //   const desc = avaterImgs.filter(img => img.src === src).map(el => el.description).toString()
  //   return desc
  // }

  return (
    <div>
      <div className="msgs">
        {messages.map(({ id, uid, text, photoURL }) => (
          <div 
          key={id} 
          className={`msg ${uid === currentUser?.uid ? "sent" : "received"}`}
          >
            <img src={photoURL}/>
            {/* <img src={photoURL} alt={showDescription(photoURL)} /> */}
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div ref={scroll}></div>
      <ChatMsgInput scroll={scroll} />
    </div>
  )
}

