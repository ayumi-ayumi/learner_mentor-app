import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat_new'

export default function Chat_Home () {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}
