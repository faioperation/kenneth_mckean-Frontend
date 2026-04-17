import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { apiPost } from "../../../lib/api";
import toast from "react-hot-toast";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only number

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {
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
      <h3 className="text-center text-lg mb-2">Enter Verification Code</h3>

      <p className="text-center text-xs text-gray-400 mb-6">
        We sent a 6-digit code to your email
      </p>

      <div className="flex justify-between mb-6">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            className="w-10 h-10 text-center bg-[#1f2937] rounded-lg outline-none text-lg"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={isSubmitting}
        className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
      >
        {isSubmitting ? "Verifying..." : "Verify OTP"}
      </button>

      <div className="text-center mt-4">
        <button
          onClick={handleResend}
          className="text-blue-400 text-sm hover:underline"
        >
          Resend Code
        </button>
      </div>
    </AuthContainer>
  );
}
