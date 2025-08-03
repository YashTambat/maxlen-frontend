// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons
// // import "./HomePage.css"; // Add custom styles if needed
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
//         handlesubmitEmail();
//     }
//   };

//   const handlesubmitEmail = async () => {

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

//       <button
//         className="form-button"
//         onClick={handlesubmitEmail}
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
























import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ForgetPassword.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BASE_URL } from "../../config";
const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error sending OTP");
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative">
      <ToastContainer />
      {/* Background Video */}
      {/* <video autoPlay muted loop className="background-video">
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <div className="login-form" style={{position: "relative" ,top:"110px",backgroundColor:"lavender"}}>
        {step === 1 && (
          <>
            <h3>Enter Your Email</h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input"
            />
            <button
              className="form-button"
              onClick={handleSendOtp}
              disabled={!email}
            >
              Send OTP
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h3>Enter OTP & New Password</h3>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="form-input"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="form-input"
            />
            <button
              className="form-button"
              onClick={handleResetPassword}
              disabled={!otp || !newPassword}
            >
              Reset Password
            </button>
          </>
        )}
        <br />
        <Link style={{ color: "red" }} className="styled-link" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
