import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function SecretsPage() {
  const [open, setOpen] = useState(false);
  const [secrets, setSecrets] = useState([
    { id: 1, name: "Secrets Name", value: "Value" },
  ]);

  return (
    <div className="flex-1 bg-white min-h-[70vh] lg:min-h-screen">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            Secrets
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-xl text-sm sm:text-base hover:bg-gray-900 transition w-full sm:w-auto cursor-pointer"
          >
            Add Secrets
          </button>
        </div>

        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
            {/* Modal Box */}
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Edit Website</h2>

                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-black text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Secret name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black "
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Value</label>
                  <textarea
                    placeholder="Enter text"
                    rows="3"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black resize-none "
                  />
                </div>

                {/* Button */}
                <div className="flex justify-end">
                  <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer">
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Secrets */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm mb-3">
          <h2 className="text-gray-700 font-medium mb-2 text-sm sm:text-base lg:text-lg">
            Application secrets
          </h2>

          {secrets.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="text-gray-800 font-medium text-sm sm:text-base">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-sm break-words">
                    {item.value}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button className="text-gray-600 hover:text-black">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="border-b mt-2"></div>
            </div>
          ))}

          <p className="text-xs sm:text-sm text-gray-500 mt-4 mb-5 leading-relaxed">
            You have unsaved changes, your change will only be updated in your
            application after you save
          </p>

          <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm sm:text-base hover:bg-gray-900 transition w-full sm:w-auto">
            Send and Apply
          </button>
        </div>

        {/* About Secrets */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
          <h2 className="text-gray-700 font-medium mb-4 text-sm sm:text-base lg:text-lg">
            About secrets
          </h2>

          <div className="space-y-5">
            <div>
              <h3 className="text-gray-800 font-medium text-sm sm:text-base mb-1">
                What are secrets?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Algorithms helps you integrate Stripe payments into your website
                so you can generate revenue from your services.
              </p>
            </div>

            <hr className="text-gray-200" />

            <div>
              <h3 className="text-gray-800 font-medium text-sm sm:text-base mb-2">
                Connect any third-party services with API Keys
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                Manus can connect any service with API keys, for example:
              </p>

              <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                <li>Stripe: for online payments</li>
                <li>OpenAI: to integrate powerful AI features</li>
                <li>Twilio: for sending SMS or emails</li>
              </ul>

              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                You can simply tell Manus what you want to achieve and let Manus
                tell you what to provide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
