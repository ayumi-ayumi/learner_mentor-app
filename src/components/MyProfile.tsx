import React, { } from "react";
import "../styles/FormProfile.scss";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import ShowProfile from "./ShowProfile";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const { logInUserProfile } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {
        !logInUserProfile
          ?
          (<>
            <Button
              variant="contained"
              onClick={() => navigate('/addprofile')}
            >
              + Add my profile
            </Button>
          </>)
          :
          (<ShowProfile />)
      }
    </>
  );
}
