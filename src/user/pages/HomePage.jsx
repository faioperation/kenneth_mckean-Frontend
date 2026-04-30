import { useState } from "react";
import VideoComponents from "../components/homepageComponent/VideoComponents";
import {
  Globe,
  ImagePlus,
  Code2,
  LayoutDashboard,
  Smartphone,
  Palette,
  Loader,
} from "lucide-react";
import { FaArrowUp, FaLink } from "react-icons/fa";
import { FiMic } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const features = [
  {
    id: 1,
    title: "Create Slides",
    desc: "Generate presentation-ready slides",
    icon: Code2,
  },
  {
    id: 2,
    title: "Build Website",
    desc: "Build and deploy complete websites",
    icon: LayoutDashboard,
  },
  {
    id: 3,
    title: "Apps Develop",
    desc: "Develop scalable web and mobile apps",
    icon: Smartphone,
  },
  {
    id: 4,
    title: "Design",
    desc: "Create modern UI and illustrations",
    icon: Palette,
  },
];

const HomePage = () => {
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <VideoComponents />

      <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="text-center mt-10 sm:mt-12 lg:mt-[60px] font-inter font-semibold">
            <h2 className="text-base sm:text-lg text-gray max-w-md mx-auto">
              Hello, Akash!
            </h2>

            <p
              className="text-gray mt-2 mb-10 sm:mb-12 lg:mb-[60px] 
                   max-w-md sm:max-w-lg lg:max-w-xl 
                   text-xl sm:text-2xl lg:text-[32px] mx-auto"
            >
              How can I assist you today?
            </p>
          </div>
        </div>

        <div className="shadow-2xl border border-gray-100 rounded-[32px] p-4 sm:p-6 mb-12 bg-white max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div>✨</div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Create in anything...."
              className="text-lg font-normal text-black w-full resize-none focus:outline-none max-h-40 pt-1"
            />
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
              <div className="p-3 border border-gray-200 rounded-full cursor-pointer text-black hover:bg-gray-50">
                <FaLink size={18} />
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm font-medium text-gray-600">
                <Globe size={16} />
                <span className="whitespace-nowrap">Search web</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm font-medium text-gray-600">
                <ImagePlus size={16} />
                <span className="whitespace-nowrap">Create Image</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-1 sm:p-3 border text-black border-gray-200 rounded-full cursor-pointer hover:bg-gray-50">
                <FiMic size={18} />
              </div>

              <button
                onClick={() => setOpenModal(true)}
                className="p-4 bg-black rounded-full text-white hover:scale-105 active:scale-95 transition"
              >
                <FaArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto pb-10">
          {features.map((item) => (
            <div
              key={item.id}
              className="border border-gray-100 rounded-3xl p-6 bg-white hover:shadow-lg transition cursor-pointer group"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-2xl mb-6 text-black group-hover:bg-black group-hover:text-white transition">
                <item.icon size={24} />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center">
            <h3 className="text-lg text-blue-400 font-semibold mb-4">
              Want to get started?{" "}
              <span className="text-gray-600 text-sm underline mb-6">
                Sign in first to continue..
              </span>
            </h3>

            <button
              onClick={() => navigate("/auth/signin")}
              className="px-6 py-2 bg-black text-white rounded-full hover:opacity-90"
            >
              Go to Sign In →
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="block mt-4 text-sm text-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
