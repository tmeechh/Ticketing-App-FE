import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import useEventStore from '@/store/useEventStore';
import { Loader } from 'lucide-react';

const FeaturedEvents = () => {
  const { fetchEvents, featuredEvents, isLoading } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <section className="section-container">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h5 className="text-accent text-amber-500 font-medium tracking-wider uppercase mb-2">
            Featured Events
          </h5>
          <h2 className="heading-lg">Handpicked Events for You</h2>
        </div>
        <Link to="/events" className="btn-outline mt-4 md:mt-0">
          View All Events
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : featuredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="heading-md mb-4">No Featured Events</h3>
          <p className="text-muted-foreground mb-6">
            Check back later for our featured events lineup.
          </p>
          <Link to="/events" className="btn-primary">
            Browse All Events
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedEvents;
