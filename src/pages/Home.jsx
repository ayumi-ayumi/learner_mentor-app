import React from 'react'
import MapWindow from '../components/MapWindow'
import Navbar from '../components/Navbar'
import MarkerFilter from '../components/MarkerFilter'


export default function Home() {
  return (
    <>
    <Navbar />
    <MarkerFilter />
    <MapWindow />
    </>
  )
}
