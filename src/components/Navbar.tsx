import React from "react";
import { Paper, Menu, MenuItem, IconButton, } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../styles/Navbar.scss";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { logOut, logInUserProfile } = useAuth();
  const navigate = useNavigate();
  console.log(logInUserProfile)
  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        navigate("/signin");
      })
      .catch((error) => console.error(error));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Paper
        elevation={3}
        style={{
          display: "flex",
          padding: "0 20px",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Link className="site-logo" to="/">Learner or Mentor</Link>
        {logInUserProfile && <div>Hello {logInUserProfile?.name}</div>}
        <div>
          <IconButton
            id="basic-button"
            size="small"
            aria-label="account of current user"
            aria-controls={open ? "basic-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
            {/* <img src={logInUserProfile.avatar}/> */}
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
            <MenuItem onClick={() => navigate('/myprofile')}>My Profile</MenuItem>
            <MenuItem onClick={() => navigate('/addcafe')}>Add Cafe</MenuItem>
            <MenuItem onClick={() => navigate('/chat')}>Message</MenuItem>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </div>
      </Paper>
    </>
  );
}
