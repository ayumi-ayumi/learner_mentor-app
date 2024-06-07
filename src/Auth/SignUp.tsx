import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, TextField, Paper, Grid, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth, } from "../context/AuthProvider";

export default function SignUp() {
  const [error, setError] = useState("");
  const [clickedButton, setClickedButton] = useState(false);
  const { currentUser, createUser } = useAuth();
  const navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  // If the user is already authenticated, redirect to the home page
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser])

  // Handle form submission for user login
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFormSubmit(e: any) {
    e.preventDefault();
    setClickedButton(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUser(email, password)
      .then((result) => {
        console.log("Signed up with:", result.user.uid);
        navigate("/signin");
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
              <h2>Sign Up</h2>
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
            {clickedButton ? (
              <Button
                color="primary"
                // loading
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
                Sign Up
              </Button>
            )}
            <Typography>
              Already have an account? <Link to="/signin">Sign in</Link>
            </Typography>
          </Paper>
        </Grid>
      </Container>

    </>
  );
}