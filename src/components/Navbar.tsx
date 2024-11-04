import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from "../context/AuthProvider";
import "../styles/Navbar.scss";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { logOut, logInUserProfile, homeUrl } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        navigate(homeUrl + `signin`);
      })
      .catch((error) => console.error(error));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="nav_container">
        <Link className="site_logo" to={homeUrl}>Learner or Mentor</Link>
        {logInUserProfile && <div>Hello {logInUserProfile?.name}</div>}
        <div className="user_icon">
          {logInUserProfile ?
            <img className="avatar_img" src={logInUserProfile.avatar} onClick={handleClick} /> :
            <IconButton
              id="basic-button"
              size="medium"
              aria-label="account of current user"
              aria-controls={open ? "basic-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            }
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate(homeUrl + 'myprofile')}>My Profile</MenuItem>
            <MenuItem onClick={() => navigate(homeUrl + 'addcafe')}>Add Cafe</MenuItem>
            <MenuItem onClick={() => navigate(homeUrl + 'chat')}>Message</MenuItem>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
}
