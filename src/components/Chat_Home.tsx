import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat_new'
import { useAuth } from '../context/AuthProvider';
import { useLocation, useParams } from 'react-router-dom';

export default function Chat_Home () {
  const { users } = useAuth();
  const location = useLocation()
  const [uid, setUid]
    = useState(location.state.uid)
  const sendTo = users.find((user) => user.uid === uid);
  console.log(sendTo)

  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}
