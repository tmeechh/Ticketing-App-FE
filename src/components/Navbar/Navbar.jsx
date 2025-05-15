
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AuthModal from '../Auth/AuthModal';
import useAuthStore from '../../store/authStore';
import NavLogo from './NavLogo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import NavActions from './NavActions';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login');
  
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLogin = () => {
    setAuthView('login');
    setAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthView('signup');
    setAuthModalOpen(true);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[hsl(var(--white))] shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <NavLogo isScrolled={isScrolled} />

          {/* Desktop Navigation */}
          <DesktopNav isScrolled={isScrolled} />

          {/* Action Buttons */}
          <NavActions 
            isScrolled={isScrolled} 
            openLogin={openLogin} 
            openSignup={openSignup}
            handleLogout={handleLogout}
            navigate={navigate}
            isAuthenticated={isAuthenticated}
          />

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--white))]'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--white))]'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <MobileNav 
            setIsMenuOpen={setIsMenuOpen} 
            openLogin={openLogin} 
            openSignup={openSignup}
            handleLogout={handleLogout}
            isAuthenticated={isAuthenticated}
          />
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultView={authView}
      />
    </>
  );
};

export default Navbar;
