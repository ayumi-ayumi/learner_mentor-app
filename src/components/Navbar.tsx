import React, { useContext } from "react";
import { Paper, Menu, MenuItem, IconButton, } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { auth } from "../firebase/BaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ userSignOut }: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // const navigate = useNavigate();
  // const { currentUser, setCurrentUser } = useContext(AuthContext);

  // console.log(currentUser)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //  // Sign Out
  // async function userSignOut() {
  //   await signOut(auth);
  //   setCurrentUser(null);
  //   console.log("Signed out", currentUser);
  //   navigate("/", { replace: true });
  // }

  return (
    <>
      <Paper
        elevation={3}
        style={{
          display: "flex",
          padding: "0 20px",
          justifyContent: "space-between",
        }}

      >
        <h1>Learner or Mentor</h1>
        <div>
          {/* <Button
            aria-haspopup="true"
            >
            Dashboard
          </Button> */}
          <IconButton
            id="basic-button"
            size="large"
            aria-label="account of current user"
            aria-controls={open ? "basic-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            // aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={userSignOut}>Logout</MenuItem>
          </Menu>
        </div>
      </Paper>
    </>
  );
}
