import { Folder } from "lucide-react";

const FileStorageEmptyState = () => {
  return (
    <div className="w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen 
                    flex items-center justify-center 
                    bg-white px-4 sm:px-6 lg:px-8">
      
      <div className="text-center w-full max-w-xs sm:max-w-md md:max-w-lg">
        
        {/* Icon */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
                          flex items-center justify-center">
            <Folder 
              className="text-gray-700 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-sm sm:text-lg md:text-xl font-semibold 
                       text-gray-800 mb-2 sm:mb-3">
          File Storage not enabled
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base 
                      text-gray-500 mb-6 sm:mb-8 
                      leading-relaxed px-2">
          Enable File Storage to save files created on your website
          or uploaded by users.
        </p>

        {/* Button */}
        <button className="w-full sm:w-auto 
                           bg-black text-white 
                           px-5 sm:px-6 md:px-8 
                           py-2.5 sm:py-3 
                           rounded-lg 
                           text-xs sm:text-sm md:text-base 
                           hover:opacity-90 transition duration-200">
          Ask Algoridom ai to enable File Storage
        </button>

      </div>
    </div>
  );
};

export default FileStorageEmptyState;