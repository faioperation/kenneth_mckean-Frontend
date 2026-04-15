import { useState } from "react";
import AuthContainer from "./AuthContainer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <AuthContainer>
      <h3 className="text-center text-lg mb-6">Forgot Password?</h3>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-6 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
      />

      {/* navigate("/auth/otp") */}
      <button className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
        Send OTP
      </button>
    </AuthContainer>
  );
}