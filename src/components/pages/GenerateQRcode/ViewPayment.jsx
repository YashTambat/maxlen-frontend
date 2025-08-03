import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    List, ListItem, ListItemText, TableRow, TableCell, TableContainer, Paper, Table, TableHead, TableBody
} from "@mui/material";
import Sidenav from "../../Navbar/Sidenav.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar.jsx";
import { React, useState } from "react";

const ViewPayment = () => {
    const location = useLocation();
    const data = location.state; // Get the passed data
    // Define the keys to ignore
    // const keysToIgnore = ["id", "modelGenerationView", "userView", "piboView", "otherInfo"];
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <Box height={70} />
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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <Typography variant="h5" fontWeight="bold">
                                Payment History and Others Detail
                            </Typography>
                        </Grid>

                        <Button
                            style={{ marginLeft: "20px", marginTop: "1%", backgroundColor: "#2d4ef5" }}
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/generateQRcode")}
                        >
                            Back
                        </Button>
                        <Grid item xs={12}>
                        
                                <CardContent>
                                   

                                       {/* Payment Details */}
                                   
                                    {data?.qrCodeModel ? (
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell><b>Field</b></TableCell>
                                                        <TableCell><b>Value</b></TableCell>                                                    
                                                    </TableRow>
                                                    <TableRow>  
                                                         {/* Payment Details */}
                                                                        <TableCell colSpan={2}>
                                                                            <Typography variant="h5" fontWeight="bold">Payment Details</Typography>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>Order ID</TableCell>
                                                                        <TableCell>{data.orderId}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>Amount To Pay</TableCell>
                                                                        <TableCell>{data.amountToPay}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>Order Status</TableCell>
                                                                        <TableCell>{data.orderStatus}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>RozarPay Id</TableCell>
                                                                        <TableCell>{data.rozarpayId}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>Payment Time</TableCell>
                                                                        <TableCell>{data.paymentTimeDate}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>Payment ID</TableCell>
                                                                        <TableCell>{data.paymentId?data.paymentId:"null"}</TableCell>
                                                                    </TableRow> <TableRow>
                                                                        <TableCell>Payment Status</TableCell>
                                                                        <TableCell>{data.paymentStatus?data.paymentId:"null"}</TableCell>
                                                                    </TableRow>
                                                    {/* QR Code Model Details */}
                                                    <TableRow>
                                                        <TableCell colSpan={2}>
                                                            <Typography variant="h5" fontWeight="bold">QR Code Details</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>

                                                    <TableRow>
                                                        <TableCell>QR Code ID</TableCell>
                                                        <TableCell>{data.qrCodeModel.id}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>QR Code Format</TableCell>
                                                        <TableCell>{data.qrCodeModel.qrCodeFormat}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Number of Packages</TableCell>
                                                        <TableCell>{data.qrCodeModel.numberOfPackages}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Each Package Deposit</TableCell>
                                                        <TableCell>{data.qrCodeModel.eachPackageDeposit}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Total Deposit</TableCell>
                                                        <TableCell>{data.qrCodeModel.totalDeposit}</TableCell>
                                                    </TableRow>

                                                    {/* Model Generation View Details */}
                                                    {data.qrCodeModel.modelGenerationView && (
                                                        <>
                                                            <TableRow>
                                                                <TableCell colSpan={2}>
                                                                    <Typography variant="h5" fontWeight="bold">Model Generation Details</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Product Name</TableCell>
                                                                <TableCell>{data.qrCodeModel.modelGenerationView.productName}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Packing Type</TableCell>
                                                                <TableCell>{data.qrCodeModel.modelGenerationView.productPackingType}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Packing Material</TableCell>
                                                                <TableCell>{data.qrCodeModel.modelGenerationView.productPackingMaterial}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Weight</TableCell>
                                                                <TableCell>{data.qrCodeModel.modelGenerationView.productWeight} </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Package Weight</TableCell>
                                                                <TableCell>{data.qrCodeModel.modelGenerationView.productPackageWeight} </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Volume</TableCell>
                                                                <TableCell>{data.qrCodeModel.modelGenerationView.productVolume}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Description</TableCell>
                                                                <TableCell>{data.qrCodeModel.modelGenerationView.productDescription}</TableCell>
                                                            </TableRow>

                                                        </>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <Typography>No QR Code Model Data Available</Typography>
                                    )}
                                </CardContent>
                            
                        </Grid>


                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default ViewPayment;




























