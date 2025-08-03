// import React, { useState, useEffect, useRef } from "react";
// import Box from "@mui/material/Box";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config";
// import {
//   Typography,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Button,
//   TextField,
//   Stack,
//   Grid,
//   Modal,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import VerifyOTPModal from "./VerifyOTPModal";
// import LoadingBackdrop from "../common/LoadingBackdrop.jsx";

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [showOTPModal, setShowOTPModal] = useState(false);
//   const [email, setEmail] = useState(""); // Replace with dynamic email if needed
//   // const [flagforOTP ,setflagforOTP] = useState("signup")
//   const handleOpenModal = () => setShowOTPModal(true);
//   const handleCloseModal = () => setShowOTPModal(false);

//   const [formData, setFormData] = useState({
//     applicationType: "",
//     companyLegalName: "",
//     companyTradeName: "",
//     typeOfBusiness: "",
//     typeOfCompany: "",
//     businessDescription: "",
//     state: "",
//     registrationAddress: "",
//     district: "",
//     pinCode: "",
//     cin: "",

//     // New fields for Company PAN
//     companyPan: "",
//     companyPanLegalName: "",
//     companyPanLegalFatherName: "",
//     dateOfIncorporation: "",

//     // New fields for Authorised Person
//     personName: "",
//     personDesignation: "",
//     personMobileNum: "",
//     personReservedNumber: "",

//     // New fields for Authorised Person PAN
//     personPan: "",
//     personPanName: "",
//     personPanFatherName: "",
//     personPanDateOfBirth: "",

//     // New fields for Other details
//     gst: "", // For GST
//     tan: "", // For TAN
//     licenseNo: "", // For License No
//     otherInformation: "", // For Other Information
//     // New fields for Login Details
//     name: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//     mobile: "",
//   });
//   const [states, setStates] = useState([]); // State to hold API response for states
//   const [formErrors, setFormErrors] = useState({});
//   const [selectedFiles, setSelectedFiles] = useState([]); // For files selected for upload
//   const [uploadedFilesData, setUploadedFilesData] = useState([]); // For files already uploaded

//   const [ifEditClick, setEditClick] = useState(false);
//   const [isLoading, setisloading] = useState(true);



//   // Fetch states from API on component mount
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         setisloading(true)
//         const response = await fetch(
//           `${BASE_URL}/public/state?countryId=96`
//         );
//         const data = await response.json();
//         setisloading(false)
//         if (data && !data.hasError && Array.isArray(data.list)) {
//           setStates(data.list); // Update states with API response
//         }
//       } catch (error) {
//         // Display error toast with a red theme
//         toast.error(error || "Something went wrong!", {
//           position: "top-right",
//           autoClose: 5000,
//           closeButton: true,
//         });
//       }
//     };
//     fetchStates();
//   }, []);

//   const [showcin, setShowcin] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     validateField(name, value);
    
