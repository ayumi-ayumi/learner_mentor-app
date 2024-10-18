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
import Chat_Home from "./components/Chat_Home";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const homeUrl = "/learner_mentor-app/";

export default function App() {
  const { logInUserProfile } = useAuth();
  const location = useLocation()

  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <Routes>
        <Route path={homeUrl+`signup`} element={<SignUp />} />
        <Route path={homeUrl+`signin`} element={<SignIn />} />
        <Route path={homeUrl} element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path={homeUrl+`chat`} element={<Chat_Home />} />
          {/* <Route path={"/chat/:sendTo"} element={<Chat_Home />} /> */}
          {/* <Route path={"/chat/:sendTo"} element={<Chatroom />} /> */}
          {/* <Route path={`/chat`} element={<Chatroom />} /> */}
          <Route path={homeUrl+`myprofile`} element={<MyProfile />} />
          {/* <Route path="addprofile" element={<FormProfile/>} />
          <Route path="editprofile" element={<FormProfile />} /> */}
          <Route path={homeUrl+`addprofile`} element={<FormProfile defaultValues={defaultValues} />} />
          <Route path={homeUrl+`editprofile`} element={<FormProfile defaultValues={logInUserProfile} />} />
          <Route path={homeUrl+`addcafe`} element={<AddCafe />} />
        </Route>
        <Route path={homeUrl+`*`} element={<ErrorPage />} />
      </Routes>
    </APIProvider>
  );
}
