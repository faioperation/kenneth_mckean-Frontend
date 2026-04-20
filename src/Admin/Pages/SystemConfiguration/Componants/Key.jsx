import React from 'react';
import { FiCopy, FiTrash2 } from 'react-icons/fi';
import { LuKey } from 'react-icons/lu';
import { apiGet, apiDelete } from '../../../../lib/api'; 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Key() {
  const queryClient = useQueryClient();

  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['apiKeysManagement'],
    queryFn: async () => {
      const res = await apiGet("/admin/api-configuration/");
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apiDelete(`/admin/api-configuration/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['apiKeysManagement']);
      alert("API Key deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete Error:", error);
      alert("Failed to delete API key");
    }
  });
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this API key?")) {
      deleteMutation.mutate(id);
    }
  };

  
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Key copied to clipboard!"); 
  };

  if (isLoading) return <div className="text-center py-20 text-blue-500">Loading Keys...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">Failed to load API keys</div>;

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
                <th className="pb-4 font-normal">Created At</th>
                <th className="pb-4 font-normal text-center">Status</th>
                <th className="pb-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e232b]">
              {data?.map((apiKey) => (
                <tr key={apiKey.id} className="group hover:bg-[#ffffff03] transition-colors">
                  <td className="py-5 text-gray-400 text-sm font-mono">
                    {apiKey.key.substring(0, 12)}...
                  </td>
                  <td className="py-5 text-gray-300 text-sm">{apiKey.name}</td>
                  <td className="py-5 text-gray-400 text-sm">
                    {new Date(apiKey.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      apiKey.isActive 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'bg-gray-500/10 text-gray-500'
                    }`}>
                      {apiKey.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => handleCopy(apiKey.key)}
                        className="text-blue-500 hover:text-blue-400 p-1 transition-colors" 
                        title="Copy Key"
                      >
                        <FiCopy size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(apiKey.id)}
                        disabled={deleteMutation.isPending}
                        className={`text-red-500/80 hover:text-red-500 p-1 transition-colors ${deleteMutation.isPending ? 'opacity-50' : ''}`} 
                        title="Delete Key"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data?.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-sm">
              No API keys found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}