import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
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
import Chat from "./components/Chat";
import { defaultValues } from "./Props/props";
import socketIO, { io } from 'socket.io-client';
import Chathome from "./components/Chathome";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const socket = io('http://localhost:5000');
// const socket = socketIO.connect('http://localhost:5173');
// const socket = io();
// console.log(socket)
// socket.on('connection', () => {
//   console.log(`I'm connected with the back-end`);
// });


export default function App() {
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const signup = { signedUp: signedUp, setSignedUp: setSignedUp }
  const { logInUserProfile } = useAuth();

  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <Routes>
        <Route path={`/signup`} element={<SignUp signupProps={signup} />} />
        <Route path={`/signin`} element={<SignIn signupProps={signup} />} />
        <Route path='/chathome' element={<Chathome socket={socket} />} />
        <Route path='/chat' element={<Chat socket={socket} />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
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
