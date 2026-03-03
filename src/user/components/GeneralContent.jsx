import { FiEdit2, FiGlobe } from "react-icons/fi";

export default function GeneralContent() {
  return (
    <div className="max-w-3xl mx-auto py-2">

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        General
      </h1>

      {/* Website Name Card */}
      <div className="bg-white border rounded-xl p-4 sm:p-5 mb-8 shadow-sm border-gray-200">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <FiGlobe className="text-gray-500 text-lg sm:text-xl" />
            <span className="font-medium text-gray-800 text-sm sm:text-base">
              Website Name
            </span>
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <FiEdit2 className="text-gray-500 text-base sm:text-lg" />
          </button>

        </div>
      </div>

      {/* Published & Access */}
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
        Published & Access
      </h2>

      <div className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm border-gray-200">
        
        {/* Top Section */}
        <div className="mb-5">
          <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
            Domains
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Your website has not been publicly launched yet and can only
            be accessed by you through the preview link.
          </p>
        </div>

        <hr className="my-4 text-gray-200" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div>
            <p className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
              Domains
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
              <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
              Not published
            </div>
          </div>

          <button className="w-full sm:w-auto bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
            Publish
          </button>

        </div>

      </div>

    </div>
  );
}