// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   TextField,
// } from "@mui/material";
// import LoadingBackdrop from "../../common/LoadingBackdrop.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Sidenav from "../../Navbar/Sidenav.jsx";
// import Navbar from "../../Navbar/Navbar.jsx";
// import CustomTooltip from "../../common/CustomTooltip.jsx";
// import FilterModelGeneration from "./FilterModelGeneration.jsx";
// import PaginationComponent from "../../common/PaginationComponent.jsx";
// import ActionButtons from "../../common/ActionButtons.jsx";
// import ModelGenerationTables from "./ModelGenerationTables.jsx";
// import { BASE_URL } from "../../../config.jsx";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import { toast, ToastContainer } from "react-toastify";

// // Validation rules configuration
// const validationRules = {
//   productName: { maxLength: 255, required: true },
//   productPackingType: { maxLength: 100, required: true },
//   productPackingMaterial: { maxLength: 100, required: true },
//   productWeight: { required: true, type: "double", positive: true },
//   productPackageWeight: { required: true, type: "double", positive: true },
//   productVolume: { required: true, type: "double", positive: true },
//   productDescription: { maxLength: 1000, required: true },
// };

// const ModelGeneration = () => {
//   // Page 3 is for Model Generation
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     productName: "",
//     productPackingType: "",
//     productPackingMaterial: "",
//     productWeight: "",
//     productPackageWeight: "",
//     productVolume: "",
//     productDescription: "",
//     productpackageTypeid :""
//   });
//   const [isLoading, setisloading] = useState(true);
//   const [selectedFiles, setSelectedFiles] = useState([]); // For files selected for upload
//   const [uploadedFilesData, setUploadedFilesData] = useState([]); // For files already uploaded
 
//   const [packingTypeOptions, setPackingTypeOptions] = useState([]);
//   const fetchPackingTypeOptions = async () => {
//     const headers = getAuthHeaders();
//     if (!headers) {
//       return; // Exit if headers are not available
//     }
//     try {
//       const response = await fetch(
//         `${BASE_URL}/private/modelgenerations/product-dropdown`,
//         {
//           method: "GET",
//           headers: headers,
//         }
//       );
//       if (response.ok) {
//         const result = await response.json();
//         if (result && result.list) {
//           setPackingTypeOptions(result.list);
//         }
//       } else {
//         console.error(
//           "Failed to fetch product packing types:",
//           response.status
//         );
//       }
//     } catch (error) {
//       console.error("Error while fetching product packing types:", error);
//     }
//   };
//   const handleFileSelect = (event) => {
//     const files = Array.from(event.target.files);
//     setSelectedFiles((prev) => [...prev, ...files]);
//   };

//   const handleFileRemove = (index) => {
//     setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
//   };
//   const handleFileUpload = async () => {
//     if (selectedFiles.length === 0) {
//       alert("Please select files to upload.");
//       return;
//     }

//     const headers = getAuthHeaders();
//     if (!headers) {
//       alert("Authentication tokens are missing.");
//       return;
//     }

//     try {
//       const uploadedFiles = [];
//       const headers = getAuthHeaders(); // Authentication headers
//       delete headers["Content-Type"]; // Remove Content-Type as FormData handles it automatically

