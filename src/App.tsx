import { BrowserRouter, Routes, Route, useNavigate, } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import AddProfile from "./components/AddProfile";
import { APIProvider } from "@vis.gl/react-google-maps";
import AuthProvider, { AuthContext } from "./AuthContext";
import ErrorPage from "./Error";
import Auth from "./Auth/Auth";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(currentUser)

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, []);

  // return (
  //   <BrowserRouter>
  //       <APIProvider apiKey={API_KEY} libraries={["places"]}>
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="addprofile" element={<AddProfile />} />
  //         </Routes>
  //       </APIProvider>
  //    </BrowserRouter>
  // );
  return (
    // <BrowserRouter>
      <AuthProvider>
        <APIProvider apiKey={API_KEY} libraries={["places"]}>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path={`/`} element={<Auth />} />
            <Route
            path={`/home`}
            element={currentUser ? <Home /> : <Auth />}
          />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="addprofile" element={<AddProfile />} />
          </Routes>
        </APIProvider>
     </AuthProvider>
     // </BrowserRouter> 
  );
}
