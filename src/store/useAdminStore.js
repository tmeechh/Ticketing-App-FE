// src/store/adminStore.js
import { create } from "zustand";
import axios from "@/lib/axiosConfig";
import { toast } from "sonner";

const useAdminStore = create((set, get) => ({
  users: [],
  events: [],
  tickets: [],
  isLoading: false,
  error: null,

  // =============================
  // USERS
  // =============================
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/admin/users");
      set({ users: response.data.data.users, isLoading: false });
      return response.data.data.users;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch users",
      });
      toast.error(error.response?.data?.message || "Failed to fetch users");
      return [];
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(`/admin/users/${id}`);
      const { users } = get();
      set({ users: users.filter((u) => u._id !== id), isLoading: false });
   toast.success(response.data.message || "User deleted successfully!");
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete user",
      });
      toast.error(error.response?.data?.message || "Failed to delete user");
      return false;
    }
  },

  // =============================
  // EVENTS
  // =============================
  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/admin/events");
      set({ events: response.data.data.events, isLoading: false });
      return response.data.data.events;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch events",
      });
      toast.error(error.response?.data?.message || "Failed to fetch events");
      return [];
    }
  },

  deleteEvent: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(`/admin/events/${id}`);
      const { events } = get();
      set({ events: events.filter((e) => e._id !== id), isLoading: false });
     toast.success(response.data.message || "Event deleted successfully!");
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete event",
      });
      toast.error(error.response?.data?.message || "Failed to delete event");
      return false;
    }
  },

  // =============================
  // TICKETS
  // =============================
  fetchTickets: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/admin/tickets");
      set({ tickets: response.data.data.tickets, isLoading: false });
      return response.data.data.tickets;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch tickets",
      });
      toast.error(error.response?.data?.message || "Failed to fetch tickets");
      return [];
    }
  },

  deleteTicket: async (id) => {
    set({ isLoading: true });
    try {
     const response = await axios.delete(`/admin/tickets/${id}`);
      const { tickets } = get();
      set({ tickets: tickets.filter((t) => t._id !== id), isLoading: false });
     toast.success(response.data.message || "Ticket deleted successfully!");
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete ticket",
      });
      toast.error(error.response?.data?.message || "Failed to delete ticket");
      return false;
    }
  },
}));

export default useAdminStore;
