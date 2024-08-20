import React, { useState, useEffect } from "react";

import { avaterImgs } from '../Props/props'
import '../styles/ShowAvater.scss'

export default function ShowAvater({ setAvater, defaultAvater }) {

  const [selected, setSelected] = useState(defaultAvater)

  useEffect(() => {
    if (selected) setSelected(selected);
  }, [])

  function handleClick (src) {
    setAvater(src)
    setSelected(src)
  }

  return (
    <>
    <div className='avater-container'>
      {avaterImgs.map((avater) => (
        <div key={avater.id}>
          <img src={avater.src} onClick={()=>handleClick(avater.src)} className={avater.src == selected ? 'selected_avatarImg':'avaterImg'} />
        </div>))
      }
    </div>
    </>
  )
}

