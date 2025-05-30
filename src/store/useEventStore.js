
import { create } from 'zustand';
import axios from '@/lib/axiosConfig';
import { toast } from 'sonner';

const useEventStore = create((set, get) => ({
  events: [],
  featuredEvents: [],
  upcomingEvents: [],
  currentEvent: null,
  isLoading: false,
  error: null,
  
  // Fetch all events
  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get('/events');
      const events = response.data.events;
      
      // Extract featured and upcoming events
      const featured = events.slice(0, 4);

      // const featured = events.filter(event => event.featured === true);
      
      set({ 
        events, 
        featuredEvents: featured.slice(0, 4),
        upcomingEvents: events.slice(0, 8),
        isLoading: false 
      });
      
      return events;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to fetch events' 
      });
      
      toast.error('Failed to load events. Please try again later.');
      return [];
    }
  },
  
  // Fetch single event details
  fetchEventById: async (id) => {
    set({ isLoading: true, currentEvent: null });
    try {
      const response = await axios.get(`/events/${id}`);


      set({ currentEvent: response.data.event, isLoading: false });
      return response.data.event;
      
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to fetch event details' 
      });
      
      toast.error('Failed to load event details. Please try again later.');
      return null;
    }
    
  },
  
  // Create new event
  createEvent: async (eventData) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
  
      // Append all regular fields
      Object.entries(eventData).forEach(([key, value]) => {
        if (key === 'images') {
          // Handle images separately
          eventData.images.forEach(img => formData.append('images', img));
        } else if (key === 'ticketTypes' || key === 'ticketsAvailable') {
          // Stringify ticket data
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
  
      const response = await axios.post("/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Update state
      const { events } = get();
      set({ events: [response.data.event, ...events], isLoading: false });
      toast.success("Event created successfully!");
      console.log('Event data being sent:', eventData);
      return response.data;
      
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create event",
      });
      toast.error(error.response?.data?.message || "Failed to create event");
      return null;
    }
  },
  
 
  // Update event
  updateEvent: async (id, eventData) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
  
      // Mirror createEvent's data handling
      Object.entries(eventData).forEach(([key, value]) => {
        if (key === 'images') {
          eventData.images.forEach(img => formData.append('images', img));
        } else if (key === 'ticketTypes' || key === 'ticketsAvailable') {
          formData.append(key, JSON.stringify(value)); // Add ticketsAvailable
        } else {
          formData.append(key, value);
        }
      });
  
      const response = await axios.patch(`/events/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      const { events } = get();
      const updatedEvents = events.map((event) =>
        event.id === id ? response.data : event
      );
  
      set({
        events: updatedEvents,
        currentEvent: response.data,
        isLoading: false,
      });
  
      toast.success("Event updated successfully!");
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to update event",
      });
  
      toast.error(error.response?.data?.message || "Failed to update event");
      return null;
    }
  },
  
  
  // Delete event
  deleteEvent: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`/events/${id}`);
      
      // Update events list
      const { events } = get();
      set({ 
        events: events.filter(event => event.id !== id),
        isLoading: false 
      });
      
      toast.success('Event deleted successfully!');
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to delete event' 
      });
      
      toast.error(error.response?.data?.message || 'Failed to delete event');
      return false;
    }
  },

fetchOrganizerEvents: async (organizerId) => {
  const response = await axios.get(`/events/organizer/${organizerId}`);
  console.log("Full API Response:", response.data); // Debug log
  return response.data.data || []; // Access the 'data' property
},

  getCategoryCounts: () => {
    const events = get().events;
    const counts = {};
  
    events.forEach(event => {
      const category = event.category?.toLowerCase();
      if (category) {
        counts[category] = (counts[category] || 0) + 1;
      }
    });
  
    return counts;
  }
}));




export default useEventStore;
