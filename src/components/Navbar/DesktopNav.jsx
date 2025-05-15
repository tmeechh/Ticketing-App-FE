
import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const DesktopNav = ({ isScrolled }) => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        to="/" 
        className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${
          isScrolled ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--white))]'
        }`}
      >
        Home
      </Link>
      <Link 
        to="/events" 
        className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${
          isScrolled ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--white))]'
        }`}
      >
        Events
      </Link>
      {isAuthenticated && (
        <Link 
          to="/my-tickets" 
          className={`font-medium hover:text-[hsl(var(--accent))] transition-colors ${
            isScrolled ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--white))]'
          }`}
        >
          My Tickets
        </Link>
      )}
    </nav>
  );
};

export default DesktopNav;
