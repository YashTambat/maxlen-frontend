// {/* Protected Routes for Authenticated Pages */}
// <Route
// path="/dashboard"
// element={
//   <ProtectedRoute>
//     <Dashboard />
//   </ProtectedRoute>
// }
// />
// <Route
// exact path="/pibo"
// element={
//   <ProtectedRoute>
//     <Pibo />
//   </ProtectedRoute>
// }
// />
// <Route
// path="/setproductdeposit"
// element={
//   <ProtectedRoute>
//     <ProductDeposit />
//   </ProtectedRoute>
// }
// />
// <Route
// path="/product-details"
// element={
//   <ProtectedRoute>
//     <ModelGeneration />
//   </ProtectedRoute>
// }
// />
// <Route
// path="/generateQRcode"
// element={
//   <ProtectedRoute>
//     <GenerateQRcode />
//   </ProtectedRoute>
// }
// />

// <Route
// path="/generateQRcode/payment-success"
// element={
//   <ProtectedRoute>
//     <PaymentSuccess />
//   </ProtectedRoute>
// }
// />























// Forget password code  :

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons
// import "./HomePage.css"; // Add custom styles if needed
// import "bootstrap/dist/css/bootstrap.min.css";
// const ForgetPassword = () => {
//   const [loginId, setLoginId] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
//   const navigate = useNavigate();
 
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter" && loginId && password) {
//       handleLogin();
//     }
//   };

//   const handleLogin = async () => {
  
//   };

//   return (
//     <div className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative">
//      {/* Background Video */}
//      <video autoPlay muted loop className="background-video">
//         <source src="video.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     <div className="login-form">
//       <h3>Enter Your Email</h3>
//       <input
//         type="text"
//         placeholder="Email"
//         value={loginId}
//         onChange={(e) => setLoginId(e.target.value)}
//         className="form-input"
//         onKeyDown={handleKeyDown} // Trigger login on Enter key
//       />


//       <div style={{ position: "relative" }}>
//         <input
//           type={showPassword ? "text" : "password"} // Toggle between text and password
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="form-input"
//           style={{ paddingRight: "40px" }} // Space for eye icon
//           onKeyDown={handleKeyDown} // Trigger login on Enter key
//         />
//         <span
//           onClick={togglePasswordVisibility}
//           style={{
//             position: "absolute",
//             top: "50%",
//             right: "10px",
//             transform: "translateY(-50%)",
//             cursor: "pointer",
//           }}
//         >
//           {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//         </span>
//       </div>
    
//       <button
//         className="form-button"
//         onClick={handleLogin}
//         disabled={!loginId || !password} // Disable button if fields are empty
//       >
//        Send OTP
//       </button>
//         <br></br>
//       <Link  style={{color:"red"}} className="styled-link" to="/">
//         Back to Home
//       </Link>
     
//     </div>
//     </div>
//   );
// };

// export default ForgetPassword;






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
const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const [sendotp, setsendotp] = useState(false)
  const navigate = useNavigate();

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isLoading, setisloading] = useState(true);
  const { login } = useAuth(); // Access login function from context
  const [loginType, setLoginType] = useState(""); // For selecting login type
  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleOpenModal = () => setShowOTPModal(true);
  const handleCloseModal = () => setShowOTPModal(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/public/user/login`, {
        loginId,
        password,
      });
      console.log("response ?", response);
      console.log("response.data.accessToken ?", response.data.accessToken);
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      setisloading(false)
      console.log("response.data.message: ", response.data.message, response.data.hasError)
      if (response.data.message === "Please verify your email account to continue." && response.data.hasError) {
        try {
          // Hit the API to send the OTP
          const otpResponse = await axios.post(
            `${BASE_URL}/public/sendotp/sendotp?email=${loginId}`
          );
          console.log("OTP Response:", otpResponse);

          if (otpResponse.data.code === 2000 && otpResponse.data.hasError) {
            toast.error("Failed to send OTP: " + otpResponse.data.message, {
              position: "top-right",
              autoClose: 5000,
            });
          } else {
            console.log("Else block is exceuted ")
            toast.success("OTP sent successfully to your email.", {
              position: "top-right",
              autoClose: 5000,
            });
            setsendotp(true);
            setShowOTPModal(true); // Open the OTP modal
          }
        } catch (otpError) {
          console.error("Error while sending OTP:", otpError);
          toast.error("Error occurred while sending OTP. Please try again.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
        return; // Stop further execution as OTP flow is handled here
      } else{
        console.log(7987998);
      }
      if (response.data && response.data.view) {
        // Store the user data in localStorage
        localStorage.setItem("userData", JSON.stringify(response.data.view));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("response.data.message: ", response.data.message)
        // If "Remember Me" is checked, save loginId
        if (rememberMe) {
          localStorage.setItem("rememberedLoginId", loginId);
        } else {
          localStorage.removeItem("rememberedLoginId");
        }

        // Notify parent component or proceed to the dashboard
        login(response.data);
        toast.success(response.data.message)

        navigate("/dashboard");
        // window.location.reload()

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in. Please try again.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && loginId && password) {
      handleLogin();
    }
  };

  const handleLoginTypeChange = (e) => {
    const selectedType = e.target.value;
    setLoginType(selectedType);

    // Navigate for System Operator
    if (selectedType === "System Operator") {
      window.location.href = "https://endlos.asofta.net/user/login";
    } else {
      setShowLoginForm(true); // Show normal login form for other types
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <h2>Select Login Type</h2>

      
      <select
        value={loginType}
        onChange={handleLoginTypeChange}
        className="form-input"
      >
        <option value="" disabled>
          -- Select Login Type --
        </option>
        <option value="System Operator">System Operator</option>
        <option value="System Admin">System Admin</option>
        <option value="PIBO">PIBO</option>
        <option value="Client">Client</option>
      </select>

      {showLoginForm && (
        <div className="login-form">
          <h2>ENDLOS -DDRS</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
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
          <div className="remember-me-container" style={{ marginTop: "10px" }}>
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
            disabled={!loginId || !password}
          >
            Login
          </button>
          {sendotp && (
            <VerifyOTPModal
              email={loginId}
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
      )}
    </div>
  );
};

export default Login;










