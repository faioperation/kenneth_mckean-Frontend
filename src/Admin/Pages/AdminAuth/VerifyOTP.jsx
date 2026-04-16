import AuthContainer from "./AuthContainer";

export default function VerifyOTP() {
  return (
    <AuthContainer>
      <h3 className="text-center text-lg mb-2">
        Enter Verification Code
      </h3>

      <p className="text-center text-xs text-gray-400 mb-6">
        We sent a 6-digit code to your email
      </p>

      <div className="flex justify-between mb-6">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            className="w-10 h-10 text-center bg-[#1f2937] rounded-lg outline-none text-lg"
          />
        ))}
      </div>

      {/* navigate("/auth/reset") */}
      <button className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
        Verify OTP
      </button>

      <div className="text-center mt-4">
        {/* navigate("/auth/forgot") */}
        <button className="text-blue-400 text-sm hover:underline">
          Resend Code
        </button>
      </div>
    </AuthContainer>
  );
}