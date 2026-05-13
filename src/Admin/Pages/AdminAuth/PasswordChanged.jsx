import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import { FiCheckCircle } from "react-icons/fi";

export default function PasswordChanged() {
  return (
    <AuthContainer>
      <div className="mb-8 text-center flex flex-col items-center">
        
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Password Updated!
        </h3>
        <p className="text-sm text-gray-400 mt-3">
          Your password has been successfully reset. You can now use your new password to log in.
        </p>
      </div>

      <Link to="/admin/login" className="block w-full">
        <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all">
          Back to Login
        </button>
      </Link>
    </AuthContainer>
  );
}