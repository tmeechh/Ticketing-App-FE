
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { Search, Calendar, MapPin, Loader } from 'lucide-react';
import useEventStore from '../store/useEventStore';

const EventsPage = () => {
  const { events, fetchEvents, isLoading } = useEventStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  // Filter events based on search term and filters
  const filteredEvents = events.filter(event => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    
    // Price filter (simplified for now)
    let matchesPrice = true;
    if (selectedPrice === 'free') {
      const lowestPrice = Math.min(...Object.values(event.ticketTypes || {}));
      matchesPrice = lowestPrice === 0;
    } else if (selectedPrice === '1-99') {
      const lowestPrice = Math.min(...Object.values(event.ticketTypes || {}));
      matchesPrice = lowestPrice > 0 && lowestPrice < 100;
    } else if (selectedPrice === '100-299') {
      const lowestPrice = Math.min(...Object.values(event.ticketTypes || {}));
      matchesPrice = lowestPrice >= 100 && lowestPrice < 300;
    } else if (selectedPrice === '300+') {
      const lowestPrice = Math.min(...Object.values(event.ticketTypes || {}));
      matchesPrice = lowestPrice >= 300;
    }
    
    // For date filter, you'd need to implement date comparison logic
    // This is a placeholder
    const matchesDate = true;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDate;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering already happens reactively above
  };
  
  // Get unique categories from events
  const categories = [...new Set(events.map(event => event.category).filter(Boolean))];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="heading-lg mb-6">Discover Amazing Events</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Find and book tickets for concerts, sports, theater, conferences, and more from our curated selection of premium events.
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <input 
                    type="text" 
                    placeholder="Search events, venues, or locations" 
                    className="w-full h-12 bg-white/5 border border-white/20 rounded-lg pl-10 pr-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-accent h-12">
                  Search Events
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Filters and Results */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="premium-card sticky top-24">
                <h3 className="heading-sm mb-6">Filter Events</h3>
                
                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="category" 
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={!selectedCategory}
                          onChange={() => setSelectedCategory('')}
                        />
                        <span className="ml-2">All Categories</span>
                      </label>
                      
                      {categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input 
                            type="radio" 
                            name="category" 
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                          />
                          <span className="ml-2">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Date Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Date</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="date" 
                          className="text-primary focus:ring-primary"
                          checked={!selectedDate}
                          onChange={() => setSelectedDate('')}
                        />
                        <span className="ml-2">Any Time</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="date" 
                          className="text-primary focus:ring-primary"
                          checked={selectedDate === 'today'}
                          onChange={() => setSelectedDate('today')}
                        />
                        <span className="ml-2">Today</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="date" 
                          className="text-primary focus:ring-primary"
                          checked={selectedDate === 'weekend'}
                          onChange={() => setSelectedDate('weekend')}
                        />
                        <span className="ml-2">This Weekend</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="date" 
                          className="text-primary focus:ring-primary"
                          checked={selectedDate === 'week'}
                          onChange={() => setSelectedDate('week')}
                        />
                        <span className="ml-2">This Week</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="date" 
                          className="text-primary focus:ring-primary"
                          checked={selectedDate === 'month'}
                          onChange={() => setSelectedDate('month')}
                        />
                        <span className="ml-2">This Month</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Price Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="price" 
                          className="text-primary focus:ring-primary"
                          checked={!selectedPrice}
                          onChange={() => setSelectedPrice('')}
                        />
                        <span className="ml-2">Any Price</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="price" 
                          className="text-primary focus:ring-primary"
                          checked={selectedPrice === 'free'}
                          onChange={() => setSelectedPrice('free')}
                        />
                        <span className="ml-2">Free</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="price" 
                          className="text-primary focus:ring-primary"
                          checked={selectedPrice === '1-99'}
                          onChange={() => setSelectedPrice('1-99')}
                        />
                        <span className="ml-2">$1 - $99</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="price" 
                          className="text-primary focus:ring-primary"
                          checked={selectedPrice === '100-299'}
                          onChange={() => setSelectedPrice('100-299')}
                        />
                        <span className="ml-2">$100 - $299</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="price" 
                          className="text-primary focus:ring-primary"
                          checked={selectedPrice === '300+'}
                          onChange={() => setSelectedPrice('300+')}
                        />
                        <span className="ml-2">$300+</span>
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    className="btn-primary w-full"
                    onClick={() => {
                      // Reset all filters
                      setSelectedCategory('');
                      setSelectedDate('');
                      setSelectedPrice('');
                      setSearchTerm('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Events List */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="heading-md">
                  {isLoading ? 'Loading events...' : `${filteredEvents.length} ${filteredEvents.length === 1 ? 'Event' : 'Events'} ${searchTerm ? `for "${searchTerm}"` : ''}`}
                </h2>
                <div className="flex items-center">
                  <span className="mr-2 text-muted-foreground">Sort by:</span>
                  <select className="border border-input bg-background rounded-md p-2">
                    <option value="relevance">Relevance</option>
                    <option value="date_asc">Date (Earliest)</option>
                    <option value="date_desc">Date (Latest)</option>
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="price_desc">Price (High to Low)</option>
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-20">
                      <h3 className="heading-md mb-2">No events found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
              {filteredEvents.length > 0 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center space-x-2">
                    <button className="p-2 rounded-md border border-input hover:bg-muted">
                      <span className="sr-only">Previous</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="px-4 py-2 text-white bg-primary rounded-md">1</button>
                    <button className="px-4 py-2 hover:bg-muted rounded-md">2</button>
                    <button className="px-4 py-2 hover:bg-muted rounded-md">3</button>
                    <span className="px-2">...</span>
                    <button className="px-4 py-2 hover:bg-muted rounded-md">8</button>
                    <button className="p-2 rounded-md border border-input hover:bg-muted">
                      <span className="sr-only">Next</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;