//   };
//   const validationRules = {
//     applicationType: {
//       required: true,
//       maxLength: 100,
//       message:
//         "Application Type is mandatory and should not exceed 100 characters.",
//     },
//     companyLegalName: {
//       required: true,
//       maxLength: 100,
//       message:
//         "Company Legal Name is mandatory and should not exceed 100 characters.",
//     },
//     companyTradeName: {
//       required: true,
//       maxLength: 100,
//       message:
//         "Company Trade Name is mandatory and should not exceed 100 characters.",
//     },
//     typeOfBusiness: {
//       required: true,
//       maxLength: 50,
//       message:
//         "Type of Business is mandatory and should not exceed 50 characters.",
//     },
//     typeOfCompany: {
//       required: true,
//       maxLength: 100,
//       message:
//         "Type of Company is mandatory and should not exceed 100 characters.",
//     },
//     businessDescription: {
//       required: true,
//       maxLength: 255,
//       message:
//         "Business Description is mandatory and should not exceed 255 characters.",
//     },
//     state: {
//       required: true,
//       maxLength: 255,
//       message: "State is mandatory and should not exceed 255 characters.",
//     },
//     registrationAddress: {
//       required: true,
//       maxLength: 255,
//       message:
//         "Registration Address is mandatory and should not exceed 255 characters.",
//     },
//     // District
//     district: {
//       required: true,
//       maxLength: 255,
//       message: "District is mandatory and should not exceed 255 characters.",
//     },
//     // Pincode
//     pinCode: {
//       required: true,
//       maxLength: 10,
//       message: "Pincode is mandatory and should not exceed 10 characters.",
//     },
//     // CIN (Optional)
//     cin: {
//       maxLength: 255,
//       message: "CIN should not exceed 255 characters.",
//     },
//     // Company PAN
//     companyPan: {
//       required: true,
//       regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//       message:
//         "Company PAN is mandatory and should be in a valid format (e.g., ABCDE1234F).",
//     },
//     // Company PAN Legal Name
//     companyPanLegalName: {
//       required: true,
//       maxLength: 100,
//       message:
//         "Company PAN Legal Name is mandatory and should not exceed 100 characters.",
//     },
//     // Company PAN Father Name (Optional)
//     companyPanLegalFatherName: {
//       maxLength: 100,
//       message: "Company PAN Father Name should not exceed 100 characters.",
//     },
//     // Date of Incorporation
//     dateOfIncorporation: {
//       required: true,
//       message: "Date of Incorporation is mandatory.",
//     },
//     // Authorized Person Name
//     personName: {
//       required: true,
//       maxLength: 100,
//       message:
//         "Authorized Person Legal Name is mandatory and should not exceed 100 characters.",
//     },
//     // Authorized Person Designation
//     personDesignation: {
//       required: true,
//       maxLength: 100,
//       message:
//         "Authorized Person Designation is mandatory and should not exceed 100 characters.",
//     },
//     // Authorized Person Mobile Number
//     personMobileNum: {
//       required: true,
//       maxLength: 15,
//       message:
//         "Authorized Person Mobile Number is mandatory and should not exceed 15 characters.",
//     },
//     // Authorized Person PAN
//     personPan: {
//       required: true,
//       regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//       message:
//         "Authorized Person PAN is mandatory and should be in a valid format (e.g., ABCDE1234F).",
//     },
//     // Authorized Person PAN Name
//     personPanName: {
//       required: true,
//       maxLength: 100,
//       message:
//         "Authorized Person PAN Legal Name is mandatory and should not exceed 100 characters.",
//     },
//     // Authorized Person PAN Father Name (Optional)
//     personPanFatherName: {
//       maxLength: 100,
//       message:
//         "Authorized Person PAN Father Name should not exceed 100 characters.",
//     },
//     // Date of Birth
//     personPanDateOfBirth: {
//       required: true,
//       message: "Date of Birth is mandatory.",
//     },
//     // GST
//     gst: {
//       required: true,
//       regex: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
//       message: "GST number is mandatory and should be in a valid format.",
//     },
//     // TAN
//     tan: {
//       required: true,
//       regex: /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/,
//       message: "Tan is mandatory and should be in a valid formatbe like ABCD12345E",
//     },
//     // License Number
//     licenseNo: {
//       required: true,
//       maxLength: 20,
//       message:
//         "License Number is mandatory and should not exceed 20 characters.",
//     },
//     // Other Information (Optional)
//     otherInformation: {
//       maxLength: 255,
//       message: "Other Information should not exceed 255 characters.",
//     },
//     password: {
//       required: true,
//       maxLength: 100,
//       pattern: null, // Add a regex if necessary
//     },
//     confirmpassword: {
//       required: true,
//       customValidation: (value, formData) =>
//         value === formData.password ? null : "Passwords do not match",
//     },
//   };
//   const validateField = (name, value) => {
//     const rule = validationRules[name];
//     if (!rule) return; // Skip validation if no rules for the field
//     let error = "";
//     const trimmedValue = (value || "").trim();
//     if (rule.required && !trimmedValue) {
//       error =
//         rule.message?.split("and")[0]?.trim() || "This field is required.";
//     } else if (rule.maxLength && value.length > rule.maxLength) {
//       error =
//         rule.message ||
//         `This field should not exceed ${rule.maxLength} characters.`;
//     } else if (rule.regex && !new RegExp(rule.regex).test(value)) {
//       error = rule.message || "Invalid format.";
//     } else if (rule.customValidation) {
//       const customError = rule.customValidation(value, formData); // Pass `formData` for dependent validations
//       if (customError) {
//         error = customError;
//       }
//     }

//     setFormErrors((prev) => ({ ...prev, [name]: error }));
//   };
//   const validateForm = () => {
//     let isValid = true;
//     Object.keys(validationRules).forEach((field) => {
//       validateField(field, formData[field]);
//       if (formErrors[field]) isValid = false;
//     });
//     return isValid;
//   };

