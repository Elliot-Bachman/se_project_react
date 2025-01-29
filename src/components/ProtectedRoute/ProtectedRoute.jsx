import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isLoggedIn, ...props }) => {
  return isLoggedIn ? (
    <Component {...props} /> // Render the protected component if authorized
  ) : (
    <Navigate to="/" replace /> // Redirect unauthorized users to the main page
  );
};

export default ProtectedRoute;
