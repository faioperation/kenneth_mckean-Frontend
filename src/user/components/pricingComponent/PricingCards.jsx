import { IoIosCheckmark } from "react-icons/io";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiGet, apiPost } from "../../../lib/api"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PricingCards = () => {
  const navigate = useNavigate();

  const {
    data: plans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentPlans"],
    queryFn: async () => {
      const res = await apiGet("/user/payment/get-plans");
      return res.data;
    },
  });

 const purchase = ()=>{
  toast("To purchase a plan signin first !")
  return
 }



  if (isLoading) {
    return <div className="text-center py-20 text-black">Loading Plans...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load pricing plans.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 font-inter text-black">
      <h1 className="text-5xl font-bold mb-10">Our Pricing</h1>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-between border border-gray-100"
          >
            <div>
              <h2 className="text-xl font-semibold mb-8">{plan.name}</h2>

              <div className="mb-8">
                <span className="text-3xl font-bold">${plan.monthlyPrice}</span>
                <span className="text-gray-500 ml-1">/ per month</span>
                
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    ${plan.yearlyPrice}
                  </span>
                  <span className="text-gray-500 ml-1">/ per year</span>
                </div>
              </div>

              <ul className="space-y-3 ml-4 mb-20">
                {plan.features?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="size-5 shrink-0 rounded-full bg-green-600 flex justify-center items-center">
                      <IoIosCheckmark className="text-white text-2xl" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              
              className="mt-auto text-white py-3 cursor-pointer rounded-full transition font-bold bg-gray-800 hover:bg-gray-900"
              
              onClick={purchase}
            >
              Purchase Now
            </button>
          </div>
        ))}
      </div>
      
      <p 
        className="flex items-center cursor-pointer p-4 hover:bg-gray-200 rounded-lg duration-500 gap-4 mt-12"
        onClick={() => navigate(-1)}
      > 
        <span>←</span> Go Back
      </p>
    </div>
  );
};

export default PricingCards;