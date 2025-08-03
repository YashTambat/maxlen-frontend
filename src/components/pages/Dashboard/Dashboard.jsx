import React, { useEffect, useState } from "react";
import Sidenav from "../../Navbar/Sidenav.jsx";
import Navbar from "../../Navbar/Navbar.jsx";
import "./Dashboard.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  Stack,
  CardMedia,
  CardActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AnimatedPieChart from "./AnimatedPieChart.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config.jsx";
import { method } from "lodash";
import ProductCard from "./ProductCard.jsx";
import GenerateQRCodeCard from "./GenerateQRCodeCard.jsx";
import { useAuth } from "../../../context/AuthContext.js";
import AreaChartComponent from "./PaymentOrderDashboard.jsx";
import PaymentOrderDashboard from "./PaymentOrderDashboard.jsx";
import EachProductDashBoardChart from "./EachProductDashBoardChart.jsx";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalQRCode, setTotalQRCode] = useState(0);

  const [sumInvested, setSumInvested] = useState(0);

  const fetchSumInvested = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        throw new Error("Missing authentication tokens.");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      };

      console.log("Fetching sum of invested amount...");
      const response = await axios.get(
        `${BASE_URL}/private/paymentorder/totalInvested/sum`,
        { headers }
      );

      if (response.status === 200) {
        setSumInvested(response.data); // Update state with fetched value
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching sum:", error);
    }
  };

  useEffect(() => {
    fetchTotalRecords();
    fetchTotalQRCode();
    fetchSumInvested();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const fetchTotalRecords = async () => {
    const headers = getAuthHeaders(); // Assuming getAuthHeaders provides necessary headers
    const requestBody = {}; // Adjust the request body as needed
    try {
      const response = await axios.post(
        `${BASE_URL}/private/modelgenerations/search?start=0&recordSize=1`,
        requestBody,
        { headers }
      );

      console.log("check resp from API", response);
      if (response.status === 200 && response.data?.records !== undefined) {
        setTotalProducts(response.data.records);
      } else {
        console.error("Failed to fetch records count");
      }
    } catch (error) {
      console.error("Error while fetching total records:", error);
    }
  };

  const fetchTotalQRCode = async () => {
    const headers = getAuthHeaders(); // Assuming getAuthHeaders provides necessary headers
    const requestBody = {}; // Adjust the request body as needed
    try {
      const response = await axios.post(
        `${BASE_URL}/private/paymentorder/search?start=0&recordSize=1`,
        requestBody,
        { headers }
      );

      console.log("check resp from API", response);
      if (response.status === 200 && response.data?.records !== undefined) {
        setTotalQRCode(response.data.records);
      } else {
        console.error("Failed to fetch records count");
      }
    } catch (error) {
      console.error("Error while fetching total records:", error);
    }
  };

  console.log("Check total products :", totalProducts);
  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem("accessToken"); // Replace with the key for your access token
    const refreshToken = localStorage.getItem("refreshToken"); // Replace with the key for your refresh token

    if (!accessToken || !refreshToken) {
      console.error("Access or refresh token is missing");
      return null; // Return null if tokens are not available
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  };

  return (
    <>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box
          component="main"
          sx={{
            backgroundColor: "white",
            flexGrow: 1,
            p: 3,
            position: "relative",
            maxWidth: {
              xs: "100%",
              sm: "90%",
              md: "93%",
              lg: "95%",
              xl: "100%",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {/* First Row */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Stack spacing={2} direction="row">
                  {/* Total products Card */}
                  <ProductCard totalProducts={totalProducts} />

                  {/* Total Generate QRcode Card */}
                  <GenerateQRCodeCard totalQRCode={totalQRCode} />
                </Stack>
              </Grid>

              {/* Small Cards Section */}
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                  {/* Total Income Card 1 */}
                  <Card
                    className="hover-card"
                    sx={{
                      color: "white",
                      height: 90,
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(136,24,210,1) 35%, rgba(0,212,255,1) 100%)",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      p={2}
                    >
                      <Box
                        sx={{
                          padding: 2,
                          backgroundColor: "orange",
                          borderRadius: "50%",
                          color: "white",
                        }}
                      >
                        <StorefrontIcon />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600 }}
                          component="div"
                        >
                          ₹{sumInvested.toLocaleString()}{" "}
                          {/* Display sumInvested state */}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ fontSize: 14, color: "white" }}
                        >
                          Total Paid Money
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>

                  {/* Total Income Card 2 */}
                  <Card
                    className="hover-card"
                    sx={{
                      height: 90,
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(46,214,204,1) 35%, rgba(0,212,255,1) 100%)",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      p={2}
                    >
                      <Box
                        sx={{
                          padding: 2,
                          backgroundColor: "orange",
                          borderRadius: "50%",
                          color: "white",
                        }}
                      >
                        <StorefrontIcon />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: "white" }}
                          component="div"
                        >
                          $203K
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: 14, color: "white" }}
                        >
                          Total Income
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>

            <Box height={20} />

            {/* Second Row */}

            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <PaymentOrderDashboard />
              </Grid>

              <Grid item xs={12} md={4}>
                <AnimatedPieChart />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <EachProductDashBoardChart />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
