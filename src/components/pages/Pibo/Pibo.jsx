import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Sidenav from "../../Navbar/Sidenav.jsx";
import Navbar from "../../Navbar/Navbar.jsx";

import LoadingBackdrop from "../../common/LoadingBackdrop.jsx";
import {
  Typography,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  InputLabel,
  Select,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
  Grid,
  IconButton,
  InputAdornment,
  Avatar,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ActionButtons from "../../common/ActionButtons.jsx";
import PaginationComponent from "../../common/PaginationComponent.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pibo.css";
import PiboTables from "./PiboTables.jsx";
import { BASE_URL } from "../../../config.jsx";
import FilterPibo from "./FilterPibo.jsx";
import { use } from "react";
import axios from "axios";

const Pibo = () => {
  const [users, setUsers] = useState([]);

  // const [users, setUsers] = useState([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [totalUsers, setTotalUsers] = useState(0);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const token = localStorage.getItem("accessToken");
  //       const res = await axios.get("http://localhost:5000/api/auth/users", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setUsers(res.data.users || res.data); // handle paginated or non-paginated response
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`http://localhost:5000/api/auth/users?page=${page}&limit=8`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setTotalUsers(res.data.total);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, [page]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            maxWidth: {
              xs: "84%",
              sm: "90%",
              md: "93%",
              lg: "95%",
              xl: "100%",
            },
          }}
        >
          <Typography
            className="pibo-typography"
            variant="h5"
            fontWeight="bold"
          >
            All User Details
          </Typography>
          <Box height={20} />

          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt={user.username}
                    src={user.profileImage}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6">{user.username}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                     <Typography variant="body2" color="text.secondary">
                      {user.role === "admin" ? "Admin" : "User"}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
            ))}
          </Grid>
          <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  gap={2} // reduces space between items
  mt={3}
>
  <Button
    variant="contained"
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    size="small"
  >
    Prev
  </Button>

  <Typography variant="body2" sx={{ mx: 1 }}>
    Page {page} of {totalPages} | Total Users: {totalUsers}
  </Typography>

  <Button
    variant="contained"
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    size="small"
  >
    Next
  </Button>
</Box>


        </Box>
      </Box>
    </>
  );
};

export default Pibo;
