
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OtpVerificationForm from './otpVerificationForm';
import { X } from 'lucide-react';
import { toast } from 'sonner';

const AuthModal = ({ isOpen, onOpenChange, defaultView = 'login' }) => {
  const [view, setView] = useState(defaultView);

  const [signupEmail, setSignupEmail] = useState(null);
  
  // Reset view when modal opens with a specific defaultView
  useEffect(() => {
    if (isOpen) {
      setView(defaultView);
    }
  }, [isOpen, defaultView]);

  const handleLoginSuccess = () => {
    onOpenChange(false);
    toast.success('Successfully logged in!');
  };

  const handleSignupSuccess = (email) => {
    // onOpenChange(false);
    // toast.success('Account created successfully!');
    setSignupEmail(email);       // Store the email for OTP
    setView('otp'); 
  };

  const handleOtpSuccess = () => {
    onOpenChange(false);
    toast.success('Email verified successfully!Log in to continue');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-lg border-0 shadow-xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-center text-2xl  font-playfair font-bold text-primary">
            {/* {view === 'login' ? 'Welcome Back' : 'Create Account'} */}
            {view === 'login'
              ? 'Welcome Back'
              : view === 'signup'
              ? 'Create Account'
              : 'Verify Email'}
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-full   transition-opacity hover:opacity-100 focus:outline-none focus:ring-2  focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 " />
            {/* <span className="sr-only">Close</span> */}
          </button>
        </DialogHeader>
        
        {/* <div className="p-6">
          {view === 'login' ? (
            <LoginForm 
              onSuccess={handleLoginSuccess} 
              onRegisterClick={() => setView('signup')} 
            />
          ) : (
            <SignupForm 
              onSuccess={handleSignupSuccess} 
              onLoginClick={() => setView('login')} 
            />
          )}
        </div> */}
        <div className="p-6">
          {view === 'login' && (
            <LoginForm 
              onSuccess={handleLoginSuccess} 
              onRegisterClick={() => setView('signup')} 
            />
          )}
          {view === 'signup' && (
            <SignupForm 
              onSuccess={(email) => handleSignupSuccess(email)} 
              onLoginClick={() => setView('login')} 
            />
          )}
          {view === 'otp' && signupEmail && (
            <OtpVerificationForm 
              email={signupEmail} 
              onVerified={handleOtpSuccess} 
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
