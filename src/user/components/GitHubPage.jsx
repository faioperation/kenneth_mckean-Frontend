import { useState } from "react";
import { Github, X } from "lucide-react";

export default function GitHubPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-1 bg-white min-h-[70vh] lg:min-h-screen">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6">

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
          GitHub
        </h1>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            {/* Left */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-gray-100 shrink-0">
                <Github className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
              </div>

              <div>
                <p className="text-gray-800 font-medium text-sm sm:text-base lg:text-lg">
                  Once your site is published
                </p>
                <p className="text-gray-500 text-xs sm:text-sm break-words">
                  Connect your GitHub account to manage repositories and workflows.
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-4 sm:px-6 py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-900 transition w-full sm:w-auto cursor-pointer"
            >
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          {/* Prevent close when clicking inside modal */}
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-5">
              <h2 className="text-lg sm:text-xl font-semibold">
                Connect GitHub
              </h2>

              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full border flex items-center justify-center">
                  <Github size={28} />
                </div>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Access, search, and organize repos, track issues,
                review pull requests, and automate workflows directly.
              </p>

              <button className="bg-black text-white px-6 py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-900 transition w-full">
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}