//       for (const file of selectedFiles) {
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await fetch(
//           `${BASE_URL}/private/file/upload-profile-pic`,
//           {
//             method: "POST",
//             headers,
//             body: formData,
//           }
//         );

//         if (response.ok) {
//           const result = await response.json();
//           uploadedFiles.push({
//             fileId: result.view.fileId,
//             originalName: result.view.originalName,
//           });
//         } else {
//           alert(`Failed to upload file: ${file.name}`);
//           const errorResponse = await response.json();
//           alert(`Error uploading file: ${errorResponse.message}`);
//         }
//       }

//       setUploadedFilesData((prev) => [...prev, ...uploadedFiles]);
//       setSelectedFiles([]); // Clear the selected files
//       // alert("Files uploaded successfully!");
//       toast.success("Files Uploaded Successfully", {
//         position: "top-right",
//         autoClose: 5000,
//         closeButton: true,
//       });
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       alert("An error occurred while uploading files.");
//     }
//   };
//   const fetchFileImage = async (fileId, event) => {
//     const headers = getAuthHeaders(); // Retrieve authentication headers
//     if (!headers) {
//       console.error("Authentication tokens are missing.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${BASE_URL}/public/file/download-image?fileId=${fileId}`,
//         { headers }
//       );

//       if (response.ok) {
//         const blob = await response.blob();
//         const imageUrl = URL.createObjectURL(blob);
//         event.target.src = imageUrl; // Update the image source dynamically
//       } else {
//         console.error("Failed to fetch the image.");
//       }
//     } catch (error) {
//       console.error("Error fetching the image:", error);
//     }
//   };

//   const handleUploadedFileRemove = (fileId) => {
//     setUploadedFilesData((prev) =>
//       prev.filter((file) => file.fileId !== fileId)
//     );
//   };

//   const [errors, setErrors] = useState({});
//   // Validation function
//   const validateField = (name, value) => {
//     const rule = validationRules[name];

//     // Check if the field is required and empty
//     if (
//       rule?.required &&
//       (value === undefined || value === null || value.toString().trim() === "")
//     ) {
//       return `${name.replace(/([A-Z])/g, " $1").toUpperCase()} is required.`;
//     }

//     // Check if the value exceeds the maxLength (only for strings)
//     if (rule?.maxLength && value.length > rule.maxLength) {
//       return `${name
//         .replace(/([A-Z])/g, " $1")
//         .toUpperCase()} must not exceed ${rule.maxLength} characters.`;
//     }

//     // Check if the field type is double
//     if (rule?.type === "double") {
//       const numericValue = parseFloat(value);
//       if (isNaN(numericValue)) {
//         return `${name
//           .replace(/([A-Z])/g, " $1")
//           .toUpperCase()} must be a valid number.`;
//       }
//       if (rule?.positive && numericValue <= 0) {
//         return `${name
//           .replace(/([A-Z])/g, " $1")
//           .toUpperCase()} must be positive.`;
//       }
//     }

//     // If a pattern is provided, validate against it
//     if (rule?.pattern && !rule.pattern.test(value)) {
//       return rule.errorMessage || "Invalid format.";
//     }

//     return ""; // No errors
//   };
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPageOptions] = useState([5, 10, 15, 20]);
//   const [recordsPerPage, setRecordsPerPage] = useState(5);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [data, setData] = useState([]);
//   const [filterOpen, setFilterOpen] = useState(false); // Toggle filter menu
//   const [filterColumn, setFilterColumn] = useState(""); // Selected column
//   const [filterValue, setFilterValue] = useState(""); // Filter value
//   const [isfiltered, setisFiltered] = useState(false);

//   const fetchData = async (page) => {
//     const start = (page - 1) * recordsPerPage;
//     const headers = getAuthHeaders();
//     if (!headers) {
//       toast.error(
//         "Authentication failed. Please log in again." ||
//         "Something went wrong!",
//         {
//           position: "top-right",
//           autoClose: 5000,
//           closeButton: true,
//         }
//       );
//       return; // Exit if headers are not available
//     }
//     setisloading(true)
//     const requestBody = isfiltered ? { [filterColumn]: filterValue } : {};

//     try {
//       const response = await fetch(
//         `${BASE_URL}/private/modelgenerations/search?start=${start}&recordSize=${recordsPerPage}`,
//         {
//           method: "POST",
//           headers: headers,
//           body: JSON.stringify(requestBody),
//         }
//       );
//       setisloading(false)
//       if (response.ok) {
//         const result = await response.json();
//         console.log("Result after filter: ", result);
//         const { list, records } = result;
//         setData(list || []);
//         setTotalRecords(records || 0);
//       } else {
//         console.error("Failed to fetch data:", response.status);
//       }
//     } catch (error) {
//       console.error("Error while fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage);
//     if (!showForm) {
//       resetFormData();
//     }
//   }, [currentPage, recordsPerPage, isfiltered]);

//   useEffect(()=>{
//     fetchPackingTypeOptions();  
//   },[])

//   const handleInputChange = (event) => {
//     console.log("yash calling these function");
//     console.log("check event ", event)
//     const { name, value } = event.target;
//     const error = validateField(name, value); // Validate the field whenever it changes
//     // Set form data and error message
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: error });
//   };
//   const handleFormSubmit = async (event) => {
//     console.log("yash calling these function"); // This form is open for Adding and updating the details
//     event.preventDefault();

//     const validationErrors = {};
//     Object.keys(formData).forEach((key) => {
//       const error = validateField(key, formData[key]);
//       if (error) validationErrors[key] = error;
//     });

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       alert("Please fix the validation errors.");
//       return;
//     }
//     if (!uploadedFilesData.length) {
//       alert("At least one file must be uploaded.");
//       return;
//     }

//     console.log("checking  the form data ",formData)
    
