/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, TextField, Paper, Grid, Typography, Container, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth, } from "../context/AuthProvider";
import CheckIcon from '@mui/icons-material/Check';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SignIn() {
  const [error, setError] = useState("");
  const { currentUser, loginUser } = useAuth();
  const navigate = useNavigate();
  const homeUrl = "/learner_mentor-app/";

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  let signedUp;
  if(currentUser?.metadata.lastSignInTime)
    {
    signedUp = currentUser?.metadata.lastSignInTime == currentUser?.metadata.creationTime;
  }
  
  // If the user is already authenticated, redirect to the home page
  useEffect(() => {
    if (currentUser?.metadata.lastSignInTime !== currentUser?.metadata.creationTime) navigate("/");
  }, [currentUser])

  // Handle form submission for user login
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFormSubmit(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
    .then((result) => {
      console.log("Signed in with:", result);
      navigate(homeUrl);
    })
    .catch((error) => {
      console.log(error.message)
      setError(error.message);
    });
    e.target.reset();
  };

  return (
    <>
      <Container maxWidth="sm" component="form" onSubmit={handleFormSubmit}>
        {signedUp && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          You have successfully signed up and now sign in.
        </Alert>}
        <Grid sx={{ pt: 3 }}>
          <Paper elevation={10} style={paperStyle}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              name="email"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              name="password"
            />
            {error && (
              <Typography style={{ color: "red" }}>
                E-mail address or password is wrong.
              </Typography>
            )}
            <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign In
              </Button>
            {/* {currentUser ? (
            // {clickedButton ? (
              <Button
                color="primary"
                variant="contained"
                style={btnstyle}
                disabled
                fullWidth
              >
                Submitting...
              </Button>
            ) : (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign In
              </Button>
            )} */}
            <Typography>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </Typography>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}