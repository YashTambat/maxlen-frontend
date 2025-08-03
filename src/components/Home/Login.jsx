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
const Login = () => {
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


 
  // Example: Login handler for your response structure
const handleLogin = async () => {
  setisloading(true);
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
    const { token, user, message } = response.data;

    // Save token and user
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userData", JSON.stringify(user));

    // Update context
    login({ user, token });

    toast.success(message);
    navigate("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.response?.data?.message || "Error logging in. Please try again.");
  } finally {
    setisloading(false);
  }
};
  console.log("check logintype", loginType)
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && email && password) {
      handleLogin();
    }

  };

  // const handleLoginTypeChange = (e) => {
  //   const selectedType = e.target.value;
  //   setLoginType(selectedType);

  //   // Navigate for System Operator
  //   if (selectedType === "System Operator") {
  //     window.location.href = "https://endlos.asofta.net/user/login";

  //     // Reset the dropdown value to "Pibo" after navigation
  //     setTimeout(() => {
  //       setLoginType("Pibo");
  //     }, 0); // Reset immediately after navigation

  //   } else {
  //     // setShowLoginForm(true); // Show normal login form for other types
  //   }
  // };
  console.log("check login Type :", loginType)
  return (
    <div className="login-page" >
      <ToastContainer />
        <div className="login-form" style={{backgroundColor:"lavender"}}>
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
            <Typography
  variant="h4"
  sx={{
    fontWeight: "bold",
    color: "#1976d2",
    mb: 2,
  }}
>
  Maxlence
  <Typography
    component="span"
    variant="body1"
    sx={{
      display: "block",
      fontWeight: "normal",
      color: "gray",
      fontSize: "1rem",
      mt: 0.5,
    }}
  >
    please login
  </Typography>
</Typography>



            
          </div>
        

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleLogin}
            disabled={!email || !password || !loginType || isLoading}
            style={{
              cursor: email && password && loginType ? "pointer" : "not-allowed",
              color: "#fff"
            }}
          >
            {isLoading ? <div className="spinner"></div> : "Sign In"}
          </button>
          {sendotp && (
            <VerifyOTPModal
              email={email}
              open={showOTPModal}
              handleClose={handleCloseModal}
            />
          )}
          <p>
            Don't have an account?{" "}
            <Link className="styled-link" to="/signup">
              Signup
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

export default Login;






