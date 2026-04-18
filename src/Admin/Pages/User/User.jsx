import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { apiDelete, apiGet } from "../../../lib/api";
export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await apiGet("/admin/user");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
        console.log(error?.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  // delete function
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const handleDelete = async () => {
    try {
      const data = await apiDelete(`/admin/user/${selectedUserId}`);

      if (data.success) {
        setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(false);
      setSelectedUserId(null);
    }
  };
 
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
                        onClick={() =>{ setSelectedUserId(user.id); setShowModal(true);}}
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

        {loading && (
          <div className="text-center py-20">
            <p className="text-green-500 italic">User list Loading ......</p>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#11141b] p-6 rounded-xl w-[300px] text-center shadow-xl">
              <h2 className="text-lg font-semibold mb-4 text-white">
                Confirm Delete
              </h2>

              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to delete this user?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 text-sm"
                >
                  No
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-sm"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
