import React, { useState } from "react";

export default function AdminAuth() {
  const [screen, setScreen] = useState("login");

  const Container = ({ children }) => (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
      <div className="bg-[#111827] w-[380px] p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-center text-xl font-semibold mb-6 text-blue-400">
          Algorithms AI
        </h2>
        {children}
      </div>
    </div>
  );

  // LOGIN
  if (screen === "login") {
    return (
      <Container>
        <h3 className="text-center text-lg mb-6">Login to Account</h3>

        <input
          type="email"
          placeholder="Email address"
          className="w-full mb-4 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
        />

        <div className="text-right text-sm mb-4">
          <button
            onClick={() => setScreen("forgot")}
            className="text-blue-400 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          onClick={() => setScreen("changed")}
          className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </Container>
    );
  }

// FORGOT PASSWORD
if (screen === "forgot") {
  return (
    <Container>
      <h3 className="text-center text-lg mb-6">Forgot Password?</h3>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full mb-6 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
      />

      <button
        onClick={() => setScreen("otp")}   // 👈 এখানে change
        className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Send OTP
      </button>
    </Container>
  );
}

// OTP SCREEN
if (screen === "otp") {
  return (
    <Container>
      <h3 className="text-center text-lg mb-2">Enter Verification Code</h3>
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

      <button
        onClick={() => setScreen("new")}
        className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Verify OTP
      </button>

      <div className="text-center mt-4">
        <button
          onClick={() => setScreen("forgot")}
          className="text-blue-400 text-sm hover:underline"
        >
          Resend Code
        </button>
      </div>
    </Container>
  );
}

  // NEW PASSWORD
  if (screen === "new") {
    return (
      <Container>
        <h3 className="text-center text-lg mb-6">Set New Password</h3>

        <input
          type="password"
          placeholder="New password"
          className="w-full mb-4 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full mb-6 px-4 py-2 bg-[#1f2937] rounded-lg outline-none"
        />

        <button
          onClick={() => setScreen("changed")}
          className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </Container>
    );
  }

  // PASSWORD CHANGED
  if (screen === "changed") {
    return (
      <Container>
        <h3 className="text-center text-lg mb-6 text-green-400">
          Password Updated Successfully!
        </h3>

        <button
          onClick={() => setScreen("login")}
          className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Login
        </button>
      </Container>
    );
  }
}