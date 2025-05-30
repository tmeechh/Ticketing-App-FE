import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="hero-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="heading-lg">About EventHorizon</h1>
            <p className="text-lg text-white/80 max-w-2xl mt-4">
              Empowering event creators and attendees with seamless experiences.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto premium-card">
            <h2 className="heading-sm mb-4">Our Mission</h2>
            <p className="mb-4">
              EventHorizon is built to simplify and enhance the event experience for both organizers and attendees. Whether you're hosting a concert, seminar, or community meetup, our tools help you create, manage, and promote events effortlessly.
            </p>

            <h2 className="heading-sm mt-8 mb-4">Who We Are</h2>
            <p className="mb-4">
              We're a passionate team of developers, designers, and creatives who believe in the power of live experiences. Our goal is to make event management stress-free and ticket purchasing secure and fast.
            </p>

            <h2 className="heading-sm mt-8 mb-4">What Makes Us Different</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Fast and secure ticketing platform</li>
              <li>Decentralized ownership for full user control</li>
              <li>Simple tools for powerful event promotion</li>
              <li>Real-time updates and notifications</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
