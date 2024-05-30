import React, { useState, useContext } from "react";
import { auth } from "../firebase/BaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, TextField, Link, Paper, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../AuthContext";

export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [haveAccount, setHaveAccount] = useState(false);
  const [error, setError] = useState("");
  const [clickedButton, setClickedButton] = useState(false);
  const { setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  function signUp() {
    // e.preventDefault();
    setClickedButton(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed up with:", userCredential);
        // updateProfile(userCredential.user, {
        //   displayName: "Ayumi",
        // })
        setLoading(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  }

  // Signed in
  function logIn() {
    // function logIn(e: any) {
    // e.preventDefault();
    setClickedButton(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setLoading(true);

        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  }

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <>
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
            <h2>{haveAccount ? "Sign In" : "Sign Up"}</h2>
          </Grid>
          <TextField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeEmail(event);
            }}
            label="Email Address"
            placeholder="Enter Email Address"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChangePassword(event);
            }}
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          {error && (
            <Typography style={{ color: "red" }}>
              E-mail address or password is wrong.
            </Typography>
          )}
          {/* <Button onClick={haveAccount ? logIn : signUp} color='primary' variant="contained" style={btnstyle} fullWidth>{haveAccount ? "Sign In" : "Sign Up"}</Button> */}
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
              onClick={haveAccount ? logIn : signUp}
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              {haveAccount ? "Sign In" : "Sign Up"}
            </Button>
          )}
          {/* <Typography >
            <Link href="#" >
              Forgot password ?
            </Link>
          </Typography> */}
          <Typography>
            {" "}
            {haveAccount ? "Do you want to " : "Do you have an account ? "}
            <Link onClick={() => setHaveAccount(!haveAccount)}>
              {haveAccount ? "create new account?" : "Sign In"}
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}