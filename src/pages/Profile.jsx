
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Ticket, Calendar, Clock, LogOut, Settings } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import useTicketStore from '@/store/useTicketStore';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { upcomingTickets, fetchUserTickets, isLoading } = useTicketStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    fetchUserTickets();
  }, [isAuthenticated, navigate, fetchUserTickets]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // if (!isAuthenticated || !user) {
  //   return null; // Will redirect in useEffect
  // }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="hero-gradient text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="heading-lg mb-2">My Profile</h1>
                <p className="text-white/80">Manage your account, view tickets, and track events</p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 border border-white rounded-full px-4 py-2 text-white hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - User Info */}
            <div className="lg:col-span-1">
              <div className="premium-card h-full">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  {user?.image ? (
    <img 
      src={user.image} 
      alt="User profile" 
      className="w-full h-full rounded-full object-cover"
    />
  ) : (
    <User className="w-12 h-12 text-primary" />
  )}
                  </div>
                  <h2 className="text-2xl font-bold">{user?.fullName}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
                
                <div className="space-y-4">
                  <Link to="/my-tickets" className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors">
                    <Ticket className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-medium">My Tickets</h3>
                      <p className="text-sm text-muted-foreground">View and manage your event tickets</p>
                    </div>
                  </Link>
                  {(user?.roles === 'organizer' || user?.roles?.includes?.('organizer')) && (
                  <Link to="/my-events" className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-medium">My Event</h3>
                      <p className="text-sm text-muted-foreground">Manage your own event on our platform</p>
                    </div>
                  </Link>
                   )}
                  {(user?.roles === 'organizer' || user?.roles?.includes?.('organizer')) && (
                  <Link to="/create-event" className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Create Event</h3>
                      <p className="text-sm text-muted-foreground">Host your own event on our platform</p>
                    </div>
                  </Link>
                   )}
                  {/* <Link to="/account-settings" className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                    <Settings className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-medium">Account Settings</h3>
                      <p className="text-sm text-muted-foreground">Update your profile and preferences</p>
                    </div>
                  </Link> */}
                </div>
              </div>
            </div>
            
            {/* Right Column - Recent Activity */}
            <div className="lg:col-span-2">
              <div className="premium-card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="heading-md">Upcoming Events</h2>
                  <Link to="/my-tickets" className="text-sm text-primary hover:underline">View All</Link>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Clock className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : upcomingTickets.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingTickets.slice(0, 3).map(ticket => (
                      <div key={ticket?.id} className="flex border border-muted rounded-lg overflow-hidden">
                        {/* Event Image */}
                        <div className="hidden sm:block w-24 h-24">
                          <img 
                            src={ticket.event?.image || "https://placehold.co/600x400?text=Event"} 
                            alt={ticket?.eventName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Event Details */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium">{ticket?.eventName}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{ticket?.eventDate}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{ticket?.eventTime}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {ticket?.ticketType}
                            </span>
                            <Link to={`/events/${ticket?.eventId}`} className="text-sm text-primary hover:underline">
                              View Event
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-muted rounded-lg">
                    <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <h3 className="font-medium mb-2">No Upcoming Events</h3>
                    <p className="text-sm text-muted-foreground mb-4">You don't have any upcoming event tickets</p>
                    <Link to="/events" className="btn-primary">Browse Events</Link>
                  </div>
                )}
              </div>
              
              <div className="premium-card mt-8">
                <h2 className="heading-md mb-6">Account Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-1">Full Name</h3>
                    <p className="font-medium">{user?.fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-1">Email Address</h3>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-1">Account Created</h3>
                    <p className="font-medium">
                      {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
