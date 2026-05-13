import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { apiPost } from "../../../lib/api";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only number

    const newOtp = [...otp];
    // Take only the last character in case they type fast
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace properly to go to the previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 6);
    
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const focusIndex = Math.min(pastedData.length, 5);
    const focusInput = document.getElementById(`otp-${focusIndex}`);
    if (focusInput) focusInput.focus();
  };

  const handleVerify = async (e) => {
    e?.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await apiPost("/admin/auth/verify", {
        otp: otpValue,
        email,
      });

      toast.success(res?.message || "OTP verified");

      navigate("/admin/reset-password", {
        state: {
          token: res.data.resetToken,
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Invalid OTP";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    navigate("/admin/forgot-password");
    return;
  };

  return (
    <AuthContainer>
      <div className="mb-8 text-center relative">
        
        <h3 className="text-2xl font-bold text-[#4D81F5] tracking-tight">Verify Code</h3>
        <p className="text-sm text-gray-400 mt-2">
          We sent a 6-digit code to <br/>
          <span className="font-medium text-gray-300">{email || "your email"}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-8">
        <div 
          className="flex justify-between gap-2 sm:gap-3"
          onPaste={handlePaste}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center bg-[#1f2937] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-2xl font-semibold shadow-sm"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify OTP"
          )}
        </button>

        <div className="text-center mt-6">
          <span className="text-gray-400 text-sm">Didn't receive the code? </span>
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-400 text-sm font-medium hover:text-blue-300 hover:underline transition-colors"
          >
            Resend Code
          </button>
        </div>
      </form>
    </AuthContainer>
  );
}
