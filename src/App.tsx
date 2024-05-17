import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProfile from "./components/AddProfile";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
  return (
    <BrowserRouter>
      <APIProvider apiKey={API_KEY} libraries={["places"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="addprofile" element={<AddProfile />} />
        </Routes>
      </APIProvider>
    </BrowserRouter>
  );
}
