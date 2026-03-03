export default function DomainsPage() {
  return (
    <div className="flex-1 bg-white min-h-[70vh] lg:min-h-screen">
      
      {/* Container */}
      <div className="max-w-3xl mx-auto w-full">
        
        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
          Domains
        </h1>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
          
          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
            Once your site is published you can manage your default
            subdomain and connect custom domains.
          </p>

          {/* Button */}
          <button className="bg-black text-white px-6 py-3 rounded-xl text-sm sm:text-base font-medium hover:bg-gray-900 transition duration-200 w-full sm:w-auto">
            Publish your site to get started
          </button>

        </div>
      </div>
    </div>
  );
}