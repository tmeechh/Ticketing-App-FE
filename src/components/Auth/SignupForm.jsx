import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const SignupForm = ({ onSuccess, onLoginClick }) => {
  const [roles, setRole] = useState(null); // null → not selected yet
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { register, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password' || name === 'confirmPassword') setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const { fullName, email, password } = formData;
    const success = await register({ fullName, email, password, roles: [roles] });

    if (success && onSuccess) {
      onSuccess(email);
    }
  };

  // Step 1: Role selector
  if (!roles) {
    return (
      <div className="space-y-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800">Join as</h3>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setRole('user')}
            className="bg-gray-100 hover:bg-gray-200 text-black cursor-pointer py-2 px-4 rounded-md border border-gray-300"
          >
           Guest
          </button>
          <button
            onClick={() => setRole('organizer')}
            className="bg-[hsl(266,35%,23%)] hover:bg-[hsl(266,35%,20%)] cursor-pointer text-white py-2 px-4 rounded-md"
          >
            Organizer
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Signup form
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-sm text-gray-500 text-center mb-2">
        Signing up as <span className="font-medium text-primary">{roles === 'organizer' ? 'Organizer' : 'Ticket Buyer'}</span>
        <button onClick={() => setRole(null)} type="button" className="ml-2 text-xs underline cursor-pointer text-gray-400 hover:text-gray-600">
          Change
        </button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="fullName"
          type="text"
          placeholder="John Doe"
          required
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {passwordError && (
          <p className="text-sm text-red-500 mt-1">{passwordError}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-[hsl(266,35%,23%)] hover:bg-primary/90 cursor-pointer text-white font-semibold rounded-md h-11 mt-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : 'Create Account'}
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            className="text-primary font-semibold hover:text-primary/80 hover:underline"
            onClick={onLoginClick}
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
