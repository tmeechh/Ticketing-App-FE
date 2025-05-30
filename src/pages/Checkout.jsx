
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Ticket, CreditCard, Calendar, MapPin, Clock, Info, CheckCircle } from 'lucide-react';

// Mock data - would be replaced with actual data from cart/context
const checkoutData = {
  event: {
    id: 1,
    title: "International Music Festival",
    date: "June 15-17, 2023",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1170&auto=format&fit=crop",
  },
  ticket: {
    type: "VIP Experience",
    price: 299.99,
    quantity: 2,
    serviceFee: 89.99,
  }
};

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Order summary calculations
  const subtotal = checkoutData.ticket.price * checkoutData.ticket.quantity;
  const serviceFee = checkoutData.ticket.serviceFee;
  const total = subtotal + serviceFee;

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNextStep = () => {
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousStep = () => {
    setActiveStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Redirect to tickets page after payment success
      setTimeout(() => {
        navigate('/my-tickets');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Checkout Header */}
          <div className="py-8 text-center">
            <h1 className="heading-lg mb-4">Secure Checkout</h1>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center max-w-md mx-auto">
              <div className={`flex-1 flex flex-col items-center ${activeStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mb-2 ${activeStep >= 1 ? 'bg-primary' : 'bg-muted'}`}>
                  1
                </div>
                <span className="text-sm">Your Details</span>
              </div>
              <div className={`flex-1 h-[2px] ${activeStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className={`flex-1 flex flex-col items-center ${activeStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mb-2 ${activeStep >= 2 ? 'bg-primary' : 'bg-muted'}`}>
                  2
                </div>
                <span className="text-sm">Payment</span>
              </div>
              <div className={`flex-1 h-[2px] ${activeStep >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className={`flex-1 flex flex-col items-center ${activeStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mb-2 ${activeStep >= 3 ? 'bg-primary' : 'bg-muted'}`}>
                  3
                </div>
                <span className="text-sm">Confirmation</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              {/* If checkout is complete, show success message */}
              {isComplete ? (
                <div className="premium-card text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h2 className="heading-md mb-2">Payment Successful!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your purchase. Your tickets have been sent to your email.
                  </p>
                  <p className="text-sm mb-8">
                    You will be redirected to your tickets page shortly...
                  </p>
                  <button
                    onClick={() => navigate('/my-tickets')}
                    className="btn-primary"
                  >
                    View My Tickets
                  </button>
                </div>
              ) : (
                /* Step 1: Customer Details */
                activeStep === 1 ? (
                  <div className="premium-card">
                    <h2 className="heading-sm mb-6">Contact Information</h2>
                    <form>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-6 p-3 bg-accent/10 rounded-md text-sm">
                        <Info className="h-4 w-4 text-accent" />
                        <p className="text-muted-foreground">
                          Your tickets will be sent to your email address after payment.
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        className="btn-primary w-full"
                        onClick={handleNextStep}
                      >
                        Continue to Payment
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Step 2: Payment Details */
                  <div className="premium-card">
                    <h2 className="heading-sm mb-6">Payment Information</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <label htmlFor="cardNumber" className="block text-sm font-medium">Card Information</label>
                          <div className="flex space-x-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-6" />
                          </div>
                        </div>
                        <div className="border border-input rounded-md overflow-hidden">
                          <div className="p-2.5 border-b border-input">
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 text-muted-foreground mr-2" />
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                className="flex-1 border-0 focus:outline-none focus:ring-0"
                                placeholder="1234 5678 9012 3456"
                                required
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              className="p-2.5 border-0 border-r border-input focus:outline-none focus:ring-0"
                              placeholder="MM/YY"
                              required
                            />
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              className="p-2.5 border-0 focus:outline-none focus:ring-0"
                              placeholder="CVV"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="cardName" className="block text-sm font-medium mb-1">Name on Card</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="w-full border border-input rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter name as it appears on your card"
                          required
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-6 p-3 bg-green-100 rounded-md text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="text-green-700">
                          Your payment information is encrypted and secure.
                        </p>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          className="btn-outline flex-1"
                          onClick={handlePreviousStep}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn-primary flex-1 flex justify-center items-center"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>Complete Payment</>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )
              )}
            </div>
            
            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="premium-card sticky top-24">
                <h2 className="heading-sm mb-6">Order Summary</h2>
                
                <div className="flex items-start space-x-4 pb-6 mb-6 border-b border-muted">
                  <img
                    src={checkoutData.event.image}
                    alt={checkoutData.event.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{checkoutData.event.title}</h3>
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{checkoutData.event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{checkoutData.event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{checkoutData.event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pb-6 mb-6 border-b border-muted">
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center">
                      <Ticket className="h-4 w-4 mr-1.5" />
                      {checkoutData.ticket.type}
                    </span>
                    <span>x{checkoutData.ticket.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Price per ticket</span>
                    <span>${checkoutData.ticket.price.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg pt-3 mt-3 border-t border-muted">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <p className="mb-2">
                    By proceeding with your purchase, you agree to our <a href="#" className="underline hover:text-accent">Terms of Service</a> and <a href="#" className="underline hover:text-accent">Privacy Policy</a>.
                  </p>
                  <p>
                    All sales are final. Tickets are non-refundable unless the event is cancelled.
                  </p>
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

export default Checkout;
