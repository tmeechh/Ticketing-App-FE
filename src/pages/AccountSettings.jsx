import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    <div>
      <Navbar/> AccountSettings<Footer/></div>
  )
}

export default AccountSettings