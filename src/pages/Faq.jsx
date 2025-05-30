import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Faq = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="hero-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="heading-lg">Frequently Asked Questions</h1>
            <p className="text-lg text-white/80 max-w-2xl mt-4">
              Here are some of the most common questions we get from our users.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="premium-card">
              <h2 className="heading-sm mb-2">How do I create an event?</h2>
              <p>
                Simply sign up as an organizer, go to your dashboard, and click "Create Event". Fill in the event details, ticket types, and publish it when you're ready.
              </p>
            </div>

            <div className="premium-card">
              <h2 className="heading-sm mb-2">Can I buy tickets without creating an account?</h2>
              <p>
                No. You’ll need to sign up to make a purchase so you can access your tickets, get event updates, and request refunds if necessary.
              </p>
            </div>

            <div className="premium-card">
              <h2 className="heading-sm mb-2">What payment methods are accepted?</h2>
              <p>
                We accept debit/credit cards and Paystack payments. Cryptocurrency support will be available soon.
              </p>
            </div>

            <div className="premium-card">
              <h2 className="heading-sm mb-2">How can I request a refund?</h2>
              <p>
                If eligible, go to your ticket history and click "Request Refund". Note: Refunds are not allowed within 14 days of the event.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faq;
