import { Globe, ImagePlus, LogOut, UserPlus } from "lucide-react";
import { useRef } from "react";
import { FaArrowUp, FaLink } from "react-icons/fa6";
import { FiMic } from "react-icons/fi";
import SparkleIcon from "../../assets/icons/SparkleIcon";
import { useLocation } from "react-router";
import { useTask } from "../../context/TaskContext";

const ChatPanel = () => {
  const location = useLocation();
  const textareaRef = useRef(null);
  const { currentPrompt, setCurrentPrompt } = useTask();

  const handleSend = () => {
    const value = textareaRef.current.value;

    if (!value.trim()) return;

    setCurrentPrompt(value);
    textareaRef.current.value = "";
  };

  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <main className="flex-1 flex flex-col h-screen p-3 sm:p-5 md:p-6 bg-gray-50">
      {/* Header */}
      {location.pathname === "/user/newtask/dashboard" && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-black">
            Algorithms Al
          </h2>

          <div className="flex gap-3 sm:gap-4">
            <button
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
            rounded-full border border-gray-300 
            bg-white shadow-sm 
            hover:bg-gray-100 transition"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>

            <button
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
            rounded-full border border-gray-300 
            bg-white shadow-sm 
            hover:bg-gray-100 transition"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Content */}
      {/* <div className="flex-1 overflow-y-auto text-gray-500 leading-6 sm:leading-7 pr-1 sm:pr-2 mt-6 text-sm sm:text-base">
        <p className="font-semibold text-black mb-4">Algorithms AI</p>
        <p className="w-auto">
          I'd love to help you create a travel website! To get started, could
          you please clarify a few details: What type of website do you have in
          mind? A static landing page (best for showcasing a specific
          destination or agency). A dynamic platform with features like user
          accounts, bookings, or a blog. Are there any specific features or
          sections you'd like to include? (e.g., destination guides, search bar,
          photo gallery, contact form). Do you have a preferred style or color
          scheme? If you're not sure, I can start with a modern, feature-rich
          travel landing page by default. Just let me know! I've successfully
          created a modern travel website featuring a stunning hero section with
          a mountain landscape, three featured destination sections (Tropical
          Paradise, Historic Wonders, Urban Adventures), a services section
          highlighting custom itineraries and expert guides, an interactive
          gallery, and a fully functional contact form. The design follows the
          Modern Minimalist + Wanderlust aesthetic with warm terracotta accents
          and sage green highlights, using Playfair Display for elegant headings
          and Inter for readable body text. Key Features: Responsive sticky
          navigation with smooth scrolling Full-width hero with parallax-ready
          background Asymmetric destination layouts with alternating image-text
          blocks Service cards with hover effects Image gallery with zoom
          animations Contact form with validation and toast notifications
          Professional footer with links and contact information Your website is
          ready to preview and publish!
        </p>
      </div> */}
      <div className="flex-1 overflow-y-auto text-gray-500 leading-6 sm:leading-7 pr-1 sm:pr-2 mt-6 text-sm sm:text-base">
        {currentPrompt ? (
          <>
            <p className="font-semibold text-black mb-4">You</p>
            <p className="mb-4 text-black">{currentPrompt}</p>

            <p className="font-semibold text-black mb-2">Algorithms AI</p>
            <p>Generating response...</p>
          </>
        ) : (
          <p className="text-gray-400">Start typing to create something...</p>
        )}
      </div>

      {/* Input */}
      <div className="shadow border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 bg-white">
        {/* Header */}
        <div className="flex items-start gap-3">
          <SparkleIcon className="w-5 h-5 flex-shrink-0" />
          <textarea
            ref={textareaRef}
            onInput={handleInput}
            placeholder="Create in anything...."
            className="text-sm sm:text-base md:text-lg font-normal text-black w-full resize-none focus:outline-none max-h-40 overflow-y-auto"
          />
        </div>

        {/* Controls */}
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="size-9 sm:size-10 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer">
              <FaLink className="text-sm sm:text-base text-black" />
            </button>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button className="flex items-center gap-2 px-3 sm:px-5 h-9 sm:h-11 rounded-full border border-gray-300 text-xs sm:text-sm cursor-pointer">
                <Globe size={15} className="text-gray-600" />
                <span className="hidden sm:inline text-gray-700">
                  Search in web
                </span>
              </button>

              <button className="flex items-center gap-2 px-3 sm:px-5 h-9 sm:h-11 rounded-full border border-gray-300 text-xs sm:text-sm cursor-pointer">
                <ImagePlus size={15} className="text-gray-600" />
                <span className="hidden sm:inline text-gray-700">
                  Create on Image
                </span>
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 sm:gap-4 self-end lg:self-auto text-black">
            <button className="size-9 sm:size-10 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer">
              <FiMic className="text-sm sm:text-base" />
            </button>

            <button
              onClick={handleSend}
              className="size-9 sm:size-10 bg-black rounded-full flex items-center justify-center cursor-pointer"
            >
              <FaArrowUp className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatPanel;
