import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader} from 'lucide-react';
import eventRoutes from './event.routes';
// import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import publicRoutes from './public.routes';
import adminRoutes from './admin.routes'; 

const NotFound = lazy(() => import('@/pages/NotFound'));

const Router = () => (
  <Suspense fallback={
    <div className="flex justify-center items-center py-20">
                     <Loader className="h-8 w-8 animate-spin text-primary" />
                   </div>
  }>
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      
    {adminRoutes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      
      {/* Event Routes */}
      {eventRoutes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      
      {/* User Routes */}
      {userRoutes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      
      {/* 404 Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default Router;