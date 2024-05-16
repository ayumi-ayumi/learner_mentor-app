import React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
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
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Paper>
    </>
  );
}
