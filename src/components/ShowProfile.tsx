import React, {  } from "react";
import "../styles/ShowProfile.scss";
import { Button, Container, Stack } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

export default function ShowProfile() {
  const { logInUserProfile } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="sm">
        <div>
          <Button onClick={() => navigate('/editprofile')} variant="contained" startIcon={<EditIcon />}>
            Edit
          </Button>
        </div>
        <Stack
          style={{
            display: "grid",
            maxWidth: "500px"
          }}
        >
          <div>
            <div className="section-title">My name</div>
            <div className="section-value">{logInUserProfile?.name}</div>
          </div>
          <div>
            <div className="section-title">My place</div>
            <div className="section-value">{logInUserProfile?.place.address}</div>
          </div>
          <div>
            <div className="section-title">I am a</div>
            <div className="section-value">{logInUserProfile?.learnerORmentor}</div>
          </div>
          <div>
            <div className="section-title">I have been learning for </div>
            <div className="section-value">{logInUserProfile?.learningDuration}</div>
          </div>
          <div>
            <div className="section-title">I have been working for </div>
            <div className="section-value">{logInUserProfile?.workingDuration}</div>
          </div>
          <div>
            <div className="section-title">My skills</div>
            <div className="section-value">{logInUserProfile?.programmingLanguages}</div>
          </div>
          <div>
            <div className="section-title">Spoken langugages</div>
            <div className="section-value">{logInUserProfile?.languages}</div>
          </div>
        </Stack>
      </Container>
    </>
  );
}
