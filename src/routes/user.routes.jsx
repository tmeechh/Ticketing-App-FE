import { lazy } from 'react';
import ProtectedRoute from '@/components/Route/ProtectedRoute';

const Profile = lazy(() => import('@/pages/Profile'));
const AccountSettings = lazy(() => import('@/pages/AccountSettings'));
const MyTickets = lazy(() => import('@/pages/MyTickets'));
const MyEvents = lazy(() => import('@/pages/OrganizerEvents'));

const userRoutes = [
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/account-settings',
    element: (
      <ProtectedRoute>
        <AccountSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-tickets',
    element: (
      <ProtectedRoute>
        <MyTickets />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-events',
    element: (
      <ProtectedRoute requiredRole="organizer">
        <MyEvents />
      </ProtectedRoute>
    ),
  },
];

export default userRoutes;