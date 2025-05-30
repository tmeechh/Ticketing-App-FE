
import { lazy, React} from 'react';
import ProtectedRoute from '@/components/Route/ProtectedRoute';

const Events = lazy(() => import('@/pages/Events'));
const EventDetail = lazy(() => import('@/pages/EventDetail'));
const CreateEvent = lazy(() => import('@/pages/CreateEvent'));
const UpdateEvent = lazy(() => import('@/pages/UpdateEvent'));
const Checkout = lazy(() => import('@/pages/Checkout'));

const eventRoutes = [
  {
    path: '/events',
    element: <Events />,
  },
  {
    path: '/events/:id',
    element: <EventDetail />,
  },
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create-event',
    element: (
      <ProtectedRoute requiredRole="organizer">
        <CreateEvent />
      </ProtectedRoute>
    ),
  },
  {
    path: '/update-event/:id',
    element: (
      <ProtectedRoute requiredRole="organizer">
        <UpdateEvent />
      </ProtectedRoute>
    ),
  },
];

export default eventRoutes;