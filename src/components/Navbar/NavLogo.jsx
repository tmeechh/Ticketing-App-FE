
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const NavLogo = ({ isScrolled }) => {

   const { pathname } = useLocation();
    const isHome = pathname === '/';
  
    const logoColor = isHome && !isScrolled
    ? 'text-[hsl(var(--white))]'
    : 'text-[hsl(var(--primary))]';
  
 
  
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Ticket className={`h-7 w-7 ${logoColor}`} />
      <span className={`text-xl font-bold font-playfair ${logoColor}`}>
        EventHorizon
      </span>
    </Link>
  );
};

export default NavLogo;
