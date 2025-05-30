
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/authStore';
import { User, LogOut } from 'lucide-react';

const NavActions = ({ isScrolled, openLogin, openSignup, handleLogout, navigate }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  const onProfileClick = () => {
    navigate('/profile');
  };

   const { pathname } = useLocation();
    const isHome = pathname === '/';
  
    const loginColor = isHome && !isScrolled
    ? 'text-white hover:text-white/80'
    : 'text-primary cursor-pointer hover:text-primary/80';
  
  
  
    const signUpColor = isHome && !isScrolled
    ? 'bg-white text-primary hover:bg-white/90'
    : 'bg-[hsl(266,35%,23%)] cursor-pointer text-white hover:bg-primary/90';
  
    const logoutColor = isHome && !isScrolled
    ? 'border-white text-white hover:bg-white hover:text-primary'
    : 'bg-white text-primary hover:bg-white/90';

    const profileColor = isHome && !isScrolled
    ? 'text-white hover:text-white/80'
    : 'text-primary hover:text-primary/80';

  return (
    <div className="hidden md:flex items-center space-x-4">
      {isAuthenticated ? (
        <>
          <Button 
            variant="ghost" 
            className={`flex items-center space-x-2 cursor-pointer ${profileColor}`}
            onClick={onProfileClick}
          >
            <User size={18} />
            <span>{user?.name || 'Profile'}</span>
          </Button>
          <Button 
            variant="outline"
            className={`border-2 px-4 py-2 cursor-pointer rounded-full ${
              logoutColor
             }`}
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button 
            variant="ghost"
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
             loginColor
            }`}
            onClick={openLogin}
          >
            Login
          </Button>
          <Button 
            className={`px-6 py-2 rounded-full cursor-pointer transition-colors ${
             signUpColor
            }`}
            onClick={openSignup}
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
};

export default NavActions;
