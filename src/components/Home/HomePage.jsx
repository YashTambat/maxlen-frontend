import React from "react";
import Login from "./Login";
import "./HomePage.css"; // Add custom styles if needed
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = ({ onLogin }) => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative">
      {/* Background Video */}
      {/* <video autoPlay muted loop className="background-video">
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      {/* Login Component */}
      <div className="content">
        <Login onLogin={onLogin} />
      </div>
    </div>
  );
};

export default HomePage;
