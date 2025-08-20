import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        padding: "20px"
      }}
    >
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted mb-4">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary px-4 rounded-pill shadow">
        ⬅ Back to Home
      </Link>
    </div>
  );
}
