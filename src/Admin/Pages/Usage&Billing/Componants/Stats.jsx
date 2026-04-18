import React, { useEffect, useState } from "react";
import { apiGet } from "../../../../lib/api";
import { MdElectricBolt } from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      
      try {
        const res = await apiGet("/admin/usage-billing");
        setStats(res.data.overview);
      } catch (error) {
        console.log(error);
        console.log(error?.message);
      }
    }; getStats();
  });
  return (
    <div className="w-full lg:px-8 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-28  gap-4 md:gap-6 lg:my-6 my-4">
       
          <div
           
            className="bg-[#11141b] border border-[#1e232b] p-5 lg:px-18 md:px-16 rounded-xl flex gap-8 items-center hover:border-gray-700 transition-colors"
          >
            <div className="h-12 w-12 lg:h-14 lg:w-14 bg-green-900 rounded-full flex items-center justify-center text-xl lg:text-2xl text-green-400 border border-[#2d333b]">
              $
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-gray-500 text-[13px] font-medium">
                Total Plan Purchase
              </p>
              <h3 className="text-white text-xl lg:text-2xl font-bold tracking-tight">
               $ {stats?.planPurchaseTotal}
              </h3>
            </div>
          </div>
       
          <div
           
            className="bg-[#11141b] border border-[#1e232b] p-5 lg:px-18 md:px-16 rounded-xl flex gap-8   items-center hover:border-gray-700 transition-colors"
          >
            <div className="h-12 w-12 lg:h-14 lg:w-14 bg-[#350a6d] rounded-full flex items-center  justify-center text-violet-300 text-xl lg:text-2xl border border-[#2d333b]">
              <MdElectricBolt />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-gray-500 text-[13px] font-medium">
                API Requests
              </p>
              <h3 className="text-white text-xl lg:text-2xl font-bold tracking-tight">
               $ {stats?.apiRequests}
              </h3>
            </div>
          </div>
       
          <div
           
            className="bg-[#11141b] border border-[#1e232b] p-5 lg:px-18 md:px-16 rounded-xl gap-8  flex items-center hover:border-gray-700 transition-colors"
          >
            <div className="h-12 w-12 lg:h-14 lg:w-14 bg-[#504d28] rounded-full flex items-center justify-center text-xl text-yellow-400 border border-[#2d333b]">
              <GrLineChart />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-gray-500 text-[13px] font-medium">
                Last Month
              </p>
              <h3 className="text-white text-xl lg:text-2xl font-bold tracking-tight flex gap-1">
               <div>$</div> {stats?.growthPercent}
              </h3>
            </div>
          </div>
       
      </div>
    </div>
  );
}
