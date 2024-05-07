import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShowMap from "./components/ShowMap";
import Home from "./pages/Home";
import AddProfile from "./components/AddProfile";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker,
  useApiIsLoaded,
  APILoadingStatus,
  useApiLoadingStatus,
  useAutocomplete,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


export default function App() {
  return (
    <BrowserRouter>
      {/* <APIProvider > */}
      <APIProvider apiKey={API_KEY} libraries={["places"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<ShowMap />} /> */}
          <Route path="addprofile" element={<AddProfile />} />
        </Routes>
      </APIProvider>
    </BrowserRouter>
  );
}