//     const formDataToSubmit ={
//       id: formData.id || undefined, // Include ID for updates, undefined for new records
//       productName: formData.productName, // Ensure formData contains all required fields
//       productPackingType: formData.productPackingType,
//       productPackingMaterial: formData.productPackingMaterial,
//       productWeight: formData.productWeight, // Convert to number
//       productPackageWeight: formData.productPackageWeight, // Convert to number
//       productVolume: formData.productVolume, // Convert to number
//       productDescription: formData.productDescription,
//       packagingView: {
//         id: formData.productpackageTypeid, // Ensure this ID is provided in the formData
//       },
//       fileModels: uploadedFilesData.map((file) => ({
//         fileId: file.fileId, // Map the uploaded files correctly
//       })),
//     }

//     console.log(
//       "check formDataToSubmit in handleFormSubmit :",
//       formDataToSubmit
//     );

//     const isFormValid = Object.values(formData).every(
//       (field) =>
//         field !== null && field !== undefined && field.toString().trim() !== ""
//     );
//     if (!isFormValid) {
//       alert("All fields are mandatory!");
//       return;
//     }
//     const url = formData.id
//       ? `${BASE_URL}/private/modelgenerations/update` // Update API
//       : `${BASE_URL}/private/modelgenerations/save`; // Add API

//     const method = formData.id ? "PUT" : "POST";
//     const headers = getAuthHeaders();
//     if (!headers) {
//       alert("Authentication tokens are missing.");
//       return; // Exit if headers are not available
//     }
//     try {
//       const response = await fetch(url, {
//         method: method,
//         headers: headers,
//         // body: JSON.stringify(formData),
//         body: JSON.stringify(formDataToSubmit),
//       });
//       const result = await response.json();
//       if (response.ok && !result.hasError) {
//         if (formData.id) {
//           console.log("check here formData.id ")
//           toast.success("Record updated Successfully", {
//             position: "top-right",
//             autoClose: 5000,
//             closeButton: true,
//           })
//           fetchData(currentPage);
//           setShowForm(false);
//         }
//         else {
//           console.log("check here else part")
//           toast.success("Record added Successfully", {
//             position: "top-right",
//             autoClose: 5000,
//             closeButton: true,
//           })
//           fetchData(currentPage);
//           setShowForm(false);
//         }

//         fetchData(currentPage);
//         setShowForm(false);
//         // Reset form only if adding a new record
//         if (!formData.id) {
//           setFormData({
//             productName: "",
//             productPackingType: "",
//             productPackingMaterial: "",
//             productWeight: "",
//             productPackageWeight: "",
//             productVolume: "",
//             productDescription: "",
//           });
         
//         }
//       } else {
       
//         toast.error(result.message || "Failed to submit form!", {
//           position: "top-right",
//           autoClose: 5000,
//           closeButton: true,
//         })
//       }
//     } catch (error) {
//       console.error("Error while submitting form:", error);
//     }
//   };
//   const handleEdit = async (item) => {
//     console.log("Fetching data for ID:", item.id);
//     const headers = getAuthHeaders();

//     try {
//       // Fetch data from the API
//       const response = await fetch(
//         `${BASE_URL}/private/modelgenerations/view/${item.id}`,
//         {
//           method: "GET",
//           headers,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error fetching data: ${response.statusText}`);
//       }

//       const data = await response.json();

//       // Set form fields with the data from the API
//       setFormData({
//         productName: data.view.productName || "",
//         productPackingType: data.view.packagingView.packagingType || "",
//         productPackingMaterial: data.view.productPackingMaterial || "",
//         productWeight: data.view.productWeight || "",
//         productPackageWeight: data.view.productPackageWeight || "",
//         productVolume: data.view.productVolume || "",
//         productDescription: data.view.productDescription || "",
//         productpackageTypeid:data.view.packagingView.id || "",
//         id: data.view.id, // Include the ID for update API
//       });

//       // Set uploaded files data
//       setUploadedFilesData(
//         (data.view.fileModels || []).map((file) => ({
//           fileId: file.fileId,
//           originalName: file.originalName,
//         }))
//       );

//       // Show the form
//       setShowForm(true);
//     } catch (error) {
//       console.error("Error in handleEdit:", error.message);
//       // alert("Failed to fetch data for editing. Please try again.");
//       toast.error("Failed to fetch data for editing. Please try again ", {
//         position: "top-right",
//         autoClose: 5000,
//         closeButton: true,
//       })

