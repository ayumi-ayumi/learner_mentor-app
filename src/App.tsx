import { Routes, Route, useNavigate, } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/Home";
import AddProfile from "./components/AddProfile";
import { APIProvider } from "@vis.gl/react-google-maps";
import { AuthProvider, useAuth } from "./AuthProvider";
import ErrorPage from "./Error";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import RequireAuth from "./Auth/RequireAuth";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.currentUser) {
      navigate("/");
    }
  }, [auth]);

  return (
    <AuthProvider>
      <APIProvider apiKey={API_KEY} libraries={["places"]}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path={`/signup`} element={<SignUp />} />
          <Route path={`/signin`} element={<SignIn />} />
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
  );
}
