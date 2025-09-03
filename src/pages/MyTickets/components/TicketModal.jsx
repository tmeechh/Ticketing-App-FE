
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, QrCode, ArrowRight, Download } from 'lucide-react';
import useTicketStore from '@/store/useTicketStore';
import { toast } from 'sonner';

const TicketModal = ({ ticket, onClose, activeTab }) => {
  const { requestRefund } = useTicketStore();
  
  // const handleRefundRequest = async (ticketId) => {
  //   if (window.confirm('Are you sure you want to request a refund for this ticket?')) {
  //     try {
  //       await requestRefund(ticketId);
  //       toast.success('Refund request submitted successfully');
  //       onClose();
  //     } catch (error) {
  //       toast.error('Failed to process refund request');
  //     }
  //   }
  // };
  const handleRefundRequest = async (ticketId) => {
  if (window.confirm('Are you sure you want to request a refund for this ticket?')) {
    const result = await requestRefund(ticketId);

    if (result) {
      // ✅ only close modal if BE success
      onClose();
    }
  }
};

  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-sm">Ticket Details</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Event Info */}
          <div className="mb-6">
            <img
              src={ticket.event?.images[0] || 'https://placehold.co/600x400?text=Event+Image'}
              alt={ticket.event?.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-xl mb-2">{ticket.event?.title}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-accent" />
                <span >
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
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-accent" />
                <span>{ticket.event?.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-accent" />
                <span>{ticket.event?.location}</span>
              </div>
            </div>
          </div>
          
          {/* Ticket QR Code */}
          <div className="bg-muted/30 rounded-lg p-6 text-center mb-6">
            {/* <div className="bg-white p-4 rounded-md inline-block mb-4 shadow-sm">
              <QrCode className="h-36 w-36" />
            </div>
            <p className="font-medium">Ticket ID: {ticket.id}</p> */}
            <p className="text-sm text-muted-foreground uppercase mt-1">{ticket.ticketType} - Qty: {ticket.quantity}</p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-3">
              {/* <button className="btn-outline flex-1 flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                <span>Download</span>
              </button> */}
              <Link to={`/events/${ticket?.event?._id}`} className="btn-primary flex-1 flex items-center justify-center">
                <span>Event Details</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            
            {/* Refund button only for upcoming events */}
            {activeTab === 'upcoming' && (
              <button 
                onClick={() => handleRefundRequest(ticket?._id)}
                className="btn-destructive underline cursor-pointer flex items-center justify-center"
              >
                Request Refund
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
