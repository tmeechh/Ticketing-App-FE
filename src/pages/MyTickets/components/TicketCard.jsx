
import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const TicketCard = ({ ticket, onSelect }) => {
  return (
    <div className="premium-card hover:shadow-lg transition-shadow">
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <img
          src={ticket.event?.images[0] || 'https://placehold.co/600x400?text=Event+Image'}
          alt={ticket?.event?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 uppercase bg-white px-3 py-1 rounded-full text-xs font-medium">
          {ticket.ticketType}
        </div>
      </div>
      
      <h3 className="font-bold text-xl mb-2">{ticket.event?.title}</h3>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
        <span className="text-sm">
    {ticket.event?.date 
      ? new Date(ticket.event.date).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "No date"}
  </span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{ticket.event?.time}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{ticket.event?.location}</span>
        </div>
         <div className="flex items-center text-muted-foreground space-x-2">
  <span className="text-sm font-medium">$</span>
  <span className="text-sm">{ticket?.price}</span>
</div>

<div className="flex items-center space-x-2">
  <span className="text-xs font-semibold text-gray-500">Status:</span>
  <span
    className={`text-sm font-medium uppercase ${
      ticket?.status === 'paid'
        ? 'text-green-600'
        : ticket?.status === 'cancelled'
        ? 'text-red-600'
        : 'text-yellow-600'
    }`}
  >
    {ticket?.status}
  </span>
</div>

      </div>
      
      <div className="pt-4 border-t border-muted flex justify-between items-center">
        <div className="text-sm">
          <p className="text-muted-foreground">Quantity: {ticket?.quantity}</p>
          {/* <p className="text-muted-foreground">Order ID: {ticket.id}</p> */}
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
