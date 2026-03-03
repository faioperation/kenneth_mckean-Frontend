import { Github } from "lucide-react";

export default function GitHubPage() {
  return (
    <div className="flex-1 bg-white min-h-[70vh] lg:min-h-screen">
      <div className="max-w-3xl mx-auto w-full">

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
          GitHub
        </h1>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            {/* Left Content */}
            <div className="flex items-start sm:items-center gap-4">

              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-gray-100 shrink-0">
                <Github className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
              </div>

              {/* Text */}
              <div>
                <p className="text-gray-800 font-medium text-sm sm:text-base lg:text-lg">
                  Once your site is published
                </p>
                <p className="text-gray-500 text-xs sm:text-sm break-words">
                  Once your site is published
                </p>
              </div>
            </div>

            {/* Button */}
            <button className="bg-black text-white px-4 sm:px-6 py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-900 transition w-full sm:w-auto">
              Connect
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}