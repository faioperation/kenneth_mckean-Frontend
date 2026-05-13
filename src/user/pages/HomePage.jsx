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
import { motion } from "framer-motion";

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

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mt-10 sm:mt-16 lg:mt-24 font-inter">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mb-4"
          >
            Hello, Friend!
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-900 font-semibold leading-tight text-2xl sm:text-4xl lg:text-5xl max-w-3xl mx-auto mb-12 lg:mb-16"
          >
            How can I assist you today?
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="shadow-xl sm:shadow-2xl border border-gray-100 rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 mb-12 bg-white max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="pt-1 text-xl">✨</div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Create in anything...."
              className="text-base sm:text-lg font-normal text-black w-full resize-none focus:outline-none min-h-[80px] max-h-40 pt-1"
            />
          </div>

          <div className="mt-4 sm:mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 sm:p-3 border border-gray-100 rounded-full cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-black transition-all"
              >
                <FaLink size={16} />
              </motion.div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 sm:p-3 border border-gray-100 rounded-full cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-black transition-all"
              >
                <FiMic size={18} />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenModal(true)}
                className="p-2.5 sm:p-3 bg-black rounded-full text-white hover:bg-gray-800 transition shadow-lg shadow-black/20"
              >
                <FaArrowUp size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto pb-10"
        >
          {features.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              className="border border-gray-100 rounded-3xl p-6 bg-white hover:border-gray-200 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-2xl mb-6 text-black group-hover:bg-black group-hover:text-white transition-colors">
                <item.icon size={24} />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
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
