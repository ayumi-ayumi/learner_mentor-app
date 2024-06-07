import React from "react";
import { Paper, Menu, MenuItem, IconButton, } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../styles/Navbar.scss";
import { useUsersData } from '../context/UsersProvider'


export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { logInUser } = useUsersData();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        navigate("/signin"); // Redirect to the login page after logout
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
        }}
      >
        <Link className="site-logo" to="/">Learner or Mentor</Link>
        {logInUser && <div>Hello {logInUser?.name}</div>}
        <div>
          <IconButton
            id="basic-button"
            size="large"
            aria-label="account of current user"
            aria-controls={open ? "basic-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            aria-haspopup="true"
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
            <MenuItem onClick={() => navigate('/addprofile')}>My Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </div>
      </Paper>
    </>
  );
}
