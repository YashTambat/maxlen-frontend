import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EmojiPeopleTwoToneIcon from '@mui/icons-material/EmojiPeopleTwoTone';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import { useAppStore } from '../../appStore';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import DraweToolTips from './DrawerToolTips';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';


const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor:"#2d4ef5",
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  backgroundColor:"#2d4ef5",
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),

        },

      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Sidenav() {
  
  // const [roleNames, setRoleNames] = useState([]); // State to store role names
  // const [checkLoginUserType, setcheckLoginUserType] = useState(localStorage.getItem("userData")); // State to store role names
  // const location = useLocation();
  // const navigate = useNavigate();
  // // setcheckLoginUserType(localStorage.getItem("userData"));

  // useEffect(() => {
  //   if (checkLoginUserType) {
  //     const parsedUserData = JSON.parse(checkLoginUserType); // Parse the JSON string
  //     const roleViews = parsedUserData.view?.roleViews; // Safely access roleViews

  //     if (roleViews && Array.isArray(roleViews)) {
  //       const names = roleViews.map(role => role.name); // Extract role names
  //       setRoleNames(names); // Update state only once
  //       console.log("roleViews found in roleName",roleNames);
  //     } else {
  //       console.log("No roleViews found or not an array.");
  //     }
  //   } else {
  //     console.log("No user data found in localStorage.");
  //   }
  // }, [checkLoginUserType]); // Empty dependency array ensures this runs only once




 const location = useLocation();
  const navigate = useNavigate();


  // Get user data and role from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const role = userData.role || "client"; // default to client






  // console.log("role",roleNames[0])
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const handleNavigation = (path) => {
    console.log("check path ",path)
     navigate(path);
  };
  // const updateOpen = useAppStore((state)=> state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30}/>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader >
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >

          <ListItem disablePadding sx={{ display: 'block', marginTop:"-9px"}} onClick={() =>  handleNavigation("/dashboard") }>
          <DraweToolTips title={!open ? "Dashboard" : ""} placement="right" arrow>
            <ListItemButton
              sx={[
                {
                  minHeight: 56,
                  px: 2.5,
                  backgroundColor: location.pathname === '/dashboard' ? 'white' : '', // Highlight active route
                  color: location.pathname === '/dashboard' ? 'white' : 'white', // Adjust text color
                  '&:hover': {
                    backgroundColor: 'white', // Hover effect
                    color: '#2d4ef5',
                  },

                },
                open
                  ? {
                    justifyContent: 'initial',
                  }
                  : {
                    justifyContent: 'center',
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    :{
                      
                      mr: 'auto',
                    },
                ]}
              >
                <GridViewIcon sx={{ 
                  color:location.pathname==="/dashboard"?"#2d4ef5":"white",
                  backgroundColor:location.pathname==="/dashboard"?"white":"#2d4ef5",
                  }} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={[
                  open
                    ? {
                      color:location.pathname==="/dashboard" ? "#2d4ef5":"black",
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
              
            </ListItemButton>
            </DraweToolTips>
          </ListItem>
          
          <Divider sx={{ backgroundColor: "white" }} />
          {/* <Box height={5}  /> */}
          {(role !== "client" &&
            <ListItem disablePadding sx={{ display: 'block',marginTop:"-9px" }} onClick={() =>  handleNavigation("/all-user") }>
              <DraweToolTips title={!open ? "All User" : ""} placement="right" arrow>
              <ListItemButton
                sx={[
                  {
                    minHeight: 56,
                    px: 2.5,
                    backgroundColor: location.pathname === '/all-user' ? 'white' : '', // Highlight active route
                    color: location.pathname === '/all-user' ? 'white' : 'white', // Adjust text color
                    '&:hover': {
                      backgroundColor: 'white', // Hover effect
                      color: '#2d4ef5',
                    },
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  <EmojiPeopleTwoToneIcon sx={{
                     color:location.pathname==="/all-user" ? "#2d4ef5":"white",
                     backgroundColor:location.pathname==="/all-user" ? "white":"#2d4ef5"
                   
                     
                     }} />
                </ListItemIcon>
                <ListItemText
                  primary="all-user"
                  sx={[
                    open
                      ? {
                        color:location.pathname==="/pibo" ? "#2d4ef5":"black",
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
              </DraweToolTips>
            </ListItem>)}
          
          <Divider sx={{ backgroundColor: "white" }} />
          {/* <Box height={3} /> */}
          {/* {role !== "client" && (
            <ListItem disablePadding sx={{ display: 'block',marginTop:"-2px" }} onClick={() =>  handleNavigation("/setproductdeposit") }>
              <DraweToolTips title={!open ? "Set Product Deposit" : ""} placement="right" arrow>
              <ListItemButton
                sx={[
                  {
                    minHeight: 56,
                    px: 2.5,
                    backgroundColor: location.pathname === '/setproductdeposit' ? 'white' : '', // Highlight active route
                    color: location.pathname === '/setproductdeposit' ? 'white' : 'white', // Adjust text color
                    '&:hover': {
                      backgroundColor: 'white', // Hover effect
                      color: '#2d4ef5',
                    },
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  <CurrencyRupeeIcon sx={{ 
                    color:location.pathname==="/setproductdeposit" ? "#2d4ef5":"white",
                    backgroundColor:location.pathname==="/setproductdeposit" ? "white":"#2d4ef5"
                    
                    }} />
                </ListItemIcon>
                <ListItemText
                  primary="Set Product Deposit"
                  sx={[ 
                    open
                      ? {
                        color:location.pathname==="/setproductdeposit" ? "#2d4ef5":"black",
                        opacity: 1,
                        
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
              </DraweToolTips>
            </ListItem>)} */}
          
          <Divider sx={{ backgroundColor: "white" }} />
          {/* <Box height={5} /> */}
          {(role === "client" &&
          <ListItem disablePadding sx={{ display: 'block',marginTop:"-5px" }} onClick={() =>  handleNavigation("/user-details") }>
          <DraweToolTips title={!open ? "user-details" : ""} placement="right" arrow>
            <ListItemButton
              sx={[
                {
                  minHeight: 56,
                  px: 2.5,
                  backgroundColor: location.pathname === '/user-details' ? 'white' : '', // Highlight active route
                  color: location.pathname === '/user-details' ? 'white' : 'white', // Adjust text color
                  '&:hover': {
                    backgroundColor: 'white', // Hover effect
                    color: 'black',
                  },
                },
                open
                  ? {
                    justifyContent: 'initial',
                  }
                  : {
                    justifyContent: 'center',
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: 'auto',
                    },
                ]}
              >
                <InboxIcon sx={{
                   color:location.pathname==="/user-details" ? "#2d4ef5":"white",
                   backgroundColor:location.pathname==="/user-details" ?"white":"#2d4ef5"
                   
                   }} />
              </ListItemIcon>
              <ListItemText
                primary="user-details"
                sx={[
                  open
                    ? {
                      color:location.pathname==="/user-details" ? "#2d4ef5":"black",
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>
            </DraweToolTips>
          </ListItem>
)}
          
          <Divider sx={{ backgroundColor: "white" }} />
          <Box height={5} />
          {/* {(role === "client" &&
            <ListItem disablePadding sx={{ display: 'block' ,marginTop:"-9px"}} onClick={() => handleNavigation("/generateQRcode") }>
              <DraweToolTips title={!open ? "Generate QR Code" : ""} placement="right" arrow>
              <ListItemButton
                sx={[
                  {
                    minHeight: 56,
                    px: 2.5,
                    backgroundColor: location.pathname === '/generateQRcode' ? 'white' : '', // Highlight active route
                    color: location.pathname === '/generateQRcode' ? 'white' : 'white', // Adjust text color
                    '&:hover': {
                      backgroundColor: 'white', // Hover effect
                      color: 'black',
                    },
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  <QrCode2Icon sx={{
                      color:location.pathname==="/generateQRcode"? "#2d4ef5" :"white",
                      backgroundColor:location.pathname==="/generateQRcode" ?"white": "#2d4ef5" 
                     
                     }} />
                </ListItemIcon>
                <ListItemText
                  primary="Generate QRcode"
                  sx={[
                    open
                      ? {
                        color:location.pathname==="/generateQRcode" ? "#2d4ef5":"black",
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
              </DraweToolTips>
          </ListItem>)} */}

        </List>
      </Drawer>
    </Box>
  );
}


































