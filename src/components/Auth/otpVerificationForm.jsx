import React,{ useState, useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function OTPForm({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  const isLoading = useAuthStore((state) => state.isLoading);
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const resendOtp = useAuthStore((state) => state.resendOtp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await verifyOtp(email, otp);
    if (success) onVerified();
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    const sent = await resendOtp(email);
    if (sent) setResendTimer(60);
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-2xl shadow-md w-full max-w-md">
      <p className="text-sm text-gray-600">
        Enter the OTP sent to <strong className="text-gray-800">{email}</strong>
      </p>

      <Input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
      />

      <Button
        disabled={isLoading}
        className="w-full py-2 rounded-xl text-white bg-[hsl(266,35%,23%)] hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        type="submit"
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>

      <div className="text-sm text-center text-gray-500">
        {resendTimer > 0 ? (
          <span>Resend available in <span className="font-medium">{resendTimer}s</span></span>
        ) : (
          <button
            onClick={handleResend}
            type="button"
            className="text-primary hover:underline disabled:opacity-50"
          >
            Resend OTP
          </button>
        )}
      </div>
    </form>
  );
}

export default OTPForm;
