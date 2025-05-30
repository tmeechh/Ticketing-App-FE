import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useTicketStore from '@/store/useTicketStore';
import useAuthStore from '@/store/authStore';
import { toast } from 'sonner';
import useEventStore from '../store/useEventStore';
import {
  Loader,
  Calendar,
  Clock,
  MapPin,
  User,
  Ticket,
  Info,
  ChevronUp,
  ChevronDown,
  Check,
} from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentEvent, fetchEventById, isLoading } = useEventStore();
  const { buyTicket } = useTicketStore();
  const { isAuthenticated } = useAuthStore();

  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [expandedFaqs, setExpandedFaqs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };
  const ticketTypes = currentEvent?.ticketPrices
    ? currentEvent.ticketPrices instanceof Map
      ? Object.fromEntries(currentEvent.ticketPrices)
      : currentEvent.ticketPrices
    : {};

  const ticketsAvailable = currentEvent?.ticketsAvailable
    ? currentEvent.ticketsAvailable instanceof Map
      ? Object.fromEntries(currentEvent.ticketsAvailable)
      : currentEvent.ticketsAvailable
    : {};

  useEffect(() => {
    if (currentEvent) {
      if (currentEvent?.images?.length) {
        setSelectedImage(currentEvent.images[0]);
      }

      // Set default selected ticket type to the first one
      if (ticketTypes && Object.keys(ticketTypes).length > 0) {
        const firstType = Object.keys(ticketTypes)[0];

        setSelectedTicketType({
          type: firstType,
          price: ticketTypes[firstType],
          available: ticketsAvailable[firstType] || 100,
        });
      }
    }
  }, [currentEvent, ticketTypes, ticketsAvailable]);

  useEffect(() => {
    const loadEvent = async () => {
      await fetchEventById(id);
    };

    loadEvent();
  }, [fetchEventById, id]);

  // Toggle FAQ
  const toggleFaq = (index) => {
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter((item) => item !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
  };
  const GENERAL_FAQS = [
    {
      question: 'What is your refund policy?',
      answer:
        'Tickets are refundable up to 14 days before the event. After that, all sales are final.',
    },
    {
      question: 'How do I get to the venue?',
      answer:
        'The venue address will be included in your ticket confirmation email. Public transport options and parking information will also be provided.',
    },
    {
      question: 'What time should I arrive?',
      answer:
        'We recommend arriving at least 30 minutes before the event start time to allow for check-in and seating.',
    },
    {
      question: 'Is there an age restriction?',
      answer:
        'Most of our events are all-ages unless otherwise specified. Please check the event details for age restrictions.',
    },
    {
      question: 'Can I transfer my ticket to someone else?',
      answer:
        'Yes, tickets can be transferred by contacting our support team at least 24 hours before the event.',
    },
  ];

  const handleTicketPurchase = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to purchase tickets');
      navigate('/login');
      return;
    }

    if (!selectedTicketType) {
      toast.error('Please select a ticket type');
      return;
    }

    setIsPurchasing(true);
    try {
      const result = await buyTicket(currentEvent.id, selectedTicketType.type);
      if (result && result.paymentLink) {
        // Redirect to payment page
        window.location.href = result.paymentLink;
      } else {
        // Handle successful purchase that doesn't require redirect
        navigate('/checkout', {
          state: {
            event: currentEvent,
            ticket: {
              type: selectedTicketType.type,
              price: selectedTicketType.price,
              quantity: ticketQuantity,
            },
          },
        });
      }
    } catch (error) {
      toast.error('Failed to process ticket purchase');
    } finally {
      setIsPurchasing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <Loader className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="heading-lg mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/events" className="btn-primary">
            Browse Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Format ticket types for display
  const formattedTicketTypes = Object.entries(ticketTypes).map(
    ([type, price]) => ({
      id: type,
      name: type.charAt(0).toUpperCase() + type.slice(1),
      description: `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } ticket access`,
      price: price,
      available: ticketsAvailable[type] || 0,
    })
  );

  // Calculate service fee and total
  const calculateServiceFee = () => {
    if (!selectedTicketType) return 0;
    return selectedTicketType.price * ticketQuantity * 0.15;
  };

  const calculateTotal = () => {
    if (!selectedTicketType) return 0;
    return selectedTicketType.price * ticketQuantity + calculateServiceFee();
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Event Header */}
        <div className="hero-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-accent font-medium mb-2">
                  {currentEvent.category}
                </p>
                <h1 className="heading-lg mb-2">{currentEvent.title}</h1>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center text-white/80">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>
                      <span>
                        {new Date(currentEvent.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{currentEvent.time}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{currentEvent.location}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0 flex space-x-3">
                <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span>Save</span>
                </button>
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span>Share</span>
                  </button>
                  {showCopied && (
                    <div className="absolute -top-8 right-0 bg-white/20 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      Link copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - Images and Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Image Display */}
              <div className="rounded-2xl overflow-hidden card-shadow h-[400px] md:h-[500px]">
                <img
                  src={
                    selectedImage ||
                    (currentEvent.images && currentEvent.images[0])
                  }
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-event.jpg';
                  }}
                />
              </div>

              {/* Image Gallery */}
              {currentEvent.images && currentEvent.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {currentEvent.images.map((img, index) => (
                    <div
                      key={index}
                      className={`rounded-xl overflow-hidden cursor-pointer h-24 transition-all ${
                        selectedImage === img
                          ? 'ring-2 ring-primary'
                          : 'hover:opacity-90'
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${currentEvent.title} image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-event.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Event Description */}
              <div className="premium-card">
                <h2 className="heading-md mb-4">About This Event</h2>
                <p className="text-lg mb-6">{currentEvent.description}</p>
                <p className="whitespace-pre-line">
                  {currentEvent.fullDescription}
                </p>

                <div className="mt-8 pt-8 border-t border-muted">
                  <h3 className="heading-sm mb-4">Event Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 mt-1 text-accent" />
                      <div>
                        <h4 className="font-medium">Date and Time</h4>
                        <p className="text-muted-foreground">
                          <span>
                            {new Date(currentEvent.date).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }
                            )}
                          </span>
                        </p>
                        <p className="text-muted-foreground">
                          {currentEvent.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 mt-1 text-accent" />
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-muted-foreground">
                          {currentEvent.location}
                        </p>
                        <p className="text-muted-foreground">
                          {currentEvent.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-3 mt-1 text-accent" />
                      <div>
                        <h4 className="font-medium">Organizer</h4>
                        <p className="text-muted-foreground">
                          {currentEvent.organizer}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Ticket className="h-5 w-5 mr-3 mt-1 text-accent" />
                      <div>
                        <h4 className="font-medium">Tickets</h4>
                        <p className="text-muted-foreground">
                          Starting from $
                          {Object.values(ticketTypes).length > 0
                            ? Math.min(...Object.values(ticketTypes)).toFixed(2)
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              {/* FAQs - General for all events */}
              <div className="premium-card">
                <h2 className="heading-md mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {GENERAL_FAQS.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-muted rounded-lg overflow-hidden"
                    >
                      <button
                        className="flex justify-between items-center w-full px-4 py-3 text-left font-medium"
                        onClick={() => toggleFaq(index)}
                      >
                        {faq.question}
                        {expandedFaqs.includes(index) ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                      {expandedFaqs.includes(index) && (
                        <div className="bg-[hsl(266,35%,23%)] text-white px-4 pt-4 pb-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Ticket Selection */}
            <div className="lg:col-span-1">
              <div className="premium-card sticky top-24">
                <h2 className="heading-sm mb-6">Select Tickets</h2>

                <div className="space-y-4">
                  {formattedTicketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTicketType?.type === ticket.id
                          ? 'border-primary bg-[hsla(266,35%,23%,0.05)]'
                          : 'border-muted hover:border-primary/30'
                      }`}
                      onClick={() =>
                        setSelectedTicketType({
                          type: ticket.id,
                          name: ticket.name,
                          price: ticket.price,
                          available: ticket.available,
                        })
                      }
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{ticket.name}</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {ticket.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${ticket.price}</p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.available} available
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="quantity" className="text-sm font-medium">
                      Quantity
                    </label>
                    {selectedTicketType && (
                      <p className="text-xs text-muted-foreground">
                        {selectedTicketType.available} available
                      </p>
                    )}
                  </div>
                  <div className="flex items-center border border-muted rounded-md overflow-hidden">
                    <button
                      className="px-3 py-2 bg-muted/50 hover:bg-muted transition-colors"
                      onClick={() =>
                        ticketQuantity > 1 &&
                        setTicketQuantity(ticketQuantity - 1)
                      }
                      disabled={ticketQuantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={selectedTicketType?.available || 1}
                      value={ticketQuantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (
                          !isNaN(value) &&
                          value >= 1 &&
                          value <= (selectedTicketType?.available || 1)
                        ) {
                          setTicketQuantity(value);
                        }
                      }}
                      className="flex-1 text-center py-2 border-0 focus:outline-none focus:ring-0"
                    />
                    <button
                      className="px-3 py-2 bg-muted/50 hover:bg-muted transition-colors"
                      onClick={() => {
                        if (
                          selectedTicketType &&
                          ticketQuantity < selectedTicketType.available
                        ) {
                          setTicketQuantity(ticketQuantity + 1);
                        }
                      }}
                      disabled={
                        !selectedTicketType ||
                        ticketQuantity >= selectedTicketType.available
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                {selectedTicketType && (
                  <div className="mt-8 pt-6 border-t border-muted">
                    <div className="flex justify-between items-center mb-2">
                      <span>Ticket Price</span>
                      <span>${selectedTicketType.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Quantity</span>
                      <span>{ticketQuantity}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Service Fee</span>
                      <span>${calculateServiceFee().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg mt-4 pt-4 border-t border-muted">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    onClick={handleTicketPurchase}
                    disabled={isPurchasing || !selectedTicketType}
                    className="btn-primary w-full py-4 flex justify-center items-center"
                  >
                    {isPurchasing ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Ticket className="h-5 w-5 mr-2" />
                        Get Tickets
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center mt-4 text-muted-foreground text-xs">
                    <Info className="h-4 w-4 mr-1" />
                    <span>
                      Tickets are non-refundable 14 days before the event
                    </span>
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

export default EventDetail;
