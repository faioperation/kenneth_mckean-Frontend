import React from "react";

export default function Stats() {
  const statData = [
    {
      id: 1,
      label: "Total Active Users",
      value: "$1,284",
      change: "+12.3%",
      trend: "up",
      icon: "https://i.ibb.co.com/PGBNK7xh/Icon-2.png",
    },
    {
      id: 2,
      label: "API Requests",
      value: "8,714",
      change: "+24.5%",
      trend: "up",
      icon: "https://i.ibb.co.com/9mdqDGsm/Icon-1.png",
    },
    {
      id: 3,
      label: "Last Month",
      value: "+18.5%",
      change: "+9.3%",
      trend: "up",
      icon: "https://i.ibb.co.com/JjLxTZR3/Icon-3.png",
    },
  ];
  return (
    <div className="w-full lg:px-8 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-28 md:gap-18 gap-4 md:gap-6 lg:my-6 my-4">
        {statData.map((stat) => (
          <div
            key={stat.id}
            className="bg-[#11141b] border border-[#1e232b] p-5 lg:px-18 md:px-16 rounded-xl flex gap-8   items-center hover:border-gray-700 transition-colors"
          >
            <div className="h-12 w-12 lg:h-14 lg:w-14 bg-[#1a1f26] rounded-full flex items-center justify-center text-xl lg:text-2xl border border-[#2d333b]">
              <img src={stat.icon} alt="" />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-gray-500 text-[13px] font-medium">
                {stat.label}
              </p>
              <h3 className="text-white text-2xl lg:text-3xl font-bold tracking-tight">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
