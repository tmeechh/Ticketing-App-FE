import { lazy } from 'react';
import ProtectedRoute from '@/components/Route/ProtectedRoute';
import { Navigate } from "react-router-dom";

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const ManageUsers = lazy(() => import('@/pages/admin/ManageUsers'));
const ManageEvents = lazy(() => import('@/pages/admin/ManageEvents'));
const ManageTickets = lazy(() => import('@/pages/admin/ManageTickets'));

const adminRoutes = [
   {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute requiredRole="admin">
        <ManageUsers />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/events',
    element: (
      <ProtectedRoute requiredRole="admin">
        <ManageEvents />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/tickets',
    element: (
      <ProtectedRoute requiredRole="admin">
        <ManageTickets />
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
