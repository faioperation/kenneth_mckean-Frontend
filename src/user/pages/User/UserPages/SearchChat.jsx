import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router";

export default function SearchChat({onClose}) {
  const [query, setQuery] = useState("");

  const items = [
    {
      title: "Create a hiring post design",
      desc: "Create a hiring post design",
    },
    {
      title: "Create a Travel Website",
      desc: "Create a Travel Website",
    },
    {
      title: "Create a Social media design",
      desc: "Create a Social media design",
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 relative">
        
        {/* Close Button */}
      <Link to="/user/newtask">  <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button></Link>

        {/* Search Input */}
        <div className="flex items-center border-b pb-3 mb-4">
          <FiSearch className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* Results */}
        <div className="space-y-4 max-h-72 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  🎨
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 text-center">
              No results found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}