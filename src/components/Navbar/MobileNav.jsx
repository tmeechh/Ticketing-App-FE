
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, CalendarDays, Ticket, User, LogIn, LogOut } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const MobileNav = ({ setIsMenuOpen, openLogin, openSignup, handleLogout }) => {
  const { isAuthenticated } = useAuthStore();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="bg-white border-t border-gray-200 shadow-lg py-4 px-6 md:hidden">
      <nav className="space-y-4">
        <Link
          to="/"
          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md"
          onClick={closeMenu}
        >
          <Home className="h-5 w-5 text-primary" />
          <span className="font-medium">Home</span>
        </Link>
        
        <Link
          to="/events"
          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md"
          onClick={closeMenu}
        >
          <CalendarDays className="h-5 w-5 text-primary" />
          <span className="font-medium">Events</span>
        </Link>
        
        {isAuthenticated && (
          <>
            <Link
              to="/my-tickets"
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md"
              onClick={closeMenu}
            >
              <Ticket className="h-5 w-5 text-primary" />
              <span className="font-medium">My Tickets</span>
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md"
              onClick={closeMenu}
            >
              <User className="h-5 w-5 text-primary" />
              <span className="font-medium">Profile</span>
            </Link>
            
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex items-center w-full space-x-3 p-2 hover:bg-gray-50 rounded-md"
            >
              <LogOut className="h-5 w-5 text-primary" />
              <span className="font-medium">Logout</span>
            </button>
          </>
        )}
        
        {!isAuthenticated && (
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
            <button
              onClick={() => {
                openLogin();
                closeMenu();
              }}
              className="flex items-center cursor-pointer space-x-3 p-2 hover:bg-gray-50 rounded-md"
            >
              <LogIn className="h-5 w-5 text-primary" />
              <span className="font-medium">Login</span>
            </button>
            
            <button
              onClick={() => {
                openSignup();
                closeMenu();
              }}
              className="bg-primary text-white font-semibold p-3 rounded-lg text-center hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileNav;
