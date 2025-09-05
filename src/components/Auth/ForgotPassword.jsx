import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import useAuthStore from "@/store/authStore";

const ForgotPassword = ({ onBackToLogin, onSuccess }) => {
  const [step, setStep] = useState("request"); // request | reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { forgotPassword, resetPassword, isLoading } = useAuthStore();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const success = await forgotPassword(email);
    if (success) {
      setStep("reset");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const success = await resetPassword(email, newPassword, otp);
    if (success) {
      onSuccess?.(); // notify parent
      onBackToLogin(); // go back to login modal
    }
  };

  return (
    <div className="space-y-6">
      {step === "request" && (
        <form onSubmit={handleSendOtp} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-gray-300 focus:border-primary focus:ring-primary rounded-md"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[hsl(266,35%,23%)] hover:bg-primary/90 cursor-pointer text-white font-semibold rounded-md h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </Button>

          <p
            onClick={onBackToLogin}
            className="text-xs text-primary cursor-pointer hover:underline text-center"
          >
            Back to Login
          </p>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-11 border-gray-300 focus:border-primary focus:ring-primary rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="New password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-11 border-gray-300 focus:border-primary focus:ring-primary rounded-md"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[hsl(266,35%,23%)] cursor-pointer hover:bg-primary/90 text-white font-semibold rounded-md h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
