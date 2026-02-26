import React, { useEffect, useState } from 'react';
import { LuUsers } from "react-icons/lu"; // Header icon-er jonno

export default function PlanPurchase() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/User.json")
      .then((res) => res.json())
      .then((data) => {
    
        const sortedData = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setUsers(sortedData);
      });
  }, []);

  return (
    <div className="bg-[#0b0e14] border border-[#1e232b] p-6 rounded-2xl w-full">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6">
        <LuUsers className="text-purple-500 text-lg" />
        <h2 className="text-gray-200 text-md font-medium">Recent Plan Purchase</h2>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-xs font-medium border-b border-gray-800">
              <th className="pb-4 font-normal">User</th>
              <th className="pb-4 font-normal text-center md:text-left">Plan Name</th>
              <th className="pb-4 font-normal text-right">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {users.map((user) => (
              <tr key={user.id} className="group hover:bg-[#ffffff05] transition-colors">
                {/* User Email/Name */}
                <td className="py-4">
                  <span className="text-gray-300 text-sm block truncate max-w-[150px] md:max-w-none">
                    {user.email}
                  </span>
                </td>
                
                {/* Plan Name */}
                <td className="py-4 text-center md:text-left">
                  <span className="text-gray-400 text-sm">
                    {user.plan}
                  </span>
                </td>

                {/* Cost */}
                <td className="py-4 text-right">
                  <span className="text-[#00C950] text-sm font-medium">
                    ${user.cost}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State Logic */}
      {users.length === 0 && (
        <p className="text-center text-gray-600 text-xs py-10">No recent purchases found.</p>
      )}
    </div>
  );
}