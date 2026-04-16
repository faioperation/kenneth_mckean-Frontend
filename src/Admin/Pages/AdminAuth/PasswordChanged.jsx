import { Link } from "react-router";
import AuthContainer from "./AuthContainer";

export default function PasswordChanged() {
  return (
    <AuthContainer>
      <h3 className="text-center text-lg mb-6 text-green-400">
        Password Updated Successfully!
      </h3>

     <Link to="/admin/login">
      <button className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
        Back to Login
      </button>
      </Link>
    </AuthContainer>
  );
}