import React, { useEffect, useRef, useState } from 'react'
import ChatMsgInput from './ChatMsgInput'
import { db } from '../firebase/BaseConfig';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAuth } from '../context/AuthProvider';
import { avaterImgs } from '../Props/props';
import '../styles/Chat.scss'
import { messageType } from '../interfaces/interfaces';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function ChatRoom() {
  const scroll = useRef();
  const { currentUser, logInUserProfile } = useAuth();

  //Fetch messages
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy("createdAt"), limit(25));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log(snapshot.docs.map((doc) => console.log(doc.data().text)))
      // console.log(123)
      // const fetchedMessages = snapshot.docs.map((doc) => console.log(doc.id));
      // const fetchedMessages:messageType[] = snapshot.docs.map((doc) =>  ({...doc.data()}));
      const fetchedMessages:messageType[] = snapshot.docs.map((doc) =>  ({...doc.data(), id: doc.id}));
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
      {/* <div className="msgs"> */}
      <Box
      className="msgs"
      // sx={{
      //   display: 'flex',
      //   flexWrap: 'wrap',
      //   '& > :not(style)': {
      //     m: 4,
      //     width: "80%",
      //     height: 800,
      //   },
      // }}
    >
      <Paper elevation={3}>
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
      <div ref={scroll}></div>
      <ChatMsgInput scroll={scroll} />
      </Paper>
        {/* </div> */}
        </Box>
    </div>
  )
}

