import axios from 'axios';
import useAuthStore from '@/store/authStore'; // adjust the path if needed

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Optional: use if your backend sets cookies
});

// Attach token on each request using Zustand's token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout(); // Call Zustand logout to clean state
      console.warn('Unauthorized – token removed and user logged out.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
