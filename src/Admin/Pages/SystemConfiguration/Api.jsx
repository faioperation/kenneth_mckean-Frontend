import React from 'react';
import { FiKey } from 'react-icons/fi';

export default function Api() {
  return (
    <div className="bg-[#0b0e14] p-4 md:p-6 min-h-[300px] flex items-start justify-center">
      <div className="w-full max-w-2xl bg-[#11141b] border border-[#1e232b] rounded-2xl p-6 md:p-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-2 mb-8">
          <FiKey className="text-orange-500 text-lg" />
          <h2 className="text-gray-200 text-md font-medium">API Configuration</h2>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          
          {/* OpenAI API Key */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">OpenAI API Key</label>
            <input 
              type="text" 
              defaultValue="sk-••••••••••••••••••••••••••••••••"
              className="w-full bg-[#0b0e14] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-orange-500/50 transition-all font-mono"
            />
          </div>

          {/* Anthropic API Key */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Anthropic API Key</label>
            <input 
              type="text" 
              defaultValue="sk-ant-••••••••••••••••••••••••••••••••"
              className="w-full bg-[#0b0e14] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-orange-500/50 transition-all font-mono"
            />
          </div>

          {/* API Base URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">API Base URL</label>
            <input 
              type="text" 
              defaultValue="https://api.manus.ai/v1"
              className="w-full bg-[#0b0e14] border border-[#1e232b] rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>

        </div>
      </div>
    </div>
  );
}