//   // Inside your component
//   const [showpassword, setShowpassword] = useState(false);
//   const [showConfirmpassword, setShowConfirmpassword] = useState(false);
//   // Function to toggle password visibility
//   const handleTogglepasswordVisibility = () => {
//     setShowpassword(!showpassword);
//   };

//   const handleToggleConfirmpasswordVisibility = () => {
//     setShowConfirmpassword(!showConfirmpassword);
//   };

//   const handleFileSelect = (event) => {
//     const files = Array.from(event.target.files);
//     setSelectedFiles((prev) => [...prev, ...files]);
//   };
//   const handleFileRemove = (index) => {
//     setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleFileUpload = async () => {
//     try {
//       const uploadedFiles = [];
//       // const headers = getAuthHeaders(); // Authentication headers
//       // delete headers["Content-Type"]; // Remove Content-Type as FormData handles it automatically
//       setisloading(true)
//       for (const file of selectedFiles) {
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await fetch(
//           `${BASE_URL}/public/file/upload-profile-pic`,
//           {
//             method: "POST",
//             // headers,
//             body: formData,
//           }
//         );
//         setisloading(false)
//         if (response.ok) {
//           const result = await response.json();
//           uploadedFiles.push({
//             fileId: result.view.fileId,
//             originalName: result.view.originalName,
//           });
//         } else {
//           // alert(`Failed to upload file: ${file.name}`);
//           // Display error toast with a red theme
//           toast.error(
//             `Failed to upload file: ${file.name} ` || "Something went wrong!",
//             {
//               position: "top-right",
//               autoClose: 5000,
//               closeButton: true,
//             }
//           );

//           const errorResponse = await response.json();
//           // Display error toast with a red theme
//           toast.error(
//             `Error uploading file: ${errorResponse.message}` ||
//             "Something went wrong!",
//             {
//               position: "top-right",
//               autoClose: 5000,
//               closeButton: true,
//             }
//           );

//           // alert(`Error uploading file: ${errorResponse.message}`);
//         }
//       }

//       setUploadedFilesData((prev) => [...prev, ...uploadedFiles]);
//       setSelectedFiles([]); // Clear the selected files
//       // alert("Files uploaded successfully!");
//       // Success toast with a green theme
//       toast.success("Files Uploaded Successfully", {
//         position: "top-right",
//         autoClose: 5000,
//         closeButton: true,
//       });
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       // alert("An error occurred while uploading files.");
//       // Display error toast with a red theme
//       toast.error("Error uploading files:", error || "Something went wrong!", {
//         position: "top-right",
//         autoClose: 5000,
//         closeButton: true,
//       });
//     }
//   };

//   const fetchFileImage = async (fileId, event) => {
//     console.log("hii", fileId);
//     const headers = getAuthHeaders(); // Retrieve authentication headers
//     if (!headers) {
//       console.error("Authentication tokens are missing.");
//       return;
//     }

//     try {
//       console.log("check  yash header: ", fileId);

//       const response = await fetch(
//         `${BASE_URL}/public/file/download-image?fileId=${fileId}`,
//         {
//           headers,
//         }
//       );
//       console.log("check response here ", response);
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
//     setSelectedFiles([]);
//   };
//   const resetFormData = () => {
//     setFormData({
//       applicationType: "",
//       companyLegalName: "",
//       companyTradeName: "",
//       typeOfBusiness: "",
//       typeOfCompany: "",
//       businessDescription: "",
//       state: "",
//       registrationAddress: "",
//       district: "",
//       pinCode: "",
//       cin: "",
//       companyPan: "",
//       companyPanLegalName: "",
//       companyPanLegalFatherName: "",
//       dateOfIncorporation: "",
//       personName: "",
//       personDesignation: "",
//       personMobileNum: "",
//       personReservedNumber: "",
//       personPan: "",
//       personPanName: "",
//       personPanFatherName: "",
//       personPanDateOfBirth: "",
//       gst: "",
//       tan: "",
//       licenseNo: "",
//       otherInformation: "",
//       name: "",
//       email: "",
//       password: "",
//       mobile: "",
//       confirmpassword: "",
//     });
//     setSelectedFiles([]);
//     setUploadedFilesData([]);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);

//     if (validateForm()) {
//       console.log("Form submitted:", formData);

//       const uploadedFiles = uploadedFilesData[0];
//       console.log("Check uploaded files:", uploadedFiles);

//       const dataToSubmit = {
//         applicationType: formData.applicationType,
//         companyLegalName: formData.companyLegalName,
//         companyTradeName: formData.companyTradeName,
//         typeOfBusiness: formData.typeOfBusiness,
//         typeOfCompany: formData.typeOfCompany,
//         businessDescription: formData.businessDescription,
//         state: formData.state,
//         registrationAddress: formData.registrationAddress,
//         district: formData.district,
//         pinCode: formData.pinCode,
//         cin: formData.cin,
//         companyPan: formData.companyPan,
//         companyPanLegalName: formData.companyPanLegalName,
//         companyPanLegalFatherName: formData.companyPanLegalFatherName,
//         dateOfIncorporation: formData.dateOfIncorporation,
//         personName: formData.personName,
//         personDesignation: formData.personDesignation,
//         personMobileNum: formData.personMobileNum,
//         personReservedNumber: formData.personReservedNumber,
//         personPan: formData.personPan,
//         personPanName: formData.personPanName,
//         personPanFatherName: formData.personPanFatherName,
//         personPanDateOfBirth: formData.personPanDateOfBirth,
//         gst: formData.gst,
//         tan: formData.tan,
//         licenseNo: formData.licenseNo,
//         otherInformation: formData.otherInformation,
//         userView: {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           mobile: formData.mobile,
//         },
//         fileModel: {
//           fileId: uploadedFiles?.fileId,
//         },
//       };

//       const headers = getAuthHeaders();

//       try {
//         setisloading(true)
//         const response = await fetch(`${BASE_URL}/public/pibo/save`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataToSubmit),
//         });

//         const result = await response.json();
//         setisloading(false)
//         if (response.ok && !result.hasError) {
//           toast.success(result.message || "Data saved successfully!");
//           setEmail(formData.email); // Set the email for OTP verification
//           setShowOTPModal(true); // Show OTP modal after successful submission
//         } else {
//           console.error("Error from API:", result);
//           toast.error(result.message || "An error occurred.");
//         }
//       } catch (error) {
//         console.error("Submission failed:", error);
//         toast.error("An unexpected error occurred. Please try again later.", {
//           position: "top-right",
//           autoClose: 5000,
//           closeButton: true,
//         });
//       }
//     } else {
//       console.log("Form contains errors:", formErrors);
//       alert("Please fix the errors in the form before submitting.");
//     }
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
//       <Box height={30} />
//       <Box sx={{ display: "flex" }}>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             maxWidth: {
//               xs: "84%",
//               sm: "90%", // Slightly reduced width on small screens
//               md: "93%", // Medium screen adjustments
//               lg: "95%", // Larger width for large screens
//               xl: "100%", // Even wider for extra-large screens
//             },
//           }}
//         >
//           <Box height={20} />

//           <form
//             onSubmit={handleSubmit}
//             style={{
//               marginTop: "20px",
//               paddingLeft: "30px",
//               paddingRight: "30px",
//               backgroundColor: "white",
//             }}
//           >
//             <Typography
//               variant="h4"
//               align="center"
//               gutterBottom
//               sx={{ color: "green" }}
//             >
//               Registration Form for Producer, Importer and Brand Owner
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               align="center"
//               color="textSecondary"
//               gutterBottom
//               sx={{ color: "red" }}
//             >
//               Starred (*) fields are mandatory
//             </Typography>
//             <Grid container spacing={3}>
//               {/* Applicant Type */}
//               <Grid item xs={6}>
//                 <Typography className="typography-subtitle" variant="h6">
//                   Applicant Type
//                 </Typography>
//                 <br></br>
//                 <FormControl fullWidth>
//                   <InputLabel>Select Applicant Type *</InputLabel>
//                   <Select
//                     name="applicationType"
//                     value={formData.applicationType}
//                     onChange={handleInputChange}
//                     required
//                     label="Select Applicant Type *"
//                   >
//                     <MenuItem value="Brand Owner">Brand Owner</MenuItem>
//                     <MenuItem value="Producer">Producer</MenuItem>
//                     <MenuItem value="Importer">Importer</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               {/* Entity Details */}
//               <Grid item xs={12}>
//                 <Typography className="typography-subtitle" variant="h6">
//                   Entity Details
//                 </Typography>
//               </Grid>
         
             
//               {/* Subheader for Login Details */}

             
//               {/* Submit Button */}
//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   style={{ width: "100px" }}
//                   fullWidth
//                 >
//                   {/* Register */}
//                   {formData.id ? "Update" : "Register"}
//                 </Button>
//                 {/* OTP Modal */}
//                 {/* Conditional rendering for LoadingBackdrop or VerifyOTPModal */}
//                 {isLoading ? (
//                   <LoadingBackdrop isOpen={isLoading} />
//                 ) : (
//                   <VerifyOTPModal
//                     email={email}
//                     open={showOTPModal}
//                     handleClose={handleCloseModal}
//                   />
//                 )}

//               </Grid>

//               {/* Cancle Button*/}
//               <Grid item xs={12}>
//                 <Button
//                   onClick={() => {
//                     // setShowForm(false);
//                     navigate("/");
//                     setSelectedFiles([]);
//                     setUploadedFilesData([]);
//                   }}
//                   variant="contained"
//                   sx={{ backgroundColor: "red" }}
//                   color="primary"
//                   type="submit"
//                   style={{ width: "100px" }}
//                   fullWidth
//                 >
//                   Cancel
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default SignupPage;


















import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons
import LoadingBackdrop from "../common/LoadingBackdrop";
import VerifyOTPModal from "./VerifyOTPModal";
import LoginTypeSelector from "./LoginTypeSelector";
import { Typography } from "@mui/material";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const [sendotp, setsendotp] = useState(false)

  const navigate = useNavigate();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isLoading, setisloading] = useState(false);
  const { login } = useAuth(); // Access login function from context
  const [loginType, setLoginType] = useState("Pibo"); // For selecting login type
  const [showLoginForm, setShowLoginForm] = useState(true);
  const handleOpenModal = () => setShowOTPModal(true);
  const handleCloseModal = () => setShowOTPModal(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleRegister = async () => {
  setisloading(true);
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      email,
      username,
      password,
    });
    setisloading(false);

    // Show success message from backend
    toast.success(response.data.message || "Registration successful!");

    // Optionally, navigate to login page after registration
    setTimeout(() => {
      navigate("/");
    }, 1800); // 1.8 seconds

  } catch (error) {
    setisloading(false);
    console.error("Registration error:", error);
    toast.error(
      error.response?.data?.message || "Error registering. Please try again."
    );
  }
};



  console.log("check logintype", loginType)
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && email && password) {
      handleRegister();
    }

  };


  console.log("check login Type :", loginType)
  return (
    <div className="login-page">
      <ToastContainer />
        <div className="login-form" style={{position: "relative",top:"110px",backgroundColor:"lavender"}}>
          <div className="logo-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-5%" }}>
            {/* <img
              src="endloslogo_3.png"
              alt="Endlos DDRS Logo"
              style={{
                height: "75px",
                width: "auto",
                maxWidth: "70%",
                objectFit: "contain",
              }}
            /> */}
           <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // horizontally center content
    justifyContent: "center",
    textAlign: "center", // center text inside Typography
  }}
