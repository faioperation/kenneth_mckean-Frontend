import { Database } from "lucide-react";

const DatabaseEmptyState = () => {
  return (
    <div className="w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      
      <div className="text-center w-full max-w-sm sm:max-w-md md:max-w-lg">
        
        {/* Icon */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
                          flex items-center justify-center 
                          rounded-full border border-gray-300 
                          bg-white shadow-sm">
            <Database 
              size={24} 
              className="text-gray-600 sm:w-7 sm:h-7 md:w-8 md:h-8" 
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
          No Database connected
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 sm:mb-8 leading-relaxed px-2">
          Let Manus create and connect one for your website to store data,
          power dynamic content, and more.
        </p>

        {/* Button */}
        <button className="w-full sm:w-auto bg-black text-white 
                           px-5 sm:px-6 md:px-8 
                           py-2.5 sm:py-3 
                           rounded-lg text-sm sm:text-base md:text-lg 
                           hover:opacity-90 transition duration-200">
          Connect Database
        </button>

      </div>
    </div>
  );
};

export default DatabaseEmptyState;