// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const ProtectedRoute = ({  isLoggedIn,children }) => {
//   if (!isLoggedIn) {
//     return <Navigate to="/"  />;
//   }
  
//   return children;
// };

// export default ProtectedRoute;







import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect unauthorized users to home
    return <Navigate to="/" />;
  }

  // Render the protected route for logged-in users
  return children;
};

export default ProtectedRoute;

