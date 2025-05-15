
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/cup.jpg';


const Hero = () => {

  return (
    <section className="relative text-white min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h5 className="text-accent font-medium tracking-wider uppercase animate-fade-in">Premium Event Ticketing</h5>
              <h1 className="heading-xl leading-tight animate-slide-up delay-100">
                Unforgettable <span className="relative inline-block">
                  Events
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-accent rounded-full"></span>
                </span>
                <br />Begin Here
              </h1>
              <p className="text-lg text-white/80 max-w-lg mt-6 animate-slide-up delay-200">
                Discover and book the most exclusive events, concerts, and experiences from around the world with EventHorizon's premium ticketing platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <Link to="/events" className="btn-accent">
                Explore Events
              </Link>
              <Link to="/events" className="group flex items-center justify-center sm:justify-start space-x-2 text-white font-medium py-3 px-6">
                <span>View Trending</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex items-center space-x-8 animate-slide-up delay-400">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">2M+</span>
                <span className="text-sm text-white/60">Happy Customers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">15K+</span>
                <span className="text-sm text-white/60">Monthly Events</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">4.9</span>
                <span className="text-sm text-white/60">Customer Rating</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            {/* Featured event card */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-accent/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
              
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
                <div className="p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-accent font-medium">Women's Champions League Final</p>
                      <h3 className="text-2xl font-bold text-white">Arsenal vs Barcelona</h3>
                      <p className="text-white/80">May 24 • Estádio José Alvalade, Lisbon</p>
                    </div>
                    <Link to="/events/womens-champions-final" className="btn-accent">Book Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="white">
          <path fillOpacity="1" d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,53.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
