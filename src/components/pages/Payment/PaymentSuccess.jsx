
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css"; // Custom CSS for additional styling
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { paymentId, orderId, totalDeposit } = location.state || {};

  if (!paymentId || !orderId || !totalDeposit) {
    return (
      <div className="container text-center d-flex align-items-center justify-content-center vh-100">
        <div>
          <h2 className="text-danger">Invalid Payment Data</h2>
          <button onClick={() => navigate("/")} className="btn btn-primary mt-3">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid payment-success-wrapper d-flex align-items-center justify-content-center vh-100">
      <div className="text-center p-4 bg-light rounded shadow-lg">
        {/* Animated Green Tick */}
        <div className="text-success mb-4">
          <FaCheckCircle size={100} className="animated-success-icon" />
        </div>
        <h1 className="text-success">Payment Successful!</h1>
        <p className="text-muted">Thank you for your payment.</p>
        <div className="payment-details text-start mt-4 p-3 border rounded bg-white">
          <h3 className="text-secondary">Payment Details:</h3>
          <p>
            <strong>Payment ID:</strong> {paymentId}
          </p>
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Total Deposit:</strong> ₹{totalDeposit}
          </p>
        </div>
        <button
          onClick={() => navigate("/generateQRcode")}
          className="btn btn-success mt-4 px-4"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

