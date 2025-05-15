
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const NavLogo = ({ isScrolled }) => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Ticket className={`h-7 w-7 ${isScrolled ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--white))]'}`} />
      <span className={`text-xl font-bold font-playfair ${isScrolled ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--white))]'}`}>
        EventHorizon
      </span>
    </Link>
  );
};

export default NavLogo;
