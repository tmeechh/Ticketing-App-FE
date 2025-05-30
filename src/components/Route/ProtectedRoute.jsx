

import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading, } = useAuthStore();

  if (isLoading) {// !hasHydrated || 
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const hasRole = (user?.roles || []).includes(requiredRole);

  if (requiredRole && !hasRole) {
    console.log("Role check failed");
    return <Navigate to="/" replace />;
  }

  return children;
};



export default ProtectedRoute;
