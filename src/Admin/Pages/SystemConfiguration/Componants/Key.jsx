import React from 'react';
import { FiCopy, FiTrash2 } from 'react-icons/fi';
import { LuKey } from 'react-icons/lu';

export default function Key() {
  const apiKeys = [
    { id: "ak_prod_abc123...", name: "Production API", created: "Feb 15, 2024", lastUsed: "2 min ago", status: "active" },
    { id: "ak_dev_xyz789...", name: "Development API", created: "Feb 10, 2024", lastUsed: "1 hour ago", status: "active" },
    { id: "ak_test_def456...", name: "Testing API", created: "Jan 28, 2024", lastUsed: "3 days ago", status: "active" },
    { id: "ak_old_ghi789...", name: "Legacy API", created: "Dec 12, 2023", lastUsed: "Never", status: "inactive" },
  ];

  return (
    <div className="bg-[#0b0e14] p-4 md:p-6 max-w-6xl rounded-xl md:mx-6 lg:mx-8 min-h-[300px] flex items-start justify-center">
      <div className="w-full max-w-6xl mx-auto bg-[#11141b] border border-[#1e232b] rounded-2xl p-6">
        
        {/* Header Section */}
        <div className="flex items-center gap-2 mb-8">
          <LuKey className="text-blue-500 text-lg" />
          <h2 className="text-gray-200 text-md font-medium">API Key Management</h2>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-xs font-medium border-b border-[#1e232b]">
                <th className="pb-4 font-normal">Key ID</th>
                <th className="pb-4 font-normal">Name</th>
                <th className="pb-4 font-normal">Created</th>
                <th className="pb-4 font-normal">Last Used</th>
                <th className="pb-4 font-normal text-center">Status</th>
                <th className="pb-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e232b]">
              {apiKeys.map((key, index) => (
                <tr key={index} className="group hover:bg-[#ffffff03] transition-colors">
                  <td className="py-5 text-gray-400 text-sm font-mono">{key.id}</td>
                  <td className="py-5 text-gray-300 text-sm">{key.name}</td>
                  <td className="py-5 text-gray-400 text-sm">{key.created}</td>
                  <td className="py-5 text-gray-400 text-sm">{key.lastUsed}</td>
                  <td className="py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      key.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'bg-gray-500/10 text-gray-500'
                    }`}>
                      {key.status}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-blue-500 hover:text-blue-400 p-1 transition-colors" title="Copy Key">
                        <FiCopy size={16} />
                      </button>
                      <button className="text-red-500/80 hover:text-red-500 p-1 transition-colors" title="Delete Key">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}