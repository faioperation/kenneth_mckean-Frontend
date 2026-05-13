import { IoIosCheckmark } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../../lib/api"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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

  const purchase = () => {
    toast("To purchase a plan signin first !");
    return;
  };

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
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-10 text-center"
      >
        Our Pricing
      </motion.h1>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="grid md:grid-cols-3 gap-6 w-full max-w-6xl"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -10, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between border border-gray-50 transition-all duration-300"
          >
            <div>
              <h2 className="text-xl font-semibold mb-8 text-blue-600">{plan.name}</h2>

              <div className="mb-8">
                <span className="text-4xl font-bold">${plan.monthlyPrice}</span>
                <span className="text-gray-400 ml-1">/ per month</span>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-2xl font-bold text-gray-700">
                    ${plan.yearlyPrice}
                  </span>
                  <span className="text-gray-400 ml-1 text-sm">/ per year</span>
                </div>
              </div>

              <ul className="space-y-4 ml-2 mb-12">
                {plan.features?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                    <span className="size-6 shrink-0 rounded-full bg-green-100 flex justify-center items-center">
                      <IoIosCheckmark className="text-green-600 text-2xl" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-auto text-white py-4 cursor-pointer rounded-xl transition-all font-bold bg-black hover:bg-gray-800 shadow-lg shadow-black/10"
              onClick={purchase}
            >
              Purchase Now
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="flex items-center cursor-pointer p-4 hover:bg-gray-100 rounded-xl transition-colors gap-4 mt-12 text-gray-500 font-medium"
        onClick={() => navigate(-1)}
      > 
        <span>←</span> Go Back
      </motion.p>
    </div>
  );
};

export default PricingCards;