//     }
//   };
//   const resetFormData = () => {
//     console.log("yash calling these function");
//     setFormData({
//       productName: "",
//       productPackingType: "",
//       productPackingMaterial: "",
//       productWeight: "",
//       productPackageWeight: "",
//       productVolume: "",
//       productDescription: "",
//     });
//     setSelectedFiles([]);
//     setUploadedFilesData([]);
//     setErrors({});
//   };

//   const handleDelete = async (id) => {
//     console.log("yash calling these function");
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       const headers = getAuthHeaders();

//       if (!headers) {
//         alert("Authentication tokens are missing.");
//         return; // Exit if headers are not available
//       }

//       try {
//         const response = await fetch(
//           `${BASE_URL}/private/modelgenerations/delete/${id}`,
//           {
//             method: "DELETE",
//             headers: headers,
//           }
//         );
//         const result = await response.json(); // Parse JSON response
//         if (response.ok  && !result.hasError) {
//           // alert("Record deleted successfully!");
//           toast.success(result.message, {
//             position: "top-right",
//             autoClose: 5000,
//             closeButton: true,
//           })
//           fetchData(currentPage); // Refresh data after deletion
//         } else {
//           // alert("Failed to delete the record.");
//           toast.error(result.message, {
//             position: "top-right",
//             autoClose: 5000,
//             closeButton: true,
//           })
//         }
//       } catch (error) {
//         console.error("Error while deleting record:", error);
//         toast.error(
//           "An unexpected error occurred. Please try again later.",
//           {
//               position: "top-right",
//               autoClose: 5000,
//               closeButton: true,
//           }
//       );
//       }
//     }
//   };

//   const handleFilter = async () => {
//     console.log("yash calling these function");
//     if (!filterColumn || !filterValue) {
//       // alert("Please select a column and enter a value to filter.");
//       toast.error(
//         "Please Select The Filter You Want To Filter Out..." ||
//         "Something went wrong!",
//         {
//           position: "top-right",
//           autoClose: 5000,
//           closeButton: true,
//         }
//       );
//       return;
//     }

//     const headers = getAuthHeaders();
//     if (!headers) {
//       alert("Authentication tokens are missing.");
//       return; // Exit if headers are not available
//     }
//     try {
//       const start = 0 * recordsPerPage;
//       setisloading(true)
//       const response = await fetch(
//         `${BASE_URL}/private/modelgenerations/search?start=${start}&recordSize=${recordsPerPage}`,
//         {
//           method: "POST",
//           headers: headers,
//           body: JSON.stringify({ [filterColumn]: filterValue }), // Dynamic filter based on column and value
//         }
//       );
//       setisloading(false)
//       if (response.ok) {
//         const result = await response.json();
//         const { list, records } = result;
//         setData(list || []);
//         setTotalRecords(records || 0);
//         setisFiltered(true);
//         setCurrentPage(1);// these is newly added solve filterpagination problem
//         console.log("check in HandleFilter isfiltered?", isfiltered);
//         toast.success(result.message , {
//           position: "top-right",
//           autoClose: 5000,
//           closeButton: true,
//       });
//       } else {
//         const result = await response.json();
//         console.error("Failed to filter data:", response.status);
//         toast.error(
//           result.message ,
//           {
//               position: "top-right",
//               autoClose: 5000,
//               closeButton: true,
//           }
//       );

//       }
//     } catch (error) {
//       console.error("Error while filtering data:", error);
//     }
//   };
//   // Cancel filter and reset data

//   const handleCancelFilter = () => {
//     console.log("yash calling these function");
//     setFilterColumn("");
//     setFilterValue("");
//     setFilterOpen(false);
//     fetchData(currentPage); // Reload data
//     setisFiltered(false);
//     console.log("check in HandleCanceliter isfiltered ?", isfiltered);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleRecordsPerPageChange = (value) => {
//     setRecordsPerPage(value);
//     setCurrentPage(1); // Reset to the first page when changing the records per page
//   };

//   const getAuthHeaders = () => {
//     const accessToken = localStorage.getItem("accessToken"); // Replace with the key for your access token
//     const refreshToken = localStorage.getItem("refreshToken"); // Replace with the key for your refresh token

