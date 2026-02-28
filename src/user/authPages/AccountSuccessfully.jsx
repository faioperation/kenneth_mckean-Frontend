import { Link } from "react-router";
import AuthNavbar from "./AuthNavbar";

const AccountSuccessfully = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-inter font-bold cursor-pointer">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <AuthNavbar title={"Account Create Successfully!"} />

        <Link to={"/new-task"}>
          <button className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer mt-4">
            Continue New Task
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AccountSuccessfully;
