
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '../lib/axiosConfig';
import { toast } from 'sonner';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Login user
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post('/auth/signin', { email, password });
          const { token, user } = response.data;
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          toast.success('Successfully logged in!');
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Login failed. Please try again.' 
          });
          
          toast.error(error.response?.data?.message || 'Login failed. Please try again.');
          return false;
        }
      },
      
      // Register user
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post('/auth/signup', userData);
          toast.success('Registration successful! Please log in.');
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Registration failed. Please try again.' 
          });
          
          toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
          return false;
        }
      },
      
      // Logout user
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
        
        toast.info('You have been logged out');
      },
      
      // Get current user profile
      getCurrentUser: async () => {
        const { token } = get();
        if (!token) return;
        
        set({ isLoading: true });
        try {
          const response = await axios.get('/auth');
          set({ 
            user: response.data, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return response.data;
        } catch (error) {
          set({ 
            isLoading: false, 
            user: null, 
            token: null, 
            isAuthenticated: false 
          });
          return null;
        }
      },
      
      // Reset password request
      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await axios.post('/auth/forgot-password', { email });
          set({ isLoading: false });
          toast.success('Password reset instructions sent to your email');
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Failed to process request' 
          });
          
          toast.error(error.response?.data?.message || 'Failed to process request');
          return false;
        }
      },
      
      // Reset password with OTP
      resetPassword: async (email, newPassword, otp) => {
        set({ isLoading: true, error: null });
        try {
          await axios.post('/auth/reset-password', { email, newPassword, otp });
          set({ isLoading: false });
          toast.success('Password has been reset successfully');
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Failed to reset password' 
          });
          
          toast.error(error.response?.data?.message || 'Failed to reset password');
          return false;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated })
    }
  )
);

export default useAuthStore;
