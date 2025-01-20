import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  // Check if the user is authorized
  const token = localStorage.getItem("jwt"); // JWT is stored in localStorage after login

  return token ? (
    <Component {...props} /> // Render the protected component if authorized
  ) : (
    <Navigate to="/" replace /> // Redirect unauthorized users to the main page
  );
};

export default ProtectedRoute;
