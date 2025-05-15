
import React from 'react';
import { Link } from "react-router-dom";
import { Ticket, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[hsl(266,35%,23%)] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Ticket className="h-5 w-5 text-accent text-amber-400" />
              <span className="text-xl font-bold font-playfair text-white">
                EventHorizon
              </span>
            </div>
            <p className="text-white/70 mb-6">
              The premium ticketing platform for all your event needs. Discover, book, and experience the extraordinary.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/70 hover:text-accent">Home</Link></li>
              <li><Link to="/events" className="text-white/70 hover:text-accent">Browse Events</Link></li>
           
            
              
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Information</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white/70 hover:text-accent">About Us</Link></li>
              <li><Link to="/faq" className="text-white/70 hover:text-accent">FAQ</Link></li>
              <li><Link to="/privacy" className="text-white/70 hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/70 hover:text-accent">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-accent">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-accent text-amber-400 mr-3 mt-1" />
                <span>123 Event Street, New York, NY 10001</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-4 w-4 text-accent text-amber-400 mr-3 mt-1" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-4 w-4 text-accent text-amber-400 mr-3 mt-1" />
                <span>support@eventhorizon.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-4 w-4 text-accent text-amber-400 mr-3 mt-1" />
                <span>Mon-Fri: 9AM - 8PM<br />Sat-Sun: 10AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 text-center md:flex md:justify-between md:items-center">
          <p className="text-white/70 mb-4 md:mb-0">
            &copy; {currentYear} EventHorizon. All rights reserved.
          </p>
          <div>
            <div className="flex items-center justify-center space-x-6">
              <Link to="/terms" className="text-white/70 hover:text-accent">Terms</Link>
              <Link to="/privacy" className="text-white/70 hover:text-accent">Privacy</Link>
              <Link to="#" className="text-white/70 hover:text-accent">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
