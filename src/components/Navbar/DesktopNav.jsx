
import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import {useLocation } from 'react-router-dom';

const DesktopNav = ({ isScrolled }) => {
  const { isAuthenticated } = useAuthStore();

  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const linkColor = isHome && !isScrolled
  ? 'text-[hsl(var(--white))]'
  : 'text-[hsl(var(--foreground))]';

  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        to="/" 
        className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${linkColor}`}
      >
        Home
      </Link>
      <Link 
        to="/events" 
        className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${linkColor}`}
      >
        Events
      </Link>
      {isAuthenticated && (
        <Link 
          to="/my-tickets" 
          className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${linkColor}`}
        >
          My Tickets
        </Link>
      )}
    </nav>
  );
};

export default DesktopNav;
