
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedEvents from '../components/FeaturedEvents';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import useEventStore from '../store/useEventStore';

const Index = () => {
  const { fetchEvents } = useEventStore();
  
  useEffect(() => {
    // Fetch events on page load
    fetchEvents();
  }, [fetchEvents]);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedEvents />
        <Categories />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
