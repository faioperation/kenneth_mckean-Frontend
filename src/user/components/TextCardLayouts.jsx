import SparkleIcon from "../../assets/icons/SparkleIcon";
import { FaArrowUp, FaLink } from "react-icons/fa6";
import { Globe, ImagePlus, Code2, LayoutDashboard, Smartphone, Palette } from "lucide-react";
import { FiMic } from "react-icons/fi";

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
  return (
    <div className="font-inter max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
      
      {/* Top Section */}
      <div className="shadow border border-gray-200 rounded-2xl p-4 sm:p-6 mb-8 bg-white">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <SparkleIcon />
          <h3 className="text-base sm:text-lg font-normal text-black">
            Create in anything....
          </h3>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
          
          {/* Left */}
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

            <div className="size-[38px] sm:size-[42px] bg-black rounded-full flex items-center justify-center">
              <FaArrowUp className="text-white text-sm sm:text-base" />
            </div>

          </div>
        </div>
      </div>

      {/* Feature Cards */}
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