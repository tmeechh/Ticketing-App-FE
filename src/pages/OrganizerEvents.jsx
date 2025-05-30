import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import useEventStore from '@/store/useEventStore';
import useAuthStore from '@/store/authStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrganizerEvents = () => {
  const { user } = useAuthStore();
  const { fetchOrganizerEvents, deleteEvent } = useEventStore();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event._id !== eventId));
    }
  };

  if (loading) return <div className="text-center py-8">Loading your events...</div>;

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
                      onClick={() => handleDelete(event._id)}
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
      <Footer/>
    </>
    
  );
};

export default OrganizerEvents;