>
  <Typography
    variant="h4"
    sx={{
      fontWeight: "bold",
      color: "#1976d2",
      mb: 1,
    }}
  >
    Maxlence
  </Typography>
  <Typography
    variant="body1"
    sx={{
      color: "gray",
    }}
  >
    please sign up
  </Typography>
</div>

          </div>
          

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            onKeyDown={handleKeyDown}
          />
           <input
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            onKeyDown={handleKeyDown}
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              style={{ paddingRight: "40px" }}
              onKeyDown={handleKeyDown}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <div className="remember-me-container" style={{ marginTop: "10px", width: "50%" }}>
            <label
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ marginRight: "8px" }}
              />
              Remember Me
            </label>
          </div>
          <button
            className="form-button"
            onClick={handleRegister}
            disabled={!email || !password || !loginType || isLoading}
            style={{
              cursor: email && password && loginType ? "pointer" : "not-allowed",
              color: "#fff"
            }}
          >
            {isLoading ? <div className="spinner"></div> : "Register"}
          </button>
         
          <p>
            Don't have an account?{" "}
            <Link className="styled-link" to="/">
              Login
            </Link>
          </p>
          <p>
            <Link className="styled-link" to="/forgetpassword">
              Forget Password
            </Link>
          </p>

        </div>
    </div>
  );
};

export default SignupPage;






