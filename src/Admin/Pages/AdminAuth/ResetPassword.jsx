import { useState } from "react";
import AuthContainer from "./AuthContainer";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <AuthContainer>
      <h3 className="text-center text-lg mb-6">Set New Password</h3>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full mb-6 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
      />

      {/* navigate("/auth/success") */}
      <button className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
        Reset Password
      </button>
    </AuthContainer>
  );
}