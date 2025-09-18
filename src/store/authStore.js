import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '@/lib/axiosConfig';
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
          const response = await axios.post('/auth/signin', {
            email,
            password,
          });
          const { token, user, roles, isAdmin } = response.data.data;

          set({
            user,
            token,
            isAuthenticated: true,
            isAdmin,
            isLoading: false,
          });

          toast.success('Successfully logged in!');
          // return true;
          return { success: true, isAdmin, roles, user };
        } catch (error) {
          set({
            isLoading: false,
            error:
              error.response?.data?.message ||
              'Login failed. Please try again.',
          });

          toast.error(
            error.response?.data?.message || 'Login failed. Please try again.'
          );
          return false;
        }
      },

      // Register user
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post('/auth/signup', userData);
          toast.success('Registration successful! Please verify your email.');
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error:
              error.response?.data?.message ||
              'Registration failed. Please try again.',
          });

          toast.error(
            error.response?.data?.message ||
              'Registration failed. Please try again.'
          );
          return false;
        }
      },

      // Verify OTP
      verifyOtp: async (email, otp) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post('/auth/verify-otp', { email, otp });
          set({ isLoading: false });
          toast.success('Email verified successfully!');
          return true;
        } catch (error) {
          set({ isLoading: false });
          toast.error(
            error.response?.data?.message || 'OTP verification failed'
          );
          return false;
        }
      },

      // Resend OTP
      resendOtp: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await axios.post('/send-otp', { email });
          set({ isLoading: false });
          toast.success('OTP has been resent to your email');
          return true;
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || 'Failed to resend OTP');
          return false;
        }
      },

      // Logout user
      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });

        toast.info('You have been logged out');
      },

      // Get current user profile

      getCurrentUser: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get('/auth');
          set({
            user: response.data.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return response.data.data.user;
        } catch (error) {
          // Clear both state and localStorage on error
          set({
            isLoading: false,
            user: null,
            token: null,
            isAuthenticated: false,
          });
          localStorage.removeItem('token');
          localStorage.removeItem('auth-storage'); // Clear Zustand's persisted state
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
            error: error.response?.data?.message || 'Failed to process request',
          });

          toast.error(
            error.response?.data?.message || 'Failed to process request'
          );
          return false;
        }
      },

      // Reset password with OTP
      resetPassword: async (email, password, otp) => {
        set({ isLoading: true, error: null });
        try {
          await axios.post('/auth/reset-password', { email, password, otp });
          set({ isLoading: false });
          toast.success('Password has been reset successfully');
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Failed to reset password',
          });

          toast.error(
            error.response?.data?.message || 'Failed to reset password'
          );
          return false;
        }
      },
      updateProfile: async (data, isFormData = false) => {
        // set({ isLoading: true, error: null });
        try {
          const config = isFormData
            ? { headers: { 'Content-Type': 'multipart/form-data' } }
            : {};

          const response = await axios.patch('/auth', data, config);

          const updatedUser = response.data.data.user;

          set({
            user: updatedUser,
            // isLoading: false,
            error: null,
          });

          toast.success(
            response.data.message || 'Profile updated successfully'
          );
          return true;
        } catch (error) {
          set({
            // isLoading: false,
            error: error.response?.data?.message || 'Failed to update profile',
          });

          toast.error(
            error.response?.data?.message || 'Failed to update profile'
          );
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin, 
      }),
    }
  )
);

export default useAuthStore;
