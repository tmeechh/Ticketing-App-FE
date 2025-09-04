import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  User,
  Ticket,
  Calendar,
  Clock,
  LogOut,
  Settings,
  Edit2,
  X,
  Check,
  Camera,
} from 'lucide-react';
import useAuthStore from '@/store/authStore';
import useTicketStore from '@/store/useTicketStore';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile } = useAuthStore();
  const { upcomingTickets, fetchUserTickets, isLoading } = useTicketStore();

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.fullName || '');
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

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

  // Handle name update
  const handleUpdateName = async () => {
    setIsUpdatingName(true);
    const success = await updateProfile({ fullName: newName });
    setIsUpdatingName(false);

    if (success) setEditingName(false);
  };

  // Handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage({ file, url });
    }
  };

  const handleSaveImage = async () => {
    if (!previewImage?.file) return;
    const formData = new FormData();
    formData.append('image', previewImage.file);

    setIsUpdatingImage(true);
    const success = await updateProfile(formData, true);
    setIsUpdatingImage(false);

    if (success) setPreviewImage(null);
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
                <p className="text-white/80">
                  Manage your account, view tickets, and track events
                </p>
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
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 relative">
                    {previewImage ? (
                      <img
                        src={previewImage.url}
                        alt="Preview"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : user?.image ? (
                      <img
                        src={user.image}
                        alt="User profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-primary" />
                    )}

                    {/* Camera icon for upload */}
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute  bg-primary cursor-pointer text-white p-1 rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>

                  {/* Save image button */}
                  {previewImage && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={handleSaveImage}
                        disabled={isUpdatingImage}
                        className="px-3 py-1 bg-primary text-green-600 cursor-pointer rounded-lg flex items-center"
                      >
                        {isUpdatingImage ? (
                          <span className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full mr-1" />
                        ) : (
                          <Check className="w-4 h-4 mr-1" />
                        )}
                        {isUpdatingImage ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setPreviewImage(null)}
                        disabled={isUpdatingImage}
                        className="px-3 py-1 bg-muted text-red-600 cursor-pointer rounded-lg flex items-center"
                      >
                        <X className="w-4 h-4 mr-1" /> Cancel
                      </button>
                    </div>
                  )}

                  {/* Name editing */}
                  {editingName ? (
                    <div className="flex items-center space-x-2 mt-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                      <button
                        onClick={handleUpdateName}
                        disabled={isUpdatingName}
                        className="px-2 py-1 bg-primary text-green-600 cursor-pointer rounded flex items-center"
                      >
                        {isUpdatingName ? (
                          <span className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full mr-1" />
                        ) : null}
                        Save
                      </button>
                      <button
                        onClick={() => setEditingName(false)}
                        className="px-2 py-1 bg-muted text-red-600 cursor-pointer rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center mt-2">
                      <h2 className="text-2xl font-bold">{user?.fullName}</h2>
                      <button
                        onClick={() => setEditingName(true)}
                        className="ml-2 cursor-pointer text-primary"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <p className="text-muted-foreground">{user?.email}</p>
                </div>

                <div className="space-y-4">
                  <Link
                    to="/my-tickets"
                    className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Ticket className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-medium">My Tickets</h3>
                      <p className="text-sm text-muted-foreground">
                        View and manage your event tickets
                      </p>
                    </div>
                  </Link>
                  {(user?.roles === 'organizer' ||
                    user?.roles?.includes?.('organizer')) && (
                    <Link
                      to="/my-events"
                      className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-medium">My Event</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage your own event on our platform
                        </p>
                      </div>
                    </Link>
                  )}
                  {(user?.roles === 'organizer' ||
                    user?.roles?.includes?.('organizer')) && (
                    <Link
                      to="/create-event"
                      className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Create Event</h3>
                        <p className="text-sm text-muted-foreground">
                          Host your own event on our platform
                        </p>
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
                  <Link
                    to="/my-tickets"
                    className="text-sm text-primary hover:underline"
                  >
                    View All
                  </Link>
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Clock className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : upcomingTickets.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingTickets.slice(0, 3).map((ticket) => (
                      <div
                        key={ticket?.id}
                        className="flex border border-muted rounded-lg overflow-hidden"
                      >
                        {/* Event Image */}
                        <div className="hidden sm:block w-24 h-24">
                          <img
                            src={
                              ticket.event?.images[0] ||
                              'https://placehold.co/600x400?text=Event'
                            }
                            alt={ticket?.event?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium">{ticket?.eventName}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>
                                {' '}
                                {ticket.event?.date
                                  ? new Date(
                                      ticket.event.date
                                    ).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                    })
                                  : 'No date'}
                              </span>
                              <span className="mx-2">•</span>
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{ticket?.event?.time}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs uppercase bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {ticket?.ticketType}
                            </span>
                            <Link
                              to={`/events/${ticket?.event?._id}`}
                              className="text-sm text-primary hover:underline"
                            >
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
                    <p className="text-sm text-muted-foreground mb-4">
                      You don't have any upcoming event tickets
                    </p>
                    <Link to="/events" className="btn-primary">
                      Browse Events
                    </Link>
                  </div>
                )}
              </div>

              <div className="premium-card mt-8">
                <h2 className="heading-md mb-6">Account Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-1">
                      Full Name
                    </h3>
                    <p className="font-medium">{user?.fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-1">
                      Email Address
                    </h3>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-1">
                      Account Created
                    </h3>
                    <p className="font-medium">
                      {new Date(
                        user?.createdAt || Date.now()
                      ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
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
