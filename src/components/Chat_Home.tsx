import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat_new'
import { useAuth } from '../context/AuthProvider';
import { useLocation, useParams } from 'react-router-dom';

export default function Chat_Home() {
  const { users } = useAuth();
  const location = useLocation()
  const [sendTo, setSendTo] = useState()
  const [uid, setUid] = useState()


  useEffect(() => {
    if (location.state) {
      console.log(location.state)
      setUid(location.state.uid)
      const sendTo = users.find((user) => user.uid === uid);
      setSendTo(sendTo)
    }
  }, [uid]);



  return (
    <div className='home'>
      <div className="container">
        <Sidebar sendTo={sendTo}/>
        <Chat />
      </div>
    </div>
  )
}
