import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat_new'
import { useLocation } from 'react-router-dom';

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
