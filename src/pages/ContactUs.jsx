import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ContactUs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="hero-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="heading-lg">Contact Us</h1>
            <p className="text-lg text-white/80 max-w-2xl mt-4">
              We're here to help. Reach out to us with any questions, issues, or feedback.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto premium-card space-y-4">
            <p><strong>Email:</strong> support@eventhorizon.com</p>
            <p><strong>Phone:</strong> +1 (555) 987-6543</p>
            <p><strong>Address:</strong> 123 Event Street, New York, NY 10001</p>
            <p>
              You can also reach us via the contact form on your dashboard or DM us on our social media platforms.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
