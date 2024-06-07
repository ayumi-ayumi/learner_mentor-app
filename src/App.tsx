import { Routes, Route, useNavigate, } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import AddProfile from "./components/AddProfile";
import { APIProvider } from "@vis.gl/react-google-maps";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import ErrorPage from "./Error";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import RequireAuth from "./Auth/RequireAuth";
import Layout from "./Layout";
import { UsersDataProvider } from "./context/UsersProvider";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const signup = {signedUp: signedUp, setSignedUp: setSignedUp}

  // const auth = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (auth?.currentUser) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <AuthProvider>
      <UsersDataProvider>
        <APIProvider apiKey={API_KEY} libraries={["places"]}>
          <Routes>
            <Route path={`/signup`} element={<SignUp signupProps={signup}/>} />
            <Route path={`/signin`} element={<SignIn signupProps={signup}/>} />
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route path="addprofile" element={<AddProfile />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </APIProvider>
      </UsersDataProvider>
    </AuthProvider>
  );
}
