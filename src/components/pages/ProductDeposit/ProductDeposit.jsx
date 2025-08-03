import React, { useState, useEffect } from "react";
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
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidenav from "../../Navbar/Sidenav.jsx";
import Navbar from "../../Navbar/Navbar.jsx";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import PaginationComponent from "../../common/PaginationComponent.jsx";
import ActionButtons from "../../common/ActionButtons.jsx";
import LoadingBackdrop from "../../common/LoadingBackdrop.jsx";
import CustomTooltip from "../../common/CustomTooltip.jsx";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../../config.jsx";
import ProductDepositTable from "./ProductDepositTable.jsx";
import FilterProductDeposit from "./FilterProductDeposit.jsx";
// Validation rules configuration
const validationRules = {
  packagingType: { maxLength: 255, required: true },
  deposit: { required: true, type: "double", positive: true },
};

// Custom Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "16px",
  // backgroundColor: "#2d4ef5",
  // color: theme.palette.primary.contrastText,

  backgroundColor: "white",
  color: "black",
  textAlign: "center", // Ensure center alignment
  whiteSpace: "nowrap", // Prevent wrapping
}));

const StyledTableRow = styled(TableRow)(({ theme, isEven }) => ({
  // backgroundColor: isEven ? theme.palette.action.hover : "#fff",
  "&:hover": {
    backgroundColor: "lavender", // Hover color for table cells
  },
}));

