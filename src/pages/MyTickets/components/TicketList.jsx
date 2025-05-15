
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader } from 'lucide-react';
import TicketCard from './TicketCard';

const TicketList = ({ 
  activeTab, 
  setActiveTab, 
  searchTerm, 
  setSearchTerm, 
  tickets, 
  isLoading, 
  onSelectTicket 
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        {/* Tabs */}
        <div className="flex border border-muted rounded-lg overflow-hidden bg-white shadow-sm mb-4 md:mb-0">
          <button
            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'upcoming' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'past' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            onClick={() => setActiveTab('past')}
          >
            Past Events
          </button>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full border border-input rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Tickets List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map(ticket => (
              <TicketCard 
                key={ticket.id} 
                ticket={ticket} 
                onSelect={onSelectTicket} 
              />
            ))}
          </div>
        ) : (
          <EmptyTicketsState 
            searchTerm={searchTerm} 
            activeTab={activeTab} 
            onClearSearch={() => setSearchTerm('')} 
          />
        )
      )}
    </div>
  );
};

const EmptyTicketsState = ({ searchTerm, activeTab, onClearSearch }) => {
  return (
    <div className="text-center py-12 premium-card">
      {searchTerm ? (
        <>
          <h3 className="heading-md mb-2">No tickets found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search term</p>
          <button
            className="btn-outline"
            onClick={onClearSearch}
          >
            Clear Search
          </button>
        </>
      ) : activeTab === 'upcoming' ? (
        <>
          <h3 className="heading-md mb-2">No Upcoming Events</h3>
          <p className="text-muted-foreground mb-6">You don't have any upcoming events. Browse events to purchase tickets.</p>
          <Link to="/events" className="btn-primary">
            Browse Events
          </Link>
        </>
      ) : (
        <>
          <h3 className="heading-md mb-2">No Past Events</h3>
          <p className="text-muted-foreground">Your past events history will appear here.</p>
        </>
      )}
    </div>
  );
};

export default TicketList;
