import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import FormProfile from "./components/FormProfile";
import MyProfile from "./components/MyProfile";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useAuth } from "./context/AuthProvider";
import ErrorPage from "./Error";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import RequireAuth from "./Auth/RequireAuth";
import Layout from "./Layout";
import AddCafe from "./components/AddCafe";
import { defaultValues } from "./Props/props";
import Chatroom from './components/ChatRoom'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
  const { logInUserProfile } = useAuth();
  const location = useLocation()

  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <Routes>
        <Route path={`/signup`} element={<SignUp />} />
        <Route path={`/signin`} element={<SignIn />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path={"/chat/:sendTo"} element={<Chatroom />} />
          {/* <Route path={`/chat`} element={<Chatroom />} /> */}
          <Route path="myprofile" element={<MyProfile />} />
          {/* <Route path="addprofile" element={<FormProfile/>} />
          <Route path="editprofile" element={<FormProfile />} /> */}
          <Route path="addprofile" element={<FormProfile defaultValues={defaultValues} />} />
          <Route path="editprofile" element={<FormProfile defaultValues={logInUserProfile} />} />
          <Route path="addcafe" element={<AddCafe />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </APIProvider>
  );
}
