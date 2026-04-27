import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const { isAuthenticated, isLoading, role, getDashboardPath } = useAuth();

  if (isLoading) {
    return (
      <div
        className="platform-card"
        role="status"
        aria-label="Checking access"
        style={{ margin: "36px auto", maxWidth: 840, padding: 24 }}
      >
        <div className="platform-skeleton" style={{ height: 28, width: "42%" }} />
        <div className="platform-skeleton" style={{ height: 18, width: "64%", marginTop: 16 }} />
        <div className="platform-skeleton" style={{ height: 18, width: "58%", marginTop: 10 }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const normalizedRole = String(role || "").toLowerCase();
  const normalizedAllowedRoles = (allowedRoles || []).map((entry) => String(entry).toLowerCase());

  if (normalizedAllowedRoles.length && !normalizedAllowedRoles.includes(normalizedRole)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return children || <Outlet />;
}