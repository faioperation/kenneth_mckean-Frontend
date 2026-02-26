import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/User.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="bg-[#0b0e14] p-4 md:p-6 min-h-screen">
      <div className="max-w-8xl mx-auto">
        {/* Table Container */}
        <div className="bg-[#11141b] border border-[#1e232b] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border border-[#2B7FFF33] bg-[#161b22]">
                  <th className="px-6 py-4 text-gray-400  font-medium text-sm">
                    User Name
                  </th>
                  <th className="px-6 py-4 text-gray-400  font-medium text-sm">
                    Mail
                  </th>
                  <th className="px-6 py-4 text-gray-400  font-medium text-sm">
                    Plan
                  </th>
                  <th className="px-6 py-4 text-gray-400  font-medium text-sm text-center">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y  divide-[#2B7FFF1A]">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-[#1c212a] transition-colors duration-200 group"
                  >
                    <td className="px-6 py-2">
                      <span className="text-gray-200 text-sm font-medium">
                        {user.name}
                      </span>
                    </td>
                    <td className="px-6 py-2">
                      <span className="text-gray-300 text-sm">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.plan === "Enterprise"
                            ? "bg-purple-500/10 text-purple-400"
                            : user.plan === "Pro"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-2 text-center">
                      <button
                        className="p-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete User"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State (Optional) */}
        {users.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 italic">
              No users found in the database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
