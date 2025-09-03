
import React from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="section-container">
      <div className="hero-gradient rounded-3xl overflow-hidden">
        <div className="relative px-6 py-16 md:py-24">
          {/* Background Overlay Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex  items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20">
              <Mail className="h-5 w-5 text-accent text-amber-400" />

            </div>
            
            <h2 className="heading-lg mb-6">Stay Updated on Latest Events</h2>
            <p className="text-lg text-white/80 mb-8">
              Subscribe to our newsletter and never miss an event. Get personalized recommendations and early access to ticket sales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex h-12 w-full rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                required
              />
              <button 
                type="button" 
                className="btn-accent cursor-not-allowed h-12 whitespace-nowrap flex items-center justify-center"
              >
                <span>Subscribe</span>
                <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 5L20 12L13 19M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <p className="text-sm text-white/60 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-medium">10K+</span>
                <span className="text-sm text-white/70">Newsletter Subscribers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-medium">Weekly</span>
                <span className="text-sm text-white/70">Update Frequency</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-medium">Early</span>
                <span className="text-sm text-white/70">Access to Events</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
