
import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const TicketCard = ({ ticket, onSelect }) => {
  return (
    <div className="premium-card hover:shadow-lg transition-shadow">
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <img
          src={ticket.event?.image || 'https://placehold.co/600x400?text=Event+Image'}
          alt={ticket.eventName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium">
          {ticket.ticketType}
        </div>
      </div>
      
      <h3 className="font-bold text-xl mb-2">{ticket.eventName}</h3>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{ticket.eventDate}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{ticket.eventTime}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{ticket.eventLocation}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-muted flex justify-between items-center">
        <div className="text-sm">
          <p className="text-muted-foreground">Quantity: {ticket.quantity}</p>
          <p className="text-muted-foreground">Order ID: {ticket.id}</p>
        </div>
        <button
          className="btn-primary flex items-center"
          onClick={() => onSelect(ticket)}
        >
          <span>View Ticket</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
