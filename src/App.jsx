import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ShowMap from "./components/ShowMap";
import AddMyself from "./components/AddMyself";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ShowMap />} />
      <Route path="addmyself" element={<AddMyself />} />
    </Routes>
    </BrowserRouter>

  );
}
