import { Routes, Route } from "react-router-dom";
import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import Home from "./pages/Home";
import FormProfile from "./pages/FormProfile";
import MyProfile from "./pages/MyProfile";
import AddCafe from "./pages/AddCafe";
import Chat_Home from "./pages/Chat_Home";
import ErrorPage from "./pages/Error";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import RequireAuth from "./Auth/RequireAuth";
import Layout from "./layout/Layout";
import { useAuth } from "./context/AuthProvider";
import { defaultValues } from "./Props/props";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// const homeUrl = "/learner_mentor-app/";

export default function App() {
  const { logInUserProfile, homeUrl } = useAuth();

  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <Routes>
        <Route path={homeUrl + `signup`} element={<SignUp />} />
        <Route path={homeUrl + `signin`} element={<SignIn />} />
        <Route path={homeUrl} element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path={homeUrl + `chat`} element={<Chat_Home />} />
          {/* <Route path={"/chat/:sendTo"} element={<Chat_Home />} /> */}
          {/* <Route path={"/chat/:sendTo"} element={<Chatroom />} /> */}
          {/* <Route path={`/chat`} element={<Chatroom />} /> */}
          <Route path={homeUrl + `myprofile`} element={<MyProfile />} />
          {/* <Route path="addprofile" element={<FormProfile/>} />
          <Route path="editprofile" element={<FormProfile />} /> */}
          <Route path={homeUrl + `addprofile`} element={<FormProfile defaultValues={defaultValues} />} />
          <Route path={homeUrl + `editprofile`} element={<FormProfile defaultValues={logInUserProfile} />} />
          <Route path={homeUrl + `addcafe`} element={<AddCafe />} />
        </Route>
        <Route path={homeUrl + `*`} element={<ErrorPage />} />
      </Routes>
    </APIProvider>
  );
}
