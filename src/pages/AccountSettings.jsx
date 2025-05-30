import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const AccountSettings = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthStore();

    
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/');
        return;
      }
      
   
    }, [isAuthenticated, navigate,]);
  return (
    <div>AccountSettings</div>
  )
}

export default AccountSettings