const ProductDeposit = () => {
  // Page 3 is for Model Generation
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    packagingType: "",
    deposit: "",
  });

  const [errors, setErrors] = useState({});
  // Validation function
  const validateField = (name, value) => {
    const rule = validationRules[name];

    // Check if the field is required and empty
    if (
      rule?.required &&
      (value === undefined || value === null || value.toString().trim() === "")
    ) {
      return `${name.replace(/([A-Z])/g, " $1").toUpperCase()} is required.`;
    }

    // Check if the value exceeds the maxLength (only for strings)
    if (rule?.maxLength && value.length > rule.maxLength) {
      return `${name
        .replace(/([A-Z])/g, " $1")
        .toUpperCase()} must not exceed ${rule.maxLength} characters.`;
    }

    // Check if the field type is double
    if (rule?.type === "double") {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        return `${name
          .replace(/([A-Z])/g, " $1")
          .toUpperCase()} must be a valid number.`;
      }
      if (rule?.positive && numericValue <= 0) {
        return `${name
          .replace(/([A-Z])/g, " $1")
          .toUpperCase()} must be positive.`;
      }
    }

    // If a pattern is provided, validate against it
    if (rule?.pattern && !rule.pattern.test(value)) {
      return rule.errorMessage || "Invalid format.";
    }

    return ""; // No errors
  };
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
    const requestBody = isfiltered ? { [filterColumn]: filterValue } : {};
    // setisloading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/private/productpackaging/search?start=${start}&recordSize=${recordsPerPage}`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestBody),
        }
      );
      setisloading(false);
      if (response.ok) {
        const result = await response.json();
        // console.log("Result after filter: ", result);
        const { list, records } = result;
        setData(list || []);
        setTotalRecords(records || 0);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);

    if (!showForm) {
      resetFormData();
    }
  }, [currentPage, recordsPerPage, isfiltered]);

  const handleInputChange = (event) => {
    console.log("yash calling these function");
    console.log("check event ", event);
    const { name, value } = event.target;
    const error = validateField(name, value); // Validate the field whenever it changes
    // Set form data and error message
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };
  const handleFormSubmit = async (event) => {
    console.log("yash calling these function"); // This form is open for Adding and updating the details
    event.preventDefault();

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) validationErrors[key] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please fix the validation errors.");
      return;
    }

    const formDataToSubmit = {
      ...formData,
    };

    const isFormValid = Object.values(formData).every(
      (field) =>
        field !== null && field !== undefined && field.toString().trim() !== ""
    );
    if (!isFormValid) {
      alert("All fields are mandatory!");
      return;
    }
    const url = formData.id
      ? `${BASE_URL}/private/productpackaging/update` // Update API
      : `${BASE_URL}/private/productpackaging/save`; // Add API

    const method = formData.id ? "PUT" : "POST";
    const headers = getAuthHeaders();
    if (!headers) {
      alert("Authentication tokens are missing.");
      return; // Exit if headers are not available
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        // body: JSON.stringify(formData),
        body: JSON.stringify(formDataToSubmit),
      });
      const result = await response.json();
      console.log("checking result :", result);

      if (response.ok && !result.hasError) {
        if (formData.id) {
          console.log("check here formData.id ");
          toast.success(result.message, {
            position: "top-right",
            autoClose: 5000,
            closeButton: true,
          });
          fetchData(currentPage);
          setShowForm(false);
        } else {
          console.log("check here else part");
          toast.success(result.message, {
            position: "top-right",
            autoClose: 5000,
            closeButton: true,
          });
          fetchData(currentPage);
          setShowForm(false);
        }

        fetchData(currentPage);
        setShowForm(false);
        // Reset form only if adding a new record
        if (!formData.id) {
          setFormData({
            packagingType: "",
            deposit: "",
          });
          // setShowForm(false)
        }
      } else {
        // alert("Failed to submit form!");
        toast.error(result.message || "Failed to submit form!", {
          position: "top-right",
          autoClose: 5000,
          closeButton: true,
        });
      }
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };
  const handleEdit = async (item) => {
    console.log("Fetching data for ID:", item.id);
    const headers = getAuthHeaders();

    try {
      // Fetch data from the API
      const response = await fetch(
        `${BASE_URL}/private/productpackaging/view/${item.id}`,
        {
          method: "GET",
          headers,
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      // Set form fields with the data from the API
      setFormData({
        packagingType: data.view.packagingType || "",
        deposit: data.view.deposit || "",
        id: data.view.id, // Include the ID for update API
      });

      // Show the form
      setShowForm(true);
    } catch (error) {
      console.error("Error in handleEdit:", error.message);
      // alert("Failed to fetch data for editing. Please try again.");
      toast.error("Failed to fetch data for editing. Please try again ", {
        position: "top-right",
        autoClose: 5000,
        closeButton: true,
      });
    }
  };
  const resetFormData = () => {
    console.log("yash calling these function");
    setFormData({
      packagingType: "",
      deposit: "",
    });
  };

  const handleDelete = async (id) => {
    console.log("yash calling these function");
    if (window.confirm("Are you sure you want to delete this record?")) {
      const headers = getAuthHeaders();

      if (!headers) {
        alert("Authentication tokens are missing.");
        return; // Exit if headers are not available
      }

      try {
        const response = await fetch(
          `${BASE_URL}/private/productpackaging/delete/${id}`,
          {
            method: "DELETE",
            headers: headers,
          }
        );
        const result = await response.json(); // Parse the JSON response
        if (response.ok && !result.hasError) {
          // alert("Record deleted successfully!");
          toast.success(result.message, {
            position: "top-right",
            autoClose: 5000,
            closeButton: true,
          });
          fetchData(currentPage); // Refresh data after deletion
        } else {
          // alert("Failed to delete the record.");
          toast.error(result.message, {
            position: "top-right",
            autoClose: 5000,
            closeButton: true,
          });
        }
      } catch (error) {
        console.error("Error while deleting record:", error);
      }
    }
  };

  const handleFilter = async () => {
    console.log("yash calling these function");
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
    setisloading(true);
    try {
      const start = 0 * recordsPerPage;
      const response = await fetch(
        `${BASE_URL}/private/productpackaging/search?start=${start}&recordSize=${recordsPerPage}`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ [filterColumn]: filterValue }), // Dynamic filter based on column and value
        }
      );
      setisloading(false);
      if (response.ok) {
        const result = await response.json();
        const { list, records } = result;
        setData(list || []);
        setTotalRecords(records || 0);
        setisFiltered(true);
        setCurrentPage(1); // these is newly added solve filterpagination problem
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
      <ToastContainer />
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
              sm: "90%", // Slightly reduced width on small screens
              md: "93%", // Medium screen adjustments
              lg: "95%", // Larger width for large screens
              xl: "100%", // Even wider for extra-large screens
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight="bold">
                Set Deposit
              </Typography>
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
            <FilterProductDeposit
              filterOpen={filterOpen}
              filterColumn={filterColumn}
              setFilterColumn={setFilterColumn}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              formData={formData}
              handleFilter={handleFilter}
              handleCancelFilter={handleCancelFilter}
            />
          )}

          {showForm && (
            <Card
              className="p-4 mb-4"
              sx={{ backgroundColor: "rgb(230, 230, 250)", marginTop: "8px" }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "green" }}>
                {formData.id
                  ? "Update Products Details"
                  : "Add Products Details"}
              </Typography>
              <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                  {Object.keys(formData)
                    .filter(
                      (key) =>
                        key !== "id" &&
                        key !== "fileModels" &&
                        key != "piboUserModel"
                    )
                    .map((key) => (
                      <Grid item xs={12} sm={6} key={key}>
                        {key === "productPackingType" ? (
                          // Dropdown for productPackingType
                          <FormControl fullWidth>
                            <InputLabel>
                              {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                            </InputLabel>
                            <Select
                              style={{ backgroundColor: "white" }}
                              value={formData[key]}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [key]: e.target.value,
                                })
                              }
                            ></Select>
                          </FormControl>
                        ) : (
                          <TextField
                            fullWidth
                            label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            required
                            error={!!errors[key]}
                            helperText={errors[key]}
                            style={{ backgroundColor: "white" }}
                          />
                        )}
                      </Grid>
                    ))}

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ backgroundColor: "#2d4ef5" }}
                    >
                      {formData.id ? "Update" : "Submit"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setShowForm(false);
                        setErrors({});
                      }}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          )}

          {!showForm &&
            (false ? (
              <LoadingBackdrop isOpen={isLoading} />
            ) : (
              <ProductDepositTable
                data={data}
                formData={formData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}

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
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ProductDeposit;
