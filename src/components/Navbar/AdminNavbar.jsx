import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Ticket,
  Calendar,
  LogOut,
  EllipsisVertical,
  X,
} from 'lucide-react';
import useAuthStore from '@/store/authStore';

const navLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/events', label: 'Events', icon: Calendar },
  { to: '/admin/tickets', label: 'Tickets', icon: Ticket },
];

const AdminNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/40 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Title */}
        <Link
          to="/admin/dashboard"
          className="text-xl font-bold text-gray-950 tracking-wide"
        >
          <span className="text-blue-900">EventHorizon</span> Admin Panel
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all 
                ${
                  location.pathname === to
                    ? 'bg-gradient-to-r bg-gray-950 from-accent to-primary text-white shadow-lg shadow-accent/50'
                    : 'bg-gray-950/10 text-white hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/50'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          {/* Logout */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/50 transition-all"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-950 p-2 rounded-lg cursor-pointer hover:bg-gray-950/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <EllipsisVertical className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10 px-6 py-4 space-y-3">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all w-full
                ${
                  location.pathname === to
                    ? 'bg-gradient-to-r from-accent to-primary text-white shadow-lg shadow-accent/50'
                    : 'bg-white/10 text-white hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/50'
                }
              `}
            >
              <Icon className="h-4 w-4 text-white " />
              {label}
            </Link>
          ))}
          {/* Logout */}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/50 transition-all w-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
