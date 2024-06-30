import React from 'react'
import { avaterImgs } from '../Props/props'
import '../styles/ShowAvater.scss'

export default function ShowAvater({ setAvater, defaultAvater }) {
  return (
    <>
    <div className='avater-container'>
      {avaterImgs.map((avater) => (
        <div key={avater.id} onClick={()=>setAvater(avater.src)}>
          <img src={avater.src} className='avaterImg' />
        </div>))
      }
    </div>
    </>
  )
}

