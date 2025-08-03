import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LoadingBackdrop from "../common/LoadingBackdrop";
import {
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Button,
    TextField,
    Stack,
    Grid,
    IconButton,
    InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        applicationType: "",
        companyLegalName: "",
        companyTradeName: "",
        typeOfBusiness: "",
        typeOfCompany: "",
        businessDescription: "",
        state: "",
        registrationAddress: "",
        district: "",
        pinCode: "",
        cin: "",

        // New fields for Company PAN
        companyPan: "",
        companyPanLegalName: "",
        companyPanLegalFatherName: "",
        dateOfIncorporation: "",

        // New fields for Authorised Person
        personName: "",
        personDesignation: "",
        personMobileNum: "",
        personReservedNumber: "",

        // New fields for Authorised Person PAN
        personPan: "",
        personPanName: "",
        personPanFatherName: "",
        personPanDateOfBirth: "",

        // New fields for Other details
        gst: "",                     // For GST
        tan: "",                     // For TAN
        licenseNo: "",              // For License No
        otherInformation: "",        // For Other Information
        // New fields for Login Details
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        mobile: ""
    });
    const [states, setStates] = useState([]); // State to hold API response for states
    const [formErrors, setFormErrors] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]); // For files selected for upload
    const [uploadedFilesData, setUploadedFilesData] = useState([]); // For files already uploaded
    const [isLoading, setisloading] = useState(true);    // should be  true , for developing make it false 
    const navigate = useNavigate();
    const { userid } = useParams();
    // Fetch states from API on component mount
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/public/state?countryId=96`
                );
                const data = await response.json();
                if (data && !data.hasError && Array.isArray(data.list)) {
                    setStates(data.list); // Update states with API response
                }
            } catch (error) {
                // Display error toast with a red theme
                toast.error(error || "Something went wrong!", {
                    position: "top-right",
                    autoClose: 5000,
                    closeButton: true,
                });
            }
        };
        fetchStates();
        handleEdit(userid);
    }, []);

    const [showcin, setShowcin] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        validateField(name, value);
    };
    const validationRules = {
        applicationType: {
            required: true,
            maxLength: 100,
            message: "Application Type is mandatory and should not exceed 100 characters.",
        },
        companyLegalName: {
            required: true,
            maxLength: 100,
            message: "Company Legal Name is mandatory and should not exceed 100 characters.",
        },
        companyTradeName: {
            required: true,
            maxLength: 100,
            message: "Company Trade Name is mandatory and should not exceed 100 characters.",
        },
        typeOfBusiness: {
            required: true,
            maxLength: 50,
            message: "Type of Business is mandatory and should not exceed 50 characters.",
        },
        typeOfCompany: {
            required: true,
            maxLength: 100,
            message: "Type of Company is mandatory and should not exceed 100 characters.",
        },
        businessDescription: {
            required: true,
            maxLength: 255,
            message: "Business Description is mandatory and should not exceed 255 characters.",
        },
        state: {
            required: true,
            maxLength: 255,
            message: "State is mandatory and should not exceed 255 characters.",
        },
        registrationAddress: {
            required: true,
            maxLength: 255,
            message: "Registration Address is mandatory and should not exceed 255 characters.",
        },
        // District
        district: {
            required: true,
            maxLength: 255,
            message: "District is mandatory and should not exceed 255 characters.",
        },
        // Pincode
        pinCode: {
            required: true,
            maxLength: 10,
            message: "Pincode is mandatory and should not exceed 10 characters.",
        },
        // CIN (Optional)
        cin: {
            maxLength: 255,
            message: "CIN should not exceed 255 characters.",
        },
        // Company PAN
        companyPan: {
            required: true,
            regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            message: "Company PAN is mandatory and should be in a valid format (e.g., ABCDE1234F).",
        },
        // Company PAN Legal Name
        companyPanLegalName: {
            required: true,
            maxLength: 100,
            message: "Company PAN Legal Name is mandatory and should not exceed 100 characters.",
        },
        // Company PAN Father Name (Optional)
        companyPanLegalFatherName: {
            maxLength: 100,
            message: "Company PAN Father Name should not exceed 100 characters.",
        },
        // Date of Incorporation
        dateOfIncorporation: {
            required: true,
            message: "Date of Incorporation is mandatory.",
        },
        // Authorized Person Name
        personName: {
            required: true,
            maxLength: 100,
            message: "Authorized Person Legal Name is mandatory and should not exceed 100 characters.",
        },
        // Authorized Person Designation
        personDesignation: {
            required: true,
            maxLength: 100,
            message: "Authorized Person Designation is mandatory and should not exceed 100 characters.",
        },
        // Authorized Person Mobile Number
        personMobileNum: {
            required: true,
            maxLength: 15,
            message: "Authorized Person Mobile Number is mandatory and should not exceed 15 characters.",
        },
        // Authorized Person PAN
        personPan: {
            required: true,
            regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            message: "Authorized Person PAN is mandatory and should be in a valid format (e.g., ABCDE1234F).",
        },
        // Authorized Person PAN Name
        personPanName: {
            required: true,
            maxLength: 100,
            message: "Authorized Person PAN Legal Name is mandatory and should not exceed 100 characters.",
        },
        // Authorized Person PAN Father Name (Optional)
        personPanFatherName: {
            maxLength: 100,
            message: "Authorized Person PAN Father Name should not exceed 100 characters.",
        },
        // Date of Birth
        personPanDateOfBirth: {
            required: true,
            message: "Date of Birth is mandatory.",
        },
        // GST
        gst: {
            required: true,
            regex: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
            message: "GST number is mandatory and should be in a valid format.",
        },
        // TAN
        tan: {
            required: true,
            regex: /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/,
            message: "Tan is mandatory and should be in a valid formatbe like ABCD12345E",
        },
        // License Number
        licenseNo: {
            required: true,
            maxLength: 20,
            message: "License Number is mandatory and should not exceed 20 characters.",
        },
        // Other Information (Optional)
        otherInformation: {
            maxLength: 255,
            message: "Other Information should not exceed 255 characters.",
        },
        password: {
            required: true,
            maxLength: 100,
            pattern: null, // Add a regex if necessary
        },
        confirmpassword: {
            required: true,
            customValidation: (value, formData) =>
                value === formData.password ? null : "Passwords do not match",
        }

    };
    const validateField = (name, value) => {
        const rule = validationRules[name];
        if (!rule) return; // Skip validation if no rules for the field
        let error = "";
        const trimmedValue = (value || "").trim();
        if (rule.required && !trimmedValue) {
            error = rule.message?.split("and")[0]?.trim() || "This field is required.";
        } else if (rule.maxLength && value.length > rule.maxLength) {
            error = rule.message || `This field should not exceed ${rule.maxLength} characters.`;
        } else if (rule.regex && !new RegExp(rule.regex).test(value)) {
            error = rule.message || "Invalid format.";
        } else if (rule.customValidation) {
            const customError = rule.customValidation(value, formData); // Pass `formData` for dependent validations
            if (customError) {
                error = customError;
            }
        }

        setFormErrors((prev) => ({ ...prev, [name]: error }));
    };
    // const validateForm = () => {
    //     let isValid = true;
    //     Object.keys(validationRules).forEach((field) => {
    //         validateField(field, formData[field]);
    //         if (formErrors[field]) isValid = false;
    //     });
    //     return isValid;
    // };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prev) => [...prev, ...files]);
    };
    const handleFileRemove = (index) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFileUpload = async () => {

        const headers = getAuthHeaders();
        if (!headers) {
            // alert("Authentication tokens are missing.");
            // Display error toast with a red theme
            toast.error(
                "Authentication failed. Please log in again." ||
                "Something went wrong!",
                {
                    position: "top-right",
                    autoClose: 5000,
                    closeButton: true,
                }
            );

            return;
        }

        try {
            const uploadedFiles = [];
            const headers = getAuthHeaders(); // Authentication headers
            delete headers["Content-Type"]; // Remove Content-Type as FormData handles it automatically

            for (const file of selectedFiles) {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch(
                    `${BASE_URL}/private/file/upload-profile-pic`,
                    {
                        method: "POST",
                        headers,
                        body: formData,
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    uploadedFiles.push({
                        fileId: result.view.fileId,
                        originalName: result.view.originalName,
                    });
                } else {
                    // alert(`Failed to upload file: ${file.name}`);
                    // Display error toast with a red theme
                    toast.error(
                        `Failed to upload file: ${file.name} ` || "Something went wrong!",
                        {
                            position: "top-right",
                            autoClose: 5000,
                            closeButton: true,
                        }
                    );

                    const errorResponse = await response.json();
                    // Display error toast with a red theme
                    toast.error(
                        `Error uploading file: ${errorResponse.message}` ||
                        "Something went wrong!",
                        {
                            position: "top-right",
                            autoClose: 5000,
                            closeButton: true,
                        }
                    );

                    // alert(`Error uploading file: ${errorResponse.message}`);
                }
            }

            setUploadedFilesData((prev) => [...prev, ...uploadedFiles]);
            setSelectedFiles([]); // Clear the selected files
            // alert("Files uploaded successfully!");
            // Success toast with a green theme
            toast.success("Files Uploaded Successfully", {
                position: "top-right",
                autoClose: 5000,
                closeButton: true,
            });
        } catch (error) {
            console.error("Error uploading files:", error);
            // alert("An error occurred while uploading files.");
            // Display error toast with a red theme
            toast.error("Error uploading files:", error || "Something went wrong!", {
                position: "top-right",
                autoClose: 5000,
                closeButton: true,
            });
        }
    };

    const fetchFileImage = async (fileId, event) => {
        console.log("hii", fileId)
        const headers = getAuthHeaders(); // Retrieve authentication headers
        if (!headers) {
            console.error("Authentication tokens are missing.");
            return;
        }

        try {
            console.log("check  yash header: ", fileId)

            const response = await fetch(
                `${BASE_URL}/public/file/download-image?fileId=${fileId}`,
                {
                    headers
                }
            );
            console.log("check response here ", response)
            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                event.target.src = imageUrl; // Update the image source dynamically
            } else {
                console.error("Failed to fetch the image.");
            }
        } catch (error) {
            console.error("Error fetching the image:", error);
        }
    };

    const handleUploadedFileRemove = (fileId) => {
        setUploadedFilesData((prev) =>
            prev.filter((file) => file.fileId !== fileId)
        );
        setSelectedFiles([])
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("check record id to edit:", formData.id);
        const uploadedFiles = uploadedFilesData[0]
        console.log("check uploaded Files ?", uploadedFiles)
        const dataToSubmit = {
            id: formData.id || null, // Ensure the `id` is included
            applicationType: formData.applicationType,
            companyLegalName: formData.companyLegalName,
            companyTradeName: formData.companyTradeName,
            typeOfBusiness: formData.typeOfBusiness,
            typeOfCompany: formData.typeOfCompany,
            businessDescription: formData.businessDescription,
            state: formData.state,
            registrationAddress: formData.registrationAddress,
            district: formData.district,
            pinCode: formData.pinCode,
            cin: formData.cin,
            companyPan: formData.companyPan,
            companyPanLegalName: formData.companyPanLegalName,
            companyPanLegalFatherName: formData.companyPanLegalFatherName,
            dateOfIncorporation: formData.dateOfIncorporation,
            personName: formData.personName,
            personDesignation: formData.personDesignation,
            personMobileNum: formData.personMobileNum,
            personReservedNumber: formData.personReservedNumber,
            personPan: formData.personPan,
            personPanName: formData.personPanName,
            personPanFatherName: formData.personPanFatherName,
            personPanDateOfBirth: formData.personPanDateOfBirth,
            gst: formData.gst,
            tan: formData.tan,
            licenseNo: formData.licenseNo,
            otherInformation: formData.otherInformation,
            userView: formData.userView || null, // Adjust for nullable userView
            fileModel: {
                fileId: uploadedFiles?.fileId
            },
        };

        const headers = getAuthHeaders();
        // clear all data when form submited
        try {
            const response = await fetch(`${BASE_URL}/private/pibo/update`, {
                method: "PUT",
                headers,
                body: JSON.stringify(dataToSubmit), // Convert the object to a JSON string
            });

            if (response.hasError) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred during submission.");
            }

            const result = await response.json();
            console.log("Submission successful:", result);
            toast.success(result.message || "Update successfully!", {
                position: "top-right",
                autoClose: 5000,
                closeButton: true,
            });
        
            // Clear all data when form submitted

          
           

        } catch (error) {
            console.error("Submission failed:", error);
            alert(`${error.message}`); // Show error message to user
            toast.error(`${error.message}` || "An error occurred.", {
                position: "top-right",
                autoClose: 5000,
                closeButton: true,
            });
        }


    };

    const handleEdit = async (userid) => {
        const headers = getAuthHeaders();
        try {
            // Fetch data from the API
            setisloading(true)
            const response = await fetch(
                `${BASE_URL}/private/pibo/view/${userid}`,
                {
                    method: "GET",
                    headers,
                }
            );
            console.log("check response while edit : ", response)
            setisloading(false)
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const data = await response.json();

            // Set form fields with the data from the API
            setFormData({
                id: data.view.id || userid, // Include the ID for update API

                // Fields from the second handleEdit
                applicationType: data.view.applicationType || "",
                companyLegalName: data.view.companyLegalName || "",
                companyTradeName: data.view.companyTradeName || "",
                typeOfBusiness: data.view.typeOfBusiness || "",
                typeOfCompany: data.view.typeOfCompany || "",
                businessDescription: data.view.businessDescription || "",
                state: data.view.state || "",
                registrationAddress: data.view.registrationAddress || "",
                district: data.view.district || "",
                pinCode: data.view.pinCode || "",
                cin: data.view.cin || "",

                companyPan: data.view.companyPan || "",
                companyPanLegalName: data.view.companyPanLegalName || "",
                companyPanLegalFatherName: data.view.companyPanLegalFatherName || "",
                dateOfIncorporation: data.view.dateOfIncorporation || "",

                personName: data.view.personName || "",
                personDesignation: data.view.personDesignation || "",
                personMobileNum: data.view.personMobileNum || "",
                // personReservedNumber: data.view.item.personReservedNumber || "",

                personPan: data.view.personPan || "",
                personPanName: data.view.personPanName || "",
                personPanFatherName: data.view.personPanFatherName || "",
                personPanDateOfBirth: data.view.personPanDateOfBirth || "",

                gst: data.view.gst || "",
                tan: data.view.tan || "",
                licenseNo: data.view.licenseNo || "",
                otherInformation: data.view.otherInformation || "",
            });

            setUploadedFilesData(
                data.view.fileModel // Handle a single fileModel object
                    ? [
                        {
                            fileId: data.view.fileModel.fileId || "", // Ensure `fileId` is present
                            originalName: data.view.fileModel.originalName || "Unknown", // Fallback for originalName
                        },
                    ]
                    : [] // Fallback to an empty array if no fileModel exists
            );
        } catch (error) {
            console.error("Error in handleEdit:", error.message);
            setTimeout(() => navigate("/dashboard"), 100);            
        }
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
            <Box sx={{ display: "flex" }}>
                <Box component="main"
                    sx={{
                        flexGrow: 1, p: 3, marginTop: "-3%"
                    }}>
                    <br></br>

                    <Box height={5} />
                    {(
                        isLoading ? (
                            <LoadingBackdrop isOpen={isLoading} />
                        ) : (
                            (<form onSubmit={handleSubmit} style={{
                                marginTop: "20px", paddingLeft: "30px",
                                paddingRight: "30px", backgroundColor: "white"
                            }}>
                              
                                <Typography variant="subtitle1"  color="textSecondary" gutterBottom sx={{ color: "red" }}>
                                    Starred (*) fields are mandatory
                                </Typography>
                                <Grid container spacing={3}>
                                    {/* Applicant Type */}
                                    <Grid item xs={6}>
                                        <Typography className="typography-subtitle" variant="h6">Applicant Type</Typography>
                                        <br></br>
                                        <FormControl fullWidth>
                                            <InputLabel id="applicant-type-label">Select Applicant Type *</InputLabel>
                                            <Select
                                                labelId="applicant-type-label"
                                                id="applicant-type-select"
                                                name="applicationType"
                                                value={formData.applicationType}
                                                onChange={handleInputChange}
                                                required
                                                label="Select Applicant Type *"
                                            >
                                                <MenuItem value="Brand Owner">Brand Owner</MenuItem>
                                                <MenuItem value="Producer">Producer</MenuItem>
                                                <MenuItem value="Importer">Importer</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Entity Details */}
                                    <Grid item xs={12}>
                                        <Typography className="typography-subtitle" variant="h6">Entity Details</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Legal Name *"
                                            name="companyLegalName"
                                            value={formData.companyLegalName}
                                            onChange={handleInputChange}
                                            error={!!formErrors.companyLegalName}
                                            helperText={formErrors.companyLegalName}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Trade Name *"
                                            name="companyTradeName"
                                            value={formData.companyTradeName}
                                            onChange={handleInputChange}
                                            error={!!formErrors.companyTradeName}
                                            helperText={formErrors.companyTradeName}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="type-of-business-label">Type of Business *</InputLabel>
                                            <Select
                                                labelId="type-of-business-label"
                                                id="type-of-business-select"
                                                name="typeOfBusiness"
                                                value={formData.typeOfBusiness}
                                                onChange={handleInputChange}
                                                error={!!formErrors.typeOfBusiness}
                                                helperText={formErrors.typeOfBusiness}
                                                required
                                                label="select business type"
                                            >
                                                <MenuItem value="Public Ltd">Public Ltd</MenuItem>
                                                <MenuItem value="Private Ltd">Private Ltd</MenuItem>
                                                <MenuItem value="PSU">Public Sector Undertaking (PSU)</MenuItem>
                                                <MenuItem value="Partnership/Proprietorship">Partnership/Proprietorship</MenuItem>
                                                <MenuItem value="Club/Society/Trust/AOP">Club/Society/Trust/AOP</MenuItem>
                                                <MenuItem value="LLP">Limited Liability Partnership</MenuItem>
                                                <MenuItem value="Others">Others</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Type of Company *</InputLabel>
                                            <Select
                                                name="typeOfCompany"
                                                value={formData.typeOfCompany}
                                                onChange={handleInputChange}
                                                required
                                                error={!!formErrors.typeOfCompany}
                                                helperText={formErrors.typeOfCompany}
                                                label="type of company"
                                            >
                                                <MenuItem value="Micro">Micro</MenuItem>
                                                <MenuItem value="Small">Small</MenuItem>
                                                <MenuItem value="Medium">Medium</MenuItem>
                                                <MenuItem value="Large">Large</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Company Description"
                                            name="businessDescription"
                                            value={formData.businessDescription}
                                            onChange={handleInputChange}
                                            multiline
                                            rows={3}
                                            error={!!formErrors.businessDescription}
                                            helperText={formErrors.businessDescription}
                                            required
                                        />
                                    </Grid>


                                    {/* File Upload Section */}
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" color="green">Upload Files single file only (optional):</Typography>
                                        <input
                                            type="file"
                                            onChange={handleFileSelect}
                                            style={{ marginBottom: "10px" }}
                                            disabled={uploadedFilesData.length === 1 || selectedFiles.length === 1}
                                        />
                                        {selectedFiles.map((file, index) => (
                                            <Box
                                                key={index}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                marginBottom="10px"
                                            >
                                                <Typography variant="body2">{file.name}</Typography>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => handleFileRemove(index)}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        ))}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleFileUpload}
                                            disabled={selectedFiles.length === 0}
                                        >
                                            Upload Files
                                        </Button>
                                    </Grid>

                                    {/* Preview Previously Uploaded Files */}
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" >Previously Uploaded Files:</Typography>
                                        <Grid container spacing={2}>
                                            {uploadedFilesData.map((file, index) => (
                                                <Grid item xs={6} sm={3} key={index}>
                                                    <img
                                                        src={`${BASE_URL}/public/file/download-image?fileId=${file.fileId}`}
                                                        alt={file.originalName}
                                                        style={{
                                                            width: "50%",
                                                            height: "100px",
                                                            objectFit: "contain",
                                                            borderRadius: "8px",
                                                        }}
                                                        onError={(e) => fetchFileImage(file.fileId, e)}
                                                    />
                                                    <Typography variant="body2">{file.originalName}</Typography>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => handleUploadedFileRemove(file.fileId)}
                                                        style={{ marginTop: "5px" }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>State/UT *</InputLabel>
                                            <Select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                label="state/UT"
                                            >
                                                {states.map((state) => (
                                                    <MenuItem key={state.key} value={state.value}>
                                                        {state.value}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Registered Address *"
                                            name="registrationAddress"
                                            value={formData.registrationAddress}
                                            onChange={handleInputChange}
                                            error={!!formErrors.registrationAddress}
                                            helperText={formErrors.registrationAddress}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="District *"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            error={!!formErrors.district}
                                            helperText={formErrors.district}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="pinCode *"
                                            name="pinCode"
                                            value={formData.pinCode}
                                            error={!!formErrors.pinCode}
                                            helperText={formErrors.pinCode}
                                            onChange={handleInputChange}
                                            type="number"
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="cin"
                                            name="cin"
                                            type={showcin ? "text" : "password"}
                                            value={formData.cin}
                                            onChange={handleInputChange}
                                            error={!!formErrors.cin}
                                            helperText={formErrors.cin}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowcin(!showcin)}>
                                                            {showcin ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    {/*Company Pan */}
                                    <Grid item xs={12}>
                                        <Typography className="typography-subtitle" variant="h6">Company PAN</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="PAN"
                                            name="companyPan"
                                            type={showcin ? "text" : "password"}
                                            value={formData.companyPan}
                                            error={!!formErrors.companyPan}
                                            helperText={formErrors.companyPan}
                                            onChange={handleInputChange}
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowcin(!showcin)}>
                                                            {showcin ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            name="companyPanLegalName"
                                            value={formData.companyPanLegalName}
                                            error={!!formErrors.companyLegalName}
                                            helperText={formErrors.companyLegalName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Father's Name"
                                            name="companyPanLegalFatherName"
                                            value={formData.companyPanLegalFatherName}
                                            error={!!formErrors.companyPanLegalFatherName}
                                            helperText={formErrors.companyPanLegalFatherName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Date of Incorporation"
                                            name="dateOfIncorporation"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            value={formData.dateOfIncorporation}
                                            onChange={handleInputChange}
                                            error={!!formErrors.dateOfIncorporation}
                                            helperText={formErrors.dateOfIncorporation}
                                            required
                                        />
                                    </Grid>

                                    {/* Other Info */}
                                    <Grid item xs={12}>
                                        <Typography className="typography-subtitle" variant="h6">Other Information</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="GST"
                                            name="gst"
                                            value={formData.gst}
                                            error={!!formErrors.gst}
                                            helperText={formErrors.gst}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="TAN"
                                            name="tan"
                                            value={formData.tan}
                                            error={!!formErrors.tan}
                                            helperText={formErrors.tan}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="License No"
                                            name="licenseNo"
                                            value={formData.licenseNo}
                                            error={!!formErrors.licenseNo}
                                            helperText={formErrors.licenseNo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Other Information"
                                            name="otherInformation"
                                            value={formData.otherInformation}
                                            onChange={handleInputChange}
                                            error={!!formErrors.otherInformation}
                                            helperText={formErrors.otherInformation}
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>

                                    {/* Authorized Person */}
                                    <Grid item xs={12}>
                                        <Typography className="typography-subtitle" variant="h6">Authorised Person</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            name="personName"
                                            value={formData.personName}
                                            onChange={handleInputChange}
                                            error={!!formErrors.personName}
                                            helperText={formErrors.personName}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Designation"
                                            name="personDesignation"
                                            value={formData.personDesignation}
                                            error={!!formErrors.personDesignation}
                                            helperText={formErrors.personDesignation}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Mobile Number"
                                            name="personMobileNum"
                                            type={showcin ? "number" : "password"}
                                            value={formData.personMobileNum}
                                            error={!!formErrors.personMobileNum}
                                            helperText={formErrors.personMobileNum}
                                            onChange={handleInputChange}
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowcin(!showcin)}>
                                                            {showcin ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Reserved Number"
                                            name="personReservedNumber"
                                            value={formData.personReservedNumber}
                                            onChange={handleInputChange}

                                        />
                                    </Grid>


                                    {/* Authorized Person Pan */}
                                    <Grid item xs={12}>
                                        <Typography className="typography-subtitle" variant="h6">Authorised Person PAN</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="PAN"
                                            name="personPan"
                                            type={showcin ? "text" : "password"}
                                            value={formData.personPan}
                                            error={!!formErrors.personPan}
                                            helperText={formErrors.personPan}
                                            onChange={handleInputChange}
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowcin(!showcin)}>
                                                            {showcin ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            name="personPanName"
                                            value={formData.personPanName}
                                            error={!!formErrors.personPanName}
                                            helperText={formErrors.personPanName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Father's Name"
                                            name="personPanFatherName"
                                            value={formData.personPanFatherName}
                                            error={!!formErrors.personPanFatherName}
                                            helperText={formErrors.personPanFatherName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Date of Birth"
                                            name="personPanDateOfBirth"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            value={formData.personPanDateOfBirth}
                                            error={!!formErrors.personPanDateOfBirth}
                                            helperText={formErrors.personPanDateOfBirth}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </Grid>


                                    {/* Submit Button */}
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" type="submit" style={{ width: "100px", backgroundColor: "#2d4ef5" }} fullWidth>
                                            {/* Register */}
                                            {formData.id ? "Update" : "Register"}
                                        </Button>
                                    </Grid>
                                    {/* Cancle Button*/}
                                    <Grid item xs={12}>
                                        <Button onClick={() => {
                                            navigate(-1)

                                        }} variant="contained" sx={{ backgroundColor: 'red' }} color="primary"  style={{ width: "100px" }} fullWidth>
                                            Cancle
                                        </Button>
                                    </Grid>

                                </Grid>

                            </form>
                            )
                        )
                    )}
                </Box>
            </Box>
        </>
    );
};

export default ProfileForm;
