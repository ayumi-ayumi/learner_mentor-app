import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ShowMap from "./components/ShowMap";
import Test from "./components/Test";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ShowMap />} />
      <Route path="/test" element={<Test />} />
    </Routes>
    </BrowserRouter>

  );
}
