import React, { useEffect, useRef, useState } from 'react'
import ChatMsgInput from './ChatMsgInput'
import { db } from '../firebase/BaseConfig';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAuth } from '../context/AuthProvider';
import { avatarImgs } from '../Props/props';
import '../styles/ChatRoom.scss'
import { messageType } from '../interfaces/interfaces';
import { Paper, Container } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation, useParams } from 'react-router-dom';

export default function ChatRoom() {
  const scroll = useRef();
  const { currentUser, logInUserProfile } = useAuth();
  const params = useParams();
  const location = useLocation()
  const [uid, setUid]
    = useState(location.state.uid)
  // = useState<{ uid: string }>(location.state as { uid: string })
  //Fetch messages
  const [messages, setMessages] = useState([]);
  const { users } = useAuth();

  // const sendTo = users.map((user) => console.log(typeof(user.uid)));
  const sendTo = users.find((user) => user.uid === uid);

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy("createdAt"));
    // const q = query(messagesRef, orderBy("createdAt"), limit(25));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages: messageType[] = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(fetchedMessages);
    });
    return () => unsubscribe();
  }, []);


  // const showDescription = (src) => {
  //   const desc = avatarImgs.filter(img => img.src === src).map(el => el.description).toString()
  //   return desc
  // }

  return (
    <div>
      <div className="chat-container">
        {/* <Paper elevation={3} className="msgs paper"> */}
        <div className="sentToName">
          <div><img src='../avatars/avatar10.svg'/></div>
          <div>{sendTo?.name}</div>
        </div>
        <div className="chat-display">
          {messages.map(({ id, uid, text, avatar }) => (
            <div
              key={id}
              className={`msg ${uid === currentUser?.uid ? "sent" : "received"}`}
            >
              <img src={`../${avatar}`} alt='pic' />
              {/* <img src={avatar} alt={showDescription(avatar)} /> */}
              <p>{text}</p>
            </div>
          ))}
        </div>
        <ChatMsgInput scroll={scroll} />
        <div ref={scroll}></div>
        {/* </Paper> */}
      </div>
    </div>
  )
}

