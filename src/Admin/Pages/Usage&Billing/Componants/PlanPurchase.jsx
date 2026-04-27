import React from "react";
import { LuUsers } from "react-icons/lu"; // Header icon-er jonno
import { apiGet } from "../../../../lib/api";
import { useQuery } from "@tanstack/react-query";

export default function PlanPurchase() {

  const getPlanPurchase = async () => {
    const res = await apiGet("/admin/usage-billing");
    return res.data.recentPurchases?.map((purchase) => ({
      email: purchase.userEmail,
      plan: purchase.planName,
      cost: purchase.cost,
      id: purchase.id,
    }));
  };
  const {
    data: purchases = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plan"],
    queryFn: getPlanPurchase,
  });
  if (isLoading) {
    return (
      <p className="text-center py-20 text-green-500">
        Purchases are Loading...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center py-20 text-red-500">
        Failed to load purchase data
      </p>
    );
  }
  return (
    <div className="w-full lg:px-0 md:px-6">
    <div className="bg-[#0b0e14] border border-[#263e66] p-6  rounded-2xl">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6">
        <LuUsers className="text-purple-500 text-lg" />
        <h2 className="text-gray-200 text-md font-medium">
          Recent Plan Purchase
        </h2>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-xs font-medium border-b border-gray-800">
              <th className="pb-4 font-normal">User</th>
              <th className="pb-4 font-normal text-center md:text-left">
                Plan Name
              </th>
              <th className="pb-4 font-normal text-right">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {purchases?.map((plan) => (
              <tr
                key={plan.id}
                className="group hover:bg-[#ffffff05] transition-colors"
              >
                <td className="py-4">
                  <span className="text-gray-300 text-sm block truncate max-w-[150px] md:max-w-none">
                    {plan.email}
                  </span>
                </td>

                {/* Plan Name */}
                <td className="py-4 text-center md:text-left">
                  <span className="text-gray-400 text-sm">{plan.plan}</span>
                </td>

                {/* Cost */}
                <td className="py-4 text-right">
                  <span className="text-[#00C950] text-sm font-medium">
                    ${plan.cost}
                  </span>
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
