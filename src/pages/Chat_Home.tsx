import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Chat/Sidebar'
import Chat from '../components/Chat/Chat'

export default function Chat_Home() {
  const location = useLocation()
  const [sendTo, setSendTo] = useState()

  useEffect(() => {
    if (location.state) setSendTo(location.state.uid)
  }, []);

  return (
    <div className='home'>
      <div className="container">
        <Sidebar sendTo={sendTo}/>
        <Chat />
      </div>
    </div>
  )
}
