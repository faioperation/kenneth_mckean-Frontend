import { useState } from "react";
import { FiEdit2, FiGlobe, FiX } from "react-icons/fi";

export default function GeneralContent() {
  const [open, setOpen] = useState(false);

  return (
    <>
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

            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FiEdit2 className="text-gray-500 text-base sm:text-lg" />
            </button>

          </div>
        </div>

        {/* Published & Access */}
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Published & Access
        </h2>

        <div className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm border-gray-200">
          
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

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">
              Edit Website
            </h2>

            <div className="mb-5">
              <label className="block text-sm text-gray-600 mb-2">
                Website Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex justify-end">
              <button className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
                Save Name
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}