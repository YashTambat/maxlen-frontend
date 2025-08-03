import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";

import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MuiAppBar from "@mui/material/AppBar";
import { useAppStore } from "../../appStore";
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../config";
import { useEffect } from "react";
import { useState } from "react";


const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "white"
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("userData");
  let Name = "Guest"; // Default Name
  let Email = "guest@example.com"; // Default Email
  let RollType = "xyz";
  let userid ="null"
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      // console.log("parsed user ?",parsedUser?.view?.roleViews?.[0].name)
      console.log("check userid ?",parsedUser?.view?.piboView?.id)
      
      // Use optional chaining to safely access nested properties
      Name = parsedUser?.view?.name || "Guest";
      Email = parsedUser?.view?.email || "guest@example.com";
      RollType =parsedUser?.view?.roleViews?.[0]?.name ||"xyz";
      userid =parsedUser?.view?.piboView?.id 
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  } else {
    console.log("No user data found in localStorage.");
  }

  console.log("Name:", Name);
  console.log("Email:", Email);



  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now(); // Compare expiration with current time
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Treat invalid tokens as expired
    }
  };

  const handleLogoutClick = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
     logout();
      navigate("/");

    if (!accessToken || isTokenExpired(accessToken)) {
      // Token is missing or expired, clear storage and navigate
      logout();
      navigate("/");
      alert("You have successfully logged out.");
      return;
    }

    try {

      // Make the GET API call for logout with required headers
      const response = await axios.get(`${BASE_URL}/private/user/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          refreshToken: `Bearer ${refreshToken}`, // Pass refreshToken in headers
        },
      });

      // Clear user data and tokens on successful logout
      logout();
      navigate("/");
      // alert(response.data.message || "You have successfully logged out.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChangePassword = () => {
    // Clear local storage data
    localStorage.removeItem("userData");

    // Navigate to forget password page with fallback
    setTimeout(() => {
      navigate("/forgetpassword");
      // Fallback: Forceful navigation
      window.location.href = "/forgetpassword";
    }, 100); // Delay added to ensure state updates
  };


  const email = Email?.slice(0, 2).toUpperCase(); // Get first two characters of the username
  console.log("emial ?", email)
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
      {RollType === "Client users" && (
  <MenuItem 
  onClick={() => navigate(`/profile/${userid}`)}
  >
    <PersonOutlineOutlinedIcon /> Profile
  </MenuItem>
   )}
      <MenuItem onClick={handleChangePassword}><KeyIcon /> Change Password</MenuItem>
      <MenuItem onClick={() => {
        handleMenuClose();
        handleLogoutClick();
      }}>
        <LogoutIcon /> Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"

            aria-label="open drawer"
            sx={{ mr: 2, color: "#2d4ef5" }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon sx={{ fontSize: 30, marginLeft: "-13px" }} />
          </IconButton>
          
          <Box sx={{ display: { sm: "flex" }, alignItems: "center" }}>
  <Typography
    variant="h6"
    sx={{
      fontWeight: "bold",
      color: "#1976d2", // Customize as needed
      ml: 1, // margin-left to align if needed
    }}
  >
    Maxlence
  </Typography>
</Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            {/* <Search>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Search> */}

          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {/* Show icons directly on large screens */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{ color: "#2d4ef5" }}>
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit" sx={{ color: "#2d4ef5" }}>
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ color: "#2d4ef5" }}
            >
              {/* <AccountCircle /> */}
              <Avatar
                sx={{
                  bgcolor: "#2d4ef5", // Background color
                  color: "white", // Text color
                  width: 28, // Avatar width
                  height: 28, // Avatar height
                  fontSize: "1rem", // Font size of initials
                }}
              >
                {email}
              </Avatar>
            </IconButton>
          </Box>
          {/* Show a button to open icons menu on small screens */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{ color: "blue" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
