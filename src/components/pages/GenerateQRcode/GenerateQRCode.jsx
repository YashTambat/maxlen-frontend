import React, { useState, useEffect } from "react";
import LoadingBackdrop from "../../common/LoadingBackdrop.jsx";
import Sidenav from "../../Navbar/Sidenav.jsx";
import Navbar from "../../Navbar/Navbar.jsx";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CustomTooltip from "../../common/CustomTooltip.jsx"; // Import the custom tooltip component
import ReceiptIcon from '@mui/icons-material/Receipt';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Stack,

} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { openRazorpayPayment } from "../Payment/razorpayUtils.jsx";
import PaginationComponent from "../../common/PaginationComponent.jsx";
import ActionButtons from "../../common/ActionButtons.jsx";
import { StyledTableCell, StyledTableRow } from "../StyledTableComponents.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../../config.jsx";
import DownloadIcon from '@mui/icons-material/Download';
import GenerateQRCodeTable from "./GenerateQRCodeTable.jsx";


const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    console.error("Access or refresh token is missing");
    return null;
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    refreshToken: `Bearer ${refreshToken}`,
  };
};
const GenerateQRcode = () => {
  const [products, setProducts] = useState([]); // State to hold products from API
  const [formats, setFormats] = useState([]); // State to hold formats from API
  const [selectedProduct, setSelectedProduct] = useState(""); // Selected product
  const [eachDeposit, setEachDeposit] = useState(""); // Each object deposit
  const [numPackages, setNumPackages] = useState(""); // Number of packages
  const [totalDeposit, setTotalDeposit] = useState(0); // Total Deposit

  const [format, setFormat] = useState(""); // Selected QR code format
  const [showForm, setShowForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPageOptions] = useState([5, 10, 15, 20]);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false); // Toggle filter menu
  const [filterColumn, setFilterColumn] = useState(""); // Selected column
  const [filterValue, setFilterValue] = useState(""); // Filter value
  const [isfiltered, setisFiltered] = useState(false);

  const [isLoading, setisloading] = useState(true);
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      const headers = getAuthHeaders();
      if (!headers) {
        console.error("Failed to fetch products: Missing headers");

        return;
      }
      setisloading(true)
      try {
        const response = await axios.get(
          `${BASE_URL}/private/qrcode/products-dropdown-qrcode`,
          { headers }
        );
        setisloading(false)
        if (response.data && Array.isArray(response.data.list)) {
          setProducts(response.data.list);
        } else {
          console.error("Invalid response format: Missing `list` key");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }


    };
    if (products.length === 0) {
      fetchProducts();
    }

    // fetchProducts();
  }, [products.length]);
  // Fetch formats from API
  useEffect(() => {
    const fetchFormats = async () => {

      const headers = getAuthHeaders();
      if (!headers) {
        console.error("Failed to fetch formats: Missing headers");
        return;
      }
      setisloading(true)
      try {
        const response = await axios.get(
          `${BASE_URL}/private/qrcode/qr-format-dropdown`,
          { headers }
        );
        setisloading(false)
        if (response.data && Array.isArray(response.data.list)) {
          setFormats(response.data.list);
        } else {
          console.error("Invalid response format: Missing `list` key");
        }
      } catch (error) {
        console.error("Error fetching formats:", error);
      }

    };

    if (formats.length === 0) {
      fetchFormats();
    }
  }, [formats.length]);

  // Calculate total deposit when `eachDeposit` or `numPackages` changes
  useEffect(() => {
    // const deposit = parseInt(eachDeposit) || 0;
    // const packages = parseInt(numPackages) || 0;
    // setTotalDeposit(deposit * packages);
    fetchData(currentPage);

  }, [eachDeposit, currentPage, recordsPerPage, isfiltered]);  //here numpackage is removed from dependency to solve repeated api hitted , also comment upper for that

  useEffect(() => {
    const deposit = parseInt(eachDeposit) || 0;
    const packages = parseInt(numPackages) || 0;
    setTotalDeposit(deposit * packages);
    // fetchData(currentPage);

  }, [eachDeposit, numPackages]);


  const handleFilter = async () => {
    console.log("yash calling these function");
    console.log("check columns: ",filterColumn);
   

    if (!filterColumn || !filterValue) {
      // alert("Please select a column and enter a value to filter.");
      toast.error(
        "Please Select The Filter You Want To Filter Out..." ||
        "Something went wrong!",
        {
          position: "top-right",
          autoClose: 5000,
          closeButton: true,
        }
      );
      return;
    }

    const headers = getAuthHeaders();
    if (!headers) {
      alert("Authentication tokens are missing.");
      return; // Exit if headers are not available
    }
    setisloading(true)
    try {
      const start = 0 * recordsPerPage;

        // Check if the selected filter column is nested under `modelGenerationView`
        let requestBody;
        if (
            filterColumn === "productName" ||
            filterColumn === "productPackingType" ||
            filterColumn === "productPackingMaterial"
        ) {
            requestBody = {
                modelGenerationView: {
                    [filterColumn]: filterValue,
                },
            };
        } else {
            requestBody = {
                [filterColumn]: filterValue,
            };
        }

      const response = await fetch(
        `${BASE_URL}/private/paymentorder/search?start=${start}&recordSize=${recordsPerPage}`,
        {
          method: "POST",
          headers: headers,
          // body: JSON.stringify({ [filterColumn]: filterValue }), // Dynamic filter based on column and value
          body: JSON.stringify(requestBody), // Properly formatted request body
        }
      );
      setisloading(false)
      if (response.ok) {
        const result = await response.json();
        const { list, records } = result;
        setData(list || []);
        setTotalRecords(records || 0);
        setCurrentPage(1)
        setisFiltered(true);
        console.log("check in HandleFilter isfiltered?", isfiltered);
      } else {
        console.error("Failed to filter data:", response.status);
      }
    } catch (error) {
      console.error("Error while filtering data:", error);
    }
  };
  // Cancel filter and reset data

  const handleCancelFilter = () => {
    console.log("yash calling these function");
    setFilterColumn("");
    setFilterValue("");
    setFilterOpen(false);
    fetchData(currentPage); // Reload data
    setisFiltered(false);
    console.log("check in HandleCanceliter isfiltered ?", isfiltered);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRecordsPerPageChange = (value) => {
    setRecordsPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing the records per page
  };

  const resetFormData = () => {
    setProducts([])
    setFormats([])
    setSelectedProduct("")
    setEachDeposit("")
    setNumPackages("")
    setTotalDeposit(0)
    setFormat("")
  }
  const fetchData = async (page) => {

    const start = (page - 1) * recordsPerPage;
    const headers = getAuthHeaders();
    if (!headers) {
      toast.error(
        "Authentication failed. Please log in again." ||
        "Something went wrong!",
        {
          position: "top-right",
          autoClose: 5000,
          closeButton: true,
        }
      );
      return; // Exit if headers are not available
    }
    // const requestBody = isfiltered ? { [filterColumn]: filterValue } : {};
    let requestBody = {};

    if (isfiltered) {
        if (
            filterColumn === "productName" ||
            filterColumn === "productPackingType" ||
            filterColumn === "productPackingMaterial"
        ) {
            requestBody = {
                modelGenerationView: {
                    [filterColumn]: filterValue,
                },
            };
        } else {
            requestBody = {
                [filterColumn]: filterValue,
            };
        }
    }

    setisloading(true)
    try {
      const response = await fetch(
        `${BASE_URL}/private/paymentorder/search?start=${start}&recordSize=${recordsPerPage}`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestBody),
        }
      );
      setisloading(false)
      if (response.ok) {
        const result = await response.json();
        // console.log("Result after filter: ", result);
        const { list, records } = result;
        setData(list || []);
        setTotalRecords(records || 0);
        console.log("check Datas", data)
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };
  const fetchDeposit = async (key) => {
    const headers = getAuthHeaders();
    if (!headers) {
      console.error("Failed to fetch deposit: Missing headers");

      return;
    }
    setisloading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}/private/modelgenerations/view/${key}`,
        { headers }
      );
      setisloading(false)
      if (response.data && !response.data.hasError) {
        const deposit = response.data.view.packagingView.deposit; // Extract the deposit amount from the response
        setEachDeposit(deposit); // Update the eachDeposit state with the fetched deposit
      } else {
        console.error("Error fetching deposit:", response.data.message);
        // setEachDeposit(0); // Reset to 0 if there's an error
      }
    } catch (error) {
      console.error("Error fetching deposit:", error);
      // setEachDeposit(0); // Reset to 0 if an error occurs
    }

  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    const formData = {
      selectedProduct,
      eachDeposit,
      numPackages,
      totalDeposit,
      format,
    };

    console.log('Form Data:', formData);
    console.log('Selected product:', formData.selectedProduct);

    const dataToSubmit = {
      qrCodeFormat: formData.format,
      numberOfPackages: formData.numPackages,
      eachPackageDeposit: formData.eachDeposit,
      totalDeposit: formData.totalDeposit,
      modelGenerationView: {
        id: formData.selectedProduct,
      },
    };

    console.log('Payload to Submit:', dataToSubmit);

    const headers = getAuthHeaders();
    if (!headers) {
      console.error('Authentication tokens are missing.');
      toast.error('Authentication failed. Please log in again.');

      return;
    }
    setisloading(true)
    try {
      // Step 1: Save QR Code
      const qrCodeResponse = await axios.post(
        `${BASE_URL}/private/qrcode/save`,
        dataToSubmit,
        { headers }
      );

      const qrCodeResult = qrCodeResponse.data;
      console.log('QR Code Response:', qrCodeResult);

      if (qrCodeResult.hasError) {
        toast.error(qrCodeResult.message || 'Failed to save QR code data.');
        return;
      }

      // Step 2: Create Payment Order
      const paymentOrderPayload = {
        amountToPay: qrCodeResult.view.totalDeposit,
        modelGenerationView: {
          id: qrCodeResult.view.modelGenerationView.id,
        },
        qrCodeModel: {
          id: qrCodeResult.view.id,
        }
      };

      console.log('Payment Order Payload:', paymentOrderPayload);

      const paymentOrderResponse = await axios.post(
        `${BASE_URL}/private/paymentorder/save`,
        paymentOrderPayload,
        { headers }
      );

      const paymentOrderResult = paymentOrderResponse.data;
      console.log('Payment Order Response:', paymentOrderResult);

      if (paymentOrderResult.hasError) {
        toast.error(paymentOrderResult.message || 'Failed to create payment order.');
        return;
      }

      // Step 3: Open Razorpay Payment Gateway
      const paymentView = paymentOrderResult.view;

      openRazorpayPayment({
        totalDeposit: paymentView.amountToPay,
        onSuccess: async (paymentResponse) => {
          console.log('Payment Success:', paymentResponse);

          // Step 4: Update Payment Order with Payment ID
          const updatePayload = {
            id: paymentView.id,
            amountToPay: paymentView.amountToPay,
            paymentId: paymentResponse.razorpay_payment_id, // Razorpay's payment ID
          };

          console.log('Update Payment Payload:', updatePayload);

          const updateResponse = await axios.put(
            `${BASE_URL}/private/paymentorder/update`,
            updatePayload,
            { headers }
          );

          const updateResult = updateResponse.data;
          console.log('Update Payment Response:', updateResult);

          if (updateResult.hasError) {
            toast.error(updateResult.message || 'Failed to update payment order.');
            return;
          }

          toast.success(updateResult.message || 'Payment successfully processed!');
          // Redirect to the success page with payment details
          navigate('/generateQRcode/payment-success', {
            state: {
              paymentId: paymentResponse.razorpay_payment_id,
              orderId: paymentView.orderId,
              totalDeposit: paymentView.amountToPay,
            },
          });
        },
        onFailure: async (errorMessage) => {
          console.error('Payment Failed:', errorMessage);
          toast.error(errorMessage || 'Payment failed. Please try again.');
        },
      });
    } catch (error) {
      console.error('Error in submission:', error.message);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred. Please try again later.'
      );
    }
    finally {
      setisloading(false); // Hide loader after API response or error
    }

  };


  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      selectedProduct &&
      eachDeposit &&
      numPackages &&
      format
    );
  };
  const FiltertableColumns = [
    "orderId",
    "paymentId",
    "orderStatus",
    "rozarpayId",
    "paymentStatus",
    "productName",
    "productPackingType",
    "productPackingMaterial"

  ];

  const handleView = (item) => {
    console.log("check id", item.id); // Log the id to confirm
    navigate(`/generateQRcode/${item.id}`, { state: item }); // Use only the id for the route
  };

  const handleDownload = async (item) => {
    console.log("check item.id", item.qrCodeModel.id);
    const id = item.qrCodeModel.id;
    const headers = getAuthHeaders(); // Function to fetch authentication headers

    if (!headers) {
      toast.error("Authorization headers are missing.");
      return;
    }

    try {
      // API Call
      const response = await axios.get(
        `${BASE_URL}/private/qrcode/qrcodemodel/download/${id}`,
        {
          headers,
          responseType: "blob", // Ensures the response is treated as binary data
        }
      );

      // Check if the response is a binary file or an error message
      const isJson = response.data.type === "application/json";
      if (isJson) {
        // Attempt to parse the JSON response
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const jsonResponse = JSON.parse(reader.result);

            if (jsonResponse.hasError) {
              console.error("Error in API response:", jsonResponse.message);
              toast.error(jsonResponse.message);
            } else {
              toast.error("Unexpected error occurred.");
            }
          } catch (error) {
            console.error("Failed to parse JSON response:", error);
            toast.error("Failed to process the download. Please try again.");
          }
        };
        reader.readAsText(response.data); // Parse JSON from the response
      } else {
        // If not JSON, assume it's binary and process the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `qrcode_${item.qrCodeModel.qrCodeFormat}` // Generate file name dynamically
        );
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up the link element
        toast.success("File downloaded successfully!");
      }
    } catch (error) {
      console.error("Error during download:", error);
      toast.error("An error occurred while downloading the file.");
    }
  };

  const handleReceipt = async (item) => {
    console.log("Downloading receipt for item ID:", item.id);
    const id = item.id;
    const headers = getAuthHeaders(); // Fetch authentication headers
  
    if (!headers) {
      toast.error("Authorization headers are missing.");
      return;
    }
  
    try {
      // API Call
      const response = await axios.get(
        `${BASE_URL}/private/paymentorder/download-pdf?id=${id}`,
        {
          headers,
          responseType: "blob", // Ensures response is treated as binary data (PDF)
        }
      );
  
      // Check if response is an actual PDF or error JSON
      const contentType = response.headers["content-type"];
      if (contentType && contentType.includes("application/json")) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const jsonResponse = JSON.parse(reader.result);
            toast.error(jsonResponse.message || "Error in downloading receipt.");
          } catch (error) {
            console.error("Failed to parse JSON response:", error);
            toast.error("Unexpected response format.");
          }
        };
        reader.readAsText(response.data); // Parse JSON response
      } else {
        // Process and trigger PDF download
        const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `receipt_${id}.pdf`); // Dynamic filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
        toast.success("Receipt downloaded successfully!");
      }
    } catch (error) {
      console.error("Error downloading receipt:", error);
      toast.error("An error occurred while downloading the receipt.");
    }
  };
  
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
              <Typography variant="h5" fontWeight="bold">Generate QR Codes</Typography>
            </Grid>
          </Grid>
          <Box height={20} />
          <ActionButtons
            showForm={showForm}
            onAddClick={() => {
              resetFormData();
              setShowForm(!showForm);
            }}
            filterOpen={filterOpen}
            onFilterClick={() => setFilterOpen(!filterOpen)}
          />

          {filterOpen && (
            <Card className="p-4 mb-4" sx={{ backgroundColor: "rgb(230, 230, 250)", marginTop: "5px" }}>
              <Typography variant="h6" gutterBottom>
                Filter Records
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      backgroundColor: "white",
                    }}
                    className="form-select"
                    value={filterColumn}
                    onChange={(e) => setFilterColumn(e.target.value)}

                  >
                    <option value="">Select Column</option>

                    {FiltertableColumns.map((col, index) => (
                      <option key={index} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Enter Filter Value"
                    sx={{
                      backgroundColor: "white", // Full background color for the TextField
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white", // Ensures the input section is fully white
                        height: "40px", // Set consistent height
                      },
                      "& .MuiInputLabel-root": {

                        padding: "0 4px", // Optional: Adjusts label padding
                      },

                    }}
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFilter}
                    style={{ marginRight: "10px", backgroundColor: "#2d4ef5" }}

                  >
                    Filter
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelFilter}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Card>
          )}

          {showForm && (
            isLoading ? (
              <LoadingBackdrop isOpen={isLoading} />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: { xs: "auto", md: "60vh" }, // Adjust height based on screen size
                  py: { xs: 4, md: 0 }, // Add padding on smaller screens
                }}
              >

                <Box
                  component="form"
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "90%", sm: "600px" }, // Adjust maxWidth for smaller screens
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 3,
                    p: { xs: 2, sm: 3 }, // Adjust padding for smaller screens
                    overflow: "hidden",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <Typography variant="h4" align="center" gutterBottom>
                    Generate QR Code
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    label="Select Product"
                    style={{ backgroundColor: "white" }}
                    value={selectedProduct}
                    // onChange={(e) => setSelectedProduct(e.target.value)}
                    onChange={(e) => {
                      const selectedKey = e.target.value; // Get the selected key
                      setSelectedProduct(selectedKey); // Update the selected product state
                      fetchDeposit(selectedKey); // Fetch the deposit for the selected product
                    }}
                    margin="normal"
                    required
                  >
                    {products.map((product) => (
                      <MenuItem key={product.key} value={product.key}>
                        {product.value}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    type="number"
                    fullWidth
                    label="Each Object Deposit"
                    style={{ backgroundColor: "white" }}
                    value={eachDeposit}
                    margin="normal"
                    required
                  />
                  <TextField
                    type="number"
                    fullWidth
                    label="Number of Packages"
                    style={{ backgroundColor: "white" }}
                    value={numPackages}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(value) && Number(value) > 0) {
                        setNumPackages(value)
                      }
                    }}
                    margin="normal"
                    required
                  />
                  <TextField
                    type="text"
                    fullWidth
                    label="Total Deposit"
                    value={totalDeposit}
                    style={{ backgroundColor: "white" }}
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextField
                    select
                    fullWidth
                    label="Select QR Code Format"
                    style={{ backgroundColor: "white" }}
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    margin="normal"
                    required
                  >
                    {formats.map((formatOption) => (
                      <MenuItem key={formatOption.key} value={formatOption.value}>
                        {formatOption.value}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Box textAlign="center" mt={3}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={!isFormValid()}
                      sx={{
                        width: { xs: "100%", sm: "auto" }, // Full-width button on small screens
                        backgroundColor: isFormValid() ? "primary.main" : "grey.400",
                        "&:hover": {
                          backgroundColor: isFormValid()
                            ? "primary.dark"
                            : "grey.400",
                        },
                        py: 1.5,
                        px: { xs: 2, sm: 4 }, // Adjust padding for small screens
                      }}
                    >
                      Proceed to Pay
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          )}
          <Box height={20} />
          {!showForm && (
           <GenerateQRCodeTable 
           data={data} 
           isLoading={isLoading} 
           handleView={handleView} 
           handleDownload={handleDownload} 
           handleReceipt={handleReceipt} 
           StyledTableCell={StyledTableCell} 
           StyledTableRow={StyledTableRow} 
           showForm={showForm} 
         />
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "16px",
              flexDirection: "column",
              textAlign: "center",
            }}
          >

            {!showForm && (
              <PaginationComponent
                currentPage={currentPage}
                totalRecords={totalRecords}
                recordsPerPage={recordsPerPage}
                recordsPerPageOptions={recordsPerPageOptions}
                onPageChange={handlePageChange}
                onRecordsPerPageChange={handleRecordsPerPageChange}
              />)}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default GenerateQRcode;