//     if (!accessToken || !refreshToken) {
//       console.error("Access or refresh token is missing");
//       return null; // Return null if tokens are not available
//     }
//     return {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       refreshToken: `Bearer ${refreshToken}`,
//     };
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Navbar />
//       <Box height={70} />
//       <Box sx={{ display: "flex" }}>
//         <Sidenav />
//         <Box
//           component="main"
//           sx={{ 
//             flexGrow: 1, p: 3, maxWidth: { xs: "84%", 
//              sm: "90%", // Slightly reduced width on small screens
//              md: "93%", // Medium screen adjustments
//              lg: "95%", // Larger width for large screens
//              xl: "100%", // Even wider for extra-large screens 
//             }}}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               {/* <Card>
//                 <CardContent sx={{ backgroundColor: "whitesmoke" }}>
//                   <Typography variant="h5">Model Generation</Typography>
//                 </CardContent>
//               </Card> */}

//             <Typography variant="h5" fontWeight="bold">Model Generation</Typography>
//             </Grid>
//           </Grid>
//           <Box height={20} />
//           <ActionButtons
//             showForm={showForm}
//             onAddClick={() => {
//               resetFormData();
//               setShowForm(!showForm);
//             }}
//             filterOpen={filterOpen}
//             onFilterClick={() => setFilterOpen(!filterOpen)}
//           />

//           {filterOpen && (
//             <FilterModelGeneration
//             filterOpen={filterOpen}
//             formData={formData}
//             filterColumn={filterColumn}
//             setFilterColumn={setFilterColumn}
//             filterValue={filterValue}
//             setFilterValue={setFilterValue}
//             handleFilter={handleFilter}
//             handleCancelFilter={handleCancelFilter}
//           />
//           )}

//           {showForm && (
//             <Card className="p-4 mb-4" sx={{backgroundColor:"rgb(230, 230, 250)" , marginTop:"8px"}}>
//               <Typography variant="h6" gutterBottom sx={{ color: "green" }} >
//                 {formData.id
//                   ? "Update Products Details"
//                   : "Add Products Details"}
//               </Typography>
//               <form onSubmit={handleFormSubmit}>
//                 <Grid container spacing={2} >
//                   {Object.keys(formData)
//                     .filter(
//                       (key) =>
//                         key !== "id" &&
//                         key !== "fileModels" &&
//                         key !== "piboUserModel" &&
//                         key !== "productpackageTypeid"
//                     )
//                     .map((key) => (
//                       <Grid item xs={12} sm={6} key={key}>
//                         {key === "productPackingType" ? (
//                           // Dropdown for productPackingType
//                           <FormControl fullWidth>
//                             <InputLabel id={`${key}-label`}>
//                               {key.replace(/([A-Z])/g, " $1").toUpperCase()}
//                             </InputLabel>
//                             <Select
//                             labelId={`${key}-label`}
//                             id={`${key}-select`}
//                             // style={{backgroundColor:"white"}}
//                               value={formData[key]}
//                               onChange={(e) => {
//                                 const selectedOption = packingTypeOptions.find(
//                                   (option) => option.value === e.target.value
//                                 );
//                                 setFormData({
//                                   ...formData,
//                                   [key]: e.target.value,
//                                   productpackageTypeid: selectedOption ? selectedOption.key : "",
//                                 });
//                               }}
//                               label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
//                               style={{ backgroundColor: "white" }}
//                             >
//                               {packingTypeOptions.map((option) => (
//                                 <MenuItem  key={option.key} value={option.value}>
//                                   {option.value}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </FormControl>
//                         ) : (
//                           <TextField
//                             fullWidth
//                             label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
//                             name={key}
//                             value={formData[key]}
//                             onChange={handleInputChange}
//                             required
//                             error={!!errors[key]}
//                             helperText={errors[key]}
//                             style={{backgroundColor:"white"}}
//                           />
//                         )}
//                       </Grid>
//                     ))}


//                   {/* File Upload Section */}
//                   <Grid item xs={8}>
//                     <Typography variant="subtitle1" color="green">
//                       *Upload Files:
//                     </Typography>
//                     <input
//                       type="file"
//                       multiple
//                       onChange={handleFileSelect}
//                       style={{ marginBottom: "10px" }}
//                     />
//                     {selectedFiles.map((file, index) => (
//                       <Box
//                         key={index}
//                         display="flex"
//                         alignItems="center"
//                         justifyContent="space-between"
//                         marginBottom="10px"
//                       >
//                         <Typography variant="body2">{file.name}</Typography>
//                         <Button
//                           variant="outlined"
//                           color="secondary"
//                           onClick={() => handleFileRemove(index)}
//                         >
//                           Cancel
//                         </Button>
//                       </Box>
//                     ))}
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={handleFileUpload}
//                       disabled={selectedFiles.length === 0}
//                     >
//                       Upload Files
//                     </Button>
//                   </Grid>

