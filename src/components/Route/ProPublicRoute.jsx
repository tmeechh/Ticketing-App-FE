// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from '@/store/authStore';// adjust path to where your auth context/hook is

const ProPublicRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (user?.roles?.includes("admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProPublicRoute;
