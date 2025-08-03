// src/App.js
import React, { useEffect, useState } from "react";
import HomePage from "./components/Home/HomePage.jsx";
import SignupPage from "./components/Home/SignupPage.jsx";
import ForgetPassword from "./components/Home/ForgetPassword.jsx";
import ViewPayment from "./components/pages/GenerateQRcode/ViewPayment.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ModelGeneration from "./components/pages/ModelGeneration/ModelGeneration.jsx";
import GenerateQRcode from "./components/pages/GenerateQRcode/GenerateQRCode.jsx";
import { AuthProvider } from "./context/AuthContext.js";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";
import RestrictedRoute from "./components/Routes/RestrictedRoute.jsx";
import Pibo from "./components/pages/Pibo/Pibo.jsx";
import Dashboard from "./components/pages/Dashboard/Dashboard.jsx";
import PaymentSuccess from "./components/pages/Payment/PaymentSuccess.jsx";
import QrCodeScanner from "./components/qrcode/QRCodeScannerResult.jsx"
import ProductDeposit from "./components/pages/ProductDeposit/ProductDeposit.jsx";
import { useAuth } from "./context/AuthContext.js";
import Profile from "./components/pages/Profile.jsx";
import GenerateQRCode from "./components/Home/Machine.jsx"
import MachineQr from "./components/Home/Machine.jsx"
function App() {
  // const { isLoggedIn, roleName ,user} = useAuth();
  // const [isAuthReady,setIsAuthReady] = useState(false);
  
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("userData");//check if auth initialization is complete
  //   if (!storedUser || user !== null) {                 //no user in localStorage ,consider auth ready
  //     setIsAuthReady(true);
  //   }
  // }, [user]);

  // if(!isAuthReady)
  // {
  //   console.log("check roleName:", roleName);
  //   return <div>loading....</div> 
  // }
  





  const { isLoggedIn, user } = useAuth();
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    setIsAuthReady(!!storedUser || user !== null);
  }, [user]);

  // if (!isAuthReady) return <div>loading....</div>;

  const roleName = user?.role || "client";
  return (
    // <AuthProvider>
    <Router>
      <Routes>
        {["/signup", "/forgetpassword", "/"].map((path, index) => (
          <Route
            key={index}
            path={path}
            element={
              <RestrictedRoute>
                {path === "/signup" && <SignupPage />}
                {path === "/forgetpassword" && <ForgetPassword />}
                {path === "/" && <HomePage />}
              </RestrictedRoute>
            }
          />
        ))}

        {isLoggedIn && roleName==="admin"&&(
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-details" element={<ModelGeneration />} />
            <Route exact path="/all-user" element={<Pibo />} />
            <Route path="/setproductdeposit" element={<ProductDeposit />} />
          </>
        )}

        {isLoggedIn && roleName === "client" && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-details" element={<ModelGeneration />} />
            <Route exact path="/generateQRcode" element={<GenerateQRcode />} />
            <Route
              path="/generateQRcode/payment-success"
              element={<PaymentSuccess />}
            />
            <Route path="/generateQRcode/:id" element={<ViewPayment />} />
            <Route path="/profile/:userid" element={<Profile />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/p" element={<QrCodeScanner />} />
        <Route path="/machine" element={<MachineQr />} />

        {/* <Route path="*" element={<Navigate to={window.location.pathname || "/"} />} /> */}
      </Routes>
    </Router>
    // </AuthProvider>
  );
}

export default App;