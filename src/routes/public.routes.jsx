import { lazy } from 'react';
import ProPublicRoute from '@/components/Route/ProPublicRoute';

const Index = lazy(() => import('@/pages/Index'));
const Terms = lazy(() => import('@/pages/Terms'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const ContactUs = lazy(() => import('@/pages/ContactUs'));
const Faq = lazy(() => import('@/pages/Faq'));
const About = lazy(() => import('@/pages/About'));

const publicRoutes = [
  {
    path: '/',
    // element: <Index />,
    element: (
      <ProPublicRoute>
        <Index />
      </ProPublicRoute>
    ),
  },
  {
    path: '/terms',
    // element: <Terms />,
    element: (
      <ProPublicRoute>
        <Terms />
      </ProPublicRoute>
    ),
  },
  {
    path: '/privacy',
    // element: <Privacy />,
    element: (
      <ProPublicRoute>
        <Privacy />
      </ProPublicRoute>
    ),
  },
  {
    path: '/contact',
    // element: <ContactUs />,
    element: (
      <ProPublicRoute>
        <ContactUs />
      </ProPublicRoute>
    ),
  },
  {
    path: '/faq',
    // element: <Faq />,
     element: (
      <ProPublicRoute>
        <Faq />
      </ProPublicRoute>
    ),
  },
  {
    path: '/about',
    // element: <About />,
        element: (
      <ProPublicRoute>
        <About />
      </ProPublicRoute>
    ),
  },
];

export default publicRoutes;