//                   {/* Preview Previously Uploaded Files */}
//                   <Grid item xs={8}>
//                     <Typography variant="subtitle1">
//                       Previously Uploaded Files:
//                     </Typography>
//                     <Grid container spacing={2}>
//                       {uploadedFilesData.map((file, index) => (
//                         <Grid item xs={6} sm={3} key={index}>
//                           <img
//                             src={`${BASE_URL}/public/file/download-image?fileId=${file.fileId}`}
//                             alt={file.originalName}
//                             style={{
//                               width: "50%",
//                               height: "100px",
//                               objectFit: "contain",
//                               // y                             borderRadius: "8px",
//                             }}
//                             onError={(e) => fetchFileImage(file.fileId, e)}
//                           />
//                           <Typography variant="body2">
//                             {file.originalName}
//                           </Typography>
//                           <Button
//                             variant="outlined"
//                             color="secondary"
//                             onClick={() =>
//                               handleUploadedFileRemove(file.fileId)
//                             }
//                             style={{ marginTop: "5px" }}
//                           >
//                             Remove
//                           </Button>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Grid>

                 
//                   <Grid item xs={12}>
//                     <Button variant="contained" color="primary" sx={{backgroundColor:"#2d4ef5"}} type="submit">
//                       {formData.id ? "Update" : "Submit"}
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       color="secondary"
//                       onClick={() => {
//                         setShowForm(false);
//                       }}
//                       style={{ marginLeft: "10px", backgroundColor:"red" ,color:"white" }}
//                     >
//                       Cancel
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </form>

//             </Card>
//           )}

//           {!showForm && (
//              false ? (
//               <LoadingBackdrop isOpen={isLoading} />
//             ):(
//             <ModelGenerationTables
//             data={data}
//             formData={formData}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//           />
//           )
//           )}

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: "16px",
//               flexDirection: "column",
//               textAlign: "center",
//             }}
//           >

//             {!showForm && (
//             <PaginationComponent
//               currentPage={currentPage}
//               totalRecords={totalRecords}
//               recordsPerPage={recordsPerPage}
//               recordsPerPageOptions={recordsPerPageOptions}
//               onPageChange={handlePageChange}
//               onRecordsPerPageChange={handleRecordsPerPageChange}
//             />)}
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };
// export default ModelGeneration;


















// yash code below
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import LoadingBackdrop from "../../common/LoadingBackdrop.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidenav from "../../Navbar/Sidenav.jsx";
import Navbar from "../../Navbar/Navbar.jsx";
import CustomTooltip from "../../common/CustomTooltip.jsx";
import FilterModelGeneration from "./FilterModelGeneration.jsx";
import PaginationComponent from "../../common/PaginationComponent.jsx";
import ActionButtons from "../../common/ActionButtons.jsx";
import ModelGenerationTables from "./ModelGenerationTables.jsx";
import { BASE_URL } from "../../../config.jsx";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
const ModelGeneration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profileImage: "",
    createdAt: "",
    photo: "", // Add photo field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const email = userData.email;
        if (!token || !email) return;

        const res = await fetch(
          `http://localhost:5000/api/auth/users?search=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFormData(data[0]);
        } else if (data.users && Array.isArray(data.users) && data.users.length > 0) {
          setFormData(data.users[0]);
        } else {
          toast.error("User not found");
        }
      } catch (error) {
        toast.error("Error fetching user profile");
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle photo file selection
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPhoto(e.target.files[0]);
      setFormData((prev) => ({
        ...prev,
        photo: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const payload = new FormData();
      payload.append("username", formData.username);
      if (selectedPhoto) {
        payload.append("photo", selectedPhoto);
      }

      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "Profile updated successfully!");
        setIsEditing(false);
        // Update formData with new photo URL if returned
        if (result.user) {
          setFormData((prev) => ({
            ...prev,
            username: result.user.username,
            photo: result.user.photo || prev.photo,
          }));
        }
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile");
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
                User Profile
              </Typography>
            </Grid>
          </Grid>
          <Box height={20} />
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
            <form style={{ width: "100%", maxWidth: 400 }}>
              <Avatar
                src={formData.photo || formData.profileImage}
                alt="Profile"
                sx={{ width: 100, height: 100, margin: "0 auto 16px" }}
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ marginBottom: "16px" }}
                />
              )}
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled={!isEditing}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Profile Image"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Created At"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled
              />
              {!isEditing ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  sx={{ mt: 2 }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              )}
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};


export default ModelGeneration;


















