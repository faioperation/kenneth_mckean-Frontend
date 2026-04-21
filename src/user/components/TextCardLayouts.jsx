import SparkleIcon from "../../assets/icons/SparkleIcon";
import { FaArrowUp, FaLink } from "react-icons/fa6";
import {
  Globe,
  ImagePlus,
  Code2,
  LayoutDashboard,
  Smartphone,
  Palette,
} from "lucide-react";
import { FiMic } from "react-icons/fi";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../api/taskApi"; // ✅ import
import { useTask } from "../../context/TaskContext"; // ✅ import context
import { Loader } from "lucide-react"; // ✅ import loader

const features = [
  {
    id: 1,
    title: "Create Slides",
    desc: "Generate presentation-ready slides from your ideas",
    icon: Code2,
  },
  {
    id: 2,
    title: "Build Website",
    desc: "Build and deploy complete websites instantly",
    icon: LayoutDashboard,
  },
  {
    id: 3,
    title: "Apps Develop",
    desc: "Develop scalable web and mobile applications",
    icon: Smartphone,
  },
  {
    id: 4,
    title: "Design",
    desc: "Create modern UI, illustration and graphic designs",
    icon: Palette,
  },
];

const TextCardLayouts = () => {
  const textareaRef = useRef(null);
  const [prompt, setPrompt] = useState(""); // ✅ state add
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setTasks, setCurrentPrompt, setCurrentTask } = useTask(); // ✅ get context functions

  const handleInput = (e) => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";

    setPrompt(e.target.value); // ✅ save prompt
  };

  const handleClick = async () => {
    console.log("Prompt hitting from task card layout:", prompt);
    if (!prompt.trim()) return; // ❌ empty prevent

    try {
      console.log("Prompt hitting from try block:", prompt);
      setLoading(true);
      console.log("Prompt hitting after loading:", prompt);

      // ✅ Store prompt immediately
      setCurrentPrompt(prompt);
      
      // ✅ Navigate immediately (don't wait for API response)
      navigate("/user/newtask/dashboard");

      // ✅ Call API in background (fire and forget)
      createTask({
        prompt: prompt, // ✅ API payload
      })
        .then((res) => {
          console.log("Creating task with prompt:", prompt);
          console.log("Task created response:", res);

          // Store the task data when response comes back
          if (res) {
            console.log("Response received:", res);
            console.log("Response taskId:", res.taskId);
            
            setTasks((prev) => [res, ...prev]);
            setCurrentTask(res); // ✅ Store current task for dashboard
            
            console.log("Task stored in context successfully");
          } else {
            console.warn("No response received:", res);
          }
        })
        .catch((error) => {
          console.error("Create task error:", error);
        })
        .finally(() => {
          setLoading(false);
        });

    } catch (error) {
      console.error("Navigation error:", error);
      alert("Error: " + (error.message || "Unknown error"));
      setLoading(false);
    }
  };

  return (
    <div className="font-inter max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
      {/* Loading Status */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
          <Loader className="text-blue-600 animate-spin" size={20} />
          <div>
            <p className="text-blue-900 font-semibold">Creating your task...</p>
            <p className="text-blue-700 text-sm">This may take 2-3 minutes. Please wait.</p>
          </div>
        </div>
      )}

      {/* Top Section */}
      <div className="shadow border border-gray-200 rounded-2xl p-4 sm:p-6 mb-8 bg-white">
        <div className="flex items-start gap-3">
          <SparkleIcon />
          <textarea
            ref={textareaRef}
            onChange={handleInput} // ✅ change
            placeholder="Create in anything...."
            className="text-base sm:text-lg font-normal text-black w-full resize-none focus:outline-none max-h-40 overflow-y-auto scrollbar-hide"
          />
        </div>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="size-[38px] sm:size-[42px] border border-gray-400 rounded-full flex items-center justify-center">
              <FaLink className="text-black text-sm sm:text-base" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 sm:px-5 h-10 sm:h-11 rounded-full border border-gray-300">
                <Globe size={16} className="text-gray-600" />
                <span className="text-sm sm:text-[15px] text-gray-700">
                  Search in web
                </span>
              </button>

              <button className="flex items-center gap-2 px-4 sm:px-5 h-10 sm:h-11 rounded-full border border-gray-300">
                <ImagePlus size={16} className="text-gray-600" />
                <span className="text-sm sm:text-[15px] text-gray-700">
                  Create on Image
                </span>
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="size-[38px] sm:size-[42px] border border-gray-400 rounded-full flex items-center justify-center">
              <FiMic className="text-black text-sm sm:text-base" />
            </div>

            <button
              onClick={handleClick}
              disabled={loading}
              className={`size-[38px] sm:size-[42px] bg-black rounded-full flex items-center justify-center ${loading ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
              title={loading ? "Processing... This may take 2-3 minutes" : "Create"}
            >
              {loading ? (
                <Loader className="text-white text-sm sm:text-base animate-spin" />
              ) : (
                <FaArrowUp className="text-white text-sm sm:text-base" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards (unchanged) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-[300px]">
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl p-4 sm:p-5 bg-white hover:shadow-lg transition duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-4">
                <Icon className="text-gray-600 text-lg" />
              </div>

              <h4 className="font-semibold text-base sm:text-lg text-black mb-2">
                {item.title}
              </h4>

              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextCardLayouts;