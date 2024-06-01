import { BrowserRouter, Routes, Route, useNavigate, } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import AddProfile from "./components/AddProfile";
import { APIProvider } from "@vis.gl/react-google-maps";
import {AuthProvider,  useAuth } from "./AuthProvider";
import ErrorPage from "./Error";
import Auth from "./Auth/Auth";
import RequireAuth from "./Auth/RequireAuth";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
  // const { currentUser } = useContext(AuthContext);
  const auth = useAuth();
  
  
  // const { currentUser } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    // console.log(auth)
    if (auth?.currentUser) {
      navigate("/home");
    }
  }, [auth]);

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
          {/* <Route path="*" element={<ErrorPage />} /> */}
          <Route path={`/login`} element={<Auth />} />
          {/* <Route
            path={`/home`}
            element={auth?.currentUser ? <Home /> : <Auth />}
          /> */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="addprofile" element={<AddProfile />} />
        </Routes>
      </APIProvider>
    </AuthProvider>
    // </BrowserRouter> 
  );
}
