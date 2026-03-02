import React, { useEffect, useState } from 'react'
import { HiUsers } from 'react-icons/hi'; 
import { BsLightningFill } from 'react-icons/bs'; 
import { FaDollarSign } from 'react-icons/fa'; 
import { FiTrendingUp } from 'react-icons/fi';
export default function Stats() {
    

  const [stats, setStats] = useState([])
  useEffect(() => {
    fetch('/topStats.json')
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])

  return (
   <div className="w-full lg:px-8 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 md:gap-10 gap-4 md:gap-6 lg:my-6 my-4">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="bg-[#11141b] border border-[#1e232b] p-5 lg:p-6 rounded-xl flex justify-between items-center hover:border-gray-700 transition-colors"
          >
            {/* Left Side: Labels and Values */}
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 text-[13px] font-medium">{stat.label}</p>
              <h3 className="text-white text-2xl lg:text-3xl font-bold tracking-tight">
                {stat.value}
              </h3>
              <div className="flex items-center gap-1.5 text-emerald-500 text-[13px] mt-1 font-medium">
                <FiTrendingUp size={14} />
                <span>{stat.change}</span>
              </div>
            </div>

            {/* Right Side: Circular Icon Area */}
            <div className="h-12 w-12 lg:h-14 lg:w-14 bg-[#1a1f26] rounded-full flex items-center justify-center text-xl lg:text-2xl border border-[#2d333b]">
              <img src={stat.icon} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
