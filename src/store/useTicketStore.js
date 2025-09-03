import { create } from 'zustand';
import axios from '@/lib/axiosConfig';
import { toast } from 'sonner';

const useTicketStore = create((set, get) => ({
  tickets: [],
  upcomingTickets: [],
  pastTickets: [],
  isLoading: false,
  error: null,

  // Fetch user tickets
  fetchUserTickets: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get('/tickets/my-tickets');
     const tickets = response.data.tickets || [];


    const today = new Date();
    const upcoming = tickets.filter(
      (ticket) => new Date(ticket.event.date) >= today // 👈 note: event.date not eventDate
    );
    const past = tickets.filter(
      (ticket) => new Date(ticket.event.date) < today
    );


      set({
        tickets,
        upcomingTickets: upcoming,
        pastTickets: past,
        isLoading: false,
      });

      return tickets;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Failed to fetch tickets',
      });

      toast.error('Failed to load tickets. Please try again later.');
      return [];
    }
  },

  // Buy ticket
  buyTicket: async (eventId, ticketType, quantity) => {
    set({ isLoading: true });
    try {
      const response = await axios.post('/tickets/buy', {
        eventId,
        ticketType,

        quantity,
      });

      // This might return a payment link or ticket info
      set({ isLoading: false });

      // toast.success('Your ticket purchase is being processed');
      if (response.data.paymentLink) {
        // Redirect directly to Paystack checkout
        window.location.href = response.data.paymentLink;
      }
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Failed to purchase ticket',
      });

      toast.error(error.response?.data?.message || 'Failed to purchase ticket');
      return null;
    }
  },

  // Verify ticket payment
  verifyPayment: async (reference) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `/tickets/verify?reference=${reference}`
      );
      set({ isLoading: false });

      if (response.data.success) {
        toast.success('Payment verified successfully!');
        // Refresh tickets after verification
        get().fetchUserTickets();
      } else {
        toast.error('Payment verification failed');
      }

      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Payment verification failed',
      });

      toast.error(
        error.response?.data?.message || 'Payment verification failed'
      );
      return null;
    }
  },

  // Request refund
  requestRefund: async (ticketId) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/tickets/refund/${ticketId}`);

      // Update tickets list after refund
      await get().fetchUserTickets();

      set({ isLoading: false });
     toast.success(response.data?.message || 'Refund processed successfully');

      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Failed to process refund',
      });

      toast.error(error.response?.data?.message || 'Failed to process refund');
      return null;
    }
  },
}));

export default useTicketStore;
