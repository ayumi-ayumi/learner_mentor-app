import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ShowMap from "./components/ShowMap";
import AddProfile from "./components/AddProfile";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ShowMap />} />
      <Route path="addprofile" element={<AddProfile />} />
    </Routes>
    </BrowserRouter>

  );
}
