import { lazy } from 'react';

const Index = lazy(() => import('@/pages/Index'));
const Terms = lazy(() => import('@/pages/Terms'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const ContactUs = lazy(() => import('@/pages/ContactUs'));
const Faq = lazy(() => import('@/pages/Faq'));
const About = lazy(() => import('@/pages/About'));

const publicRoutes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/contact',
    element: <ContactUs />,
  },
  {
    path: '/faq',
    element: <Faq />,
  },
  {
    path: '/about',
    element: <About />,
  },
];

export default publicRoutes;