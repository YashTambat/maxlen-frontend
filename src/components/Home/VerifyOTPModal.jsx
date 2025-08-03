import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import "./HomePage.css"; // Add custom styles if needed

const VerifyOTPModal = ({ email, open, handleClose }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = pasteData.split("");
    setOtp((prev) => prev.map((_, idx) => newOtp[idx] || ""));
    const nextFocusIndex = newOtp.length < otp.length ? newOtp.length : otp.length - 1;
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleVerifyOTP = async () => {
    console.log("handleverifyOTP is calling")
    const otpValue = otp.join("");
    try {
      const response = await fetch(
        `${BASE_URL}/public/sendotp/verifyotp?email=${email}&otp=${otpValue}`,
        { method: "POST" }
      );
      const message = await response.json();
      console.log("check message in handleVerifyOTP ",message)
      if (message.messageText === "OTP verified successfully" && message.error===false ) {
        handleClose();
        navigate("/",{ replace: true });
      } else {
        setErrorMessage(message.messageText);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    setOtp(new Array(6).fill("")); // clear the previous
    try {
      const response = await fetch(
        `${BASE_URL}/public/sendotp/sendotp?email=${email}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      const message = await response.json();
      console.log("check message in handleResendOTP ",message)
      if (message.messageText === "OTP Sent Successfully" && message.error===false ) {
        setErrorMessage("");
        startResendTimer();
      } else {
        setErrorMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const startResendTimer = () => {
    setIsResendEnabled(false);
    setTimer(30);
  };

  useEffect(() => {
    if (timer > 0 && !isResendEnabled) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer === 0) {
      setIsResendEnabled(true);
    }
  }, [timer]);

  return (
    <Modal open={open} onClose={handleClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "95%", sm: "75%", md: "50%", lg: "30%" }, // Better small-screen fit
        maxWidth: "400px",
        
        bgcolor: "background.paper",
        boxShadow: 24,
        p: { xs: 2, sm: 3 },
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6" textAlign="center" gutterBottom sx={{ fontSize: { xs: "16px", sm: "18px" } }}>
        Verify OTP for {email}
      </Typography>
      
      <Grid container spacing={1.2} justifyContent="center">
        {otp.map((value, index) => (
          <Grid item xs={2} key={index}>
            <TextField
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onPaste={handlePaste}
              inputRef={(el) => (inputRefs.current[index] = el)}
              inputProps={{
                maxLength: 1,
                className: "otp-input",
              }}
            />
          </Grid>
        ))}
      </Grid>
  
      {errorMessage && (
        <Typography variant="body2" color="error" textAlign="center" mt={1}>
          {errorMessage}
        </Typography>
      )}
  
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleVerifyOTP}
        sx={{ mt: 2, py: { xs: 1, sm: 1.5 } }}
      >
        Verify OTP
      </Button>
      
      <Button
        variant="outlined"
        fullWidth
        onClick={handleResendOTP}
        sx={{ mt: 1.5, py: { xs: 1, sm: 1.5 } }}
        disabled={!isResendEnabled}
      >
        Resend OTP {timer > 0 && `(${timer}s)`}
      </Button>
    </Box>
  </Modal>
  
  );
};

export default VerifyOTPModal;
