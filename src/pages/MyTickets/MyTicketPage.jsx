
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TicketList from './components/TicketList';
import HeroSection from './components/HeroSection';
import TicketModal from './components/TicketModal';
import useTicketStore from '@/store/useTicketStore';
import useAuthStore from '@/store/authStore';

const MyTicketsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const { upcomingTickets, pastTickets, fetchUserTickets, isLoading } = useTicketStore();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserTickets();
    }
  }, [fetchUserTickets, isAuthenticated]);

  // Filter tickets based on status and search term
  const filteredTickets = (activeTab === 'upcoming' ? upcomingTickets : pastTickets).filter(ticket => 
    (ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     ticket.eventLocation.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <HeroSection />
        
        <TicketList
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          tickets={filteredTickets}
          isLoading={isLoading}
          onSelectTicket={setSelectedTicket}
        />

        {selectedTicket && (
          <TicketModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            activeTab={activeTab}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MyTicketsPage;
