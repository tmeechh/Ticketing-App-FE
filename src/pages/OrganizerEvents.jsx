import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Edit, Trash2 , Loader } from 'lucide-react';
import useEventStore from '@/store/useEventStore';
import useAuthStore from '@/store/authStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrganizerEvents = () => {
  const { user } = useAuthStore();
  const { fetchOrganizerEvents, deleteEvent } = useEventStore();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      if (user?._id) {
        const orgEvents = await fetchOrganizerEvents(user._id);
        setEvents(orgEvents);
        setLoading(false);
      }
    };
    loadEvents();
  }, [user?._id, fetchOrganizerEvents]);

  const handleDeleteClick = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      await deleteEvent(eventToDelete);
      setEvents(events.filter(event => event._id !== eventToDelete));
      setShowDeleteModal(false);
      setEventToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEventToDelete(null);
  };

  if (loading) return  <div className="flex justify-center items-center py-20">
                    <Loader className="h-8 w-8 animate-spin text-primary" />
                  </div>;

  return (
    <>
      <Navbar/>
      <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">My Events</h1>
      
      {events.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg">You haven't created any events yet</p>
          <Link 
            to="/create-event" 
            className="mt-4 inline-flex items-center btn-primary"
          >
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event._id} className="premium-card group">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={event.images[0]} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/update-event/${event._id}`}
                      className="p-2 text-primary hover:bg-primary/10 rounded-full"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(event._id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white  rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
    
  );
};

export default OrganizerEvents;