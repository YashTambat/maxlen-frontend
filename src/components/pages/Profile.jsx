import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import Sidenav from "../Navbar/Sidenav";
import ProfileForm from "./ProfileForm";

const Profile = () => {
    const { userid } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <ToastContainer />
            <Navbar />
            <Box height={70} />
            <Box sx={{ display: "flex" }}>
                <Sidenav />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1, p: 3, maxWidth: {
                            xs: "84%",
                            sm: "90%", // Slightly reduced width on small screens
                            md: "93%", // Medium screen adjustments
                            lg: "95%", // Larger width for large screens
                            xl: "100%", // Even wider for extra-large screens 
                        }
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>                           
                                    <Typography variant="h5" fontWeight="bold">My Profile</Typography>
                            {/* <Typography variant="h5" fontWeight="bold">Set Deposit</Typography> */}
                        </Grid>
                    </Grid>
                  
                    {/* Back Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(-1)} // Go back to the previous page
                        sx={{ marginTop: "20px" ,backgroundColor:"#2d4ef5"}}
                    >
                        Back
                    </Button>
                    <ProfileForm/>
                </Box>
            </Box>
        </>
    );
};

export default Profile;
