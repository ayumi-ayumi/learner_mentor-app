import React, { useState, useEffect } from "react";

import { avatarImgs } from '../Props/props'
import '../styles/ShowAvatar.scss'

export default function ShowAvatar({ setAvatar, defaultAvatar }) {

  const [selected, setSelected] = useState(defaultAvatar)

  useEffect(() => {
    if (selected) setSelected(selected);
  }, [])

  function handleClick(src) {
    setAvatar(src)
    setSelected(src)
  }

  return (
    <>
      <div className='avatar-container'>
        {avatarImgs.map((avatar) => (
          <div key={avatar.id}>
            <img src={avatar.src} onClick={() => handleClick(avatar.src)} className={avatar.src == selected ? 'selected_avatarImg' : 'avatarImg'} />
          </div>))
        }
      </div>
    </>
  )
}

