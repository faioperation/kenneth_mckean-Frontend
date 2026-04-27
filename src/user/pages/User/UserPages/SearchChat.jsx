import React, { useState } from "react";
import { FiSearch, FiX, FiMessageSquare } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../../../lib/api";

export default function SearchChat({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const res = await apiGet("/user/new-task/");
      return res.data?.tasks || [];
    },
  });

  const filteredItems = tasks.filter(
    (item) =>
      item.title?.toLowerCase().includes(query.toLowerCase()) ||
      item.prompt?.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 relative flex flex-col max-h-[80vh]">
        {/* Close Button */}
        <Link to="/user/newtask">
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-black p-1 hover:bg-gray-100 rounded-full transition"
          >
            <FiX size={22} />
          </button>
        </Link>

        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Search Conversations
        </h3>

        {/* Search Input Area */}
        <div className="flex items-center border-2 border-gray-100 rounded-xl px-3 py-2 mb-4 focus-within:border-blue-400 transition shadow-sm">
          <FiSearch className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search by title or prompt..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none text-gray-700 bg-transparent py-1"
            autoFocus
          />
        </div>

        {/* Results Container with Scrolling */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="text-center py-10 text-gray-400">
              Loading tasks...
            </div>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                      onClick={() => {
                        navigate(`/user/newtask?taskId=${item._id || item.id}`);
                        window.innerWidth < 768 && onClose();
                        }}
                className="flex items-start gap-4 p-1 md:p-4 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 cursor-pointer transition group"
              >
                <div className="w-12 h-12 shrink-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <FiMessageSquare size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">
                    {item.title || "Untitled Task"}
                  </h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {item.prompt}
                  </p>
                </div>
                <div className="text-[10px] text-gray-400 whitespace-nowrap mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <span className="text-4xl mb-2">🔍</span>
              <p className="text-sm">No conversations found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer info (Optional) */}
        {filteredItems.length > 0 && (
          <div className="mt-4 pt-3 border-t text-center">
            <p className="text-xs text-gray-400 font-medium">
              Showing {filteredItems.length} result(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
