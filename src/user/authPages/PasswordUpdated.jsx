import { Link } from "react-router";
import AuthNavbar from "./AuthNavbar";
import { useRef, useState } from "react";

const PasswordUpdated = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // next input focus
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter font-bold cursor-pointer">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <AuthNavbar
          title={"Password Updated Successfully!"}
          subTitle={
            "Create a new password. Ensure it differs from previous ones for security"
          }
        />
        <div className="flex justify-center gap-2 sm:gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 sm:w-12 sm:h-12 
                         border border-blue-400 
                         rounded-md 
                         text-center text-lg font-semibold 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <Link to={"/new-task"}>
          <button className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer mt-4">
            Continue New Task
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PasswordUpdated;
