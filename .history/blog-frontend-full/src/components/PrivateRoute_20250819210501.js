// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
