
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const EventCard = ({ event }) => {
  const { 
    id, 
    title, 
    image, 
    date, 
    location, 
    ticketTypes,
    featured = false 
  } = event;

  // Calculate lowest ticket price
  const getLowestPrice = () => {
    if (!ticketTypes) return "N/A";
    
    const prices = Object.values(ticketTypes);
    return Math.min(...prices);
  };
  
  // Format date to show how far it is from now (e.g., "in 3 days")
  const getFormattedDate = () => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return date;
    }
  };

  return (
    <div className={`premium-card group h-full flex flex-col ${featured ? 'border-accent/30 shadow-lg' : ''}`}>
      <div className="relative overflow-hidden rounded-xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {featured && (
          <div className="absolute top-3 left-3 gold-gradient text-accent-foreground text-xs font-bold uppercase py-1 px-3 rounded-full">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs font-bold py-1 px-3 rounded-full">
          {event.category || "Event"}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col p-4">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{getFormattedDate()}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-muted flex justify-between items-center">
          <div>
            <span className="block text-sm text-muted-foreground">Starting from</span>
            <span className="font-bold text-lg">${getLowestPrice()}</span>
          </div>
          <Link 
            to={`/events/${id}`} 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
