import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';

const AuthInitializer = ({ children }) => {
  const { token, setToken, getCurrentUser } = useAuthStore();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken({ token: savedToken });
      getCurrentUser();
    }
  }, [setToken, getCurrentUser]);

  return children;
};

export default AuthInitializer;