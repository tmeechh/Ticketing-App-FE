

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading, } = useAuthStore();
  const location = useLocation();

  if (isLoading) {// !hasHydrated || 
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

    if (user?.roles?.includes("admin") && location.pathname === "/") {
    return <Navigate to="/admin/dashboard" replace />;
  }


  // const hasRole = (user?.roles || []).includes(requiredRole);
  const hasRole =
  (user?.roles || []).includes(requiredRole) ||
  (requiredRole === "admin" && user?.roles?.includes("admin"));


  if (requiredRole && !hasRole) {
    console.log("Role check failed");
    return <Navigate to="/" replace />;
  }

  return children;
};



export default ProtectedRoute;
