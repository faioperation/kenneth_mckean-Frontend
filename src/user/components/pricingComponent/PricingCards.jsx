import { IoIosCheckmark } from "react-icons/io";

const PricingCards = () => {
  const cardsData = [
    {
      title: "Free Trial",
      price: "$0",
      period: "/ per month",
      features: [
        "1 complete essay 100K tokens/month",
        "5 agents",
        "Basic workflows",
        "Email support",
      ],
      button: "Start Free Trial",
    },
    {
      title: "Pro cards",
      price: "$9.99",
      period: "/ per month",
      features: [
        "5M tokens/month",
        "50 agents",
        "Advanced workflows",
        "Priority support",
        "API access",
      ],
      button: "Start with Pro cards",
    },
    {
      title: "Enterprise",
      price: "$29.99",
      period: "/ per month",
      features: [
        "Unlimited tokens",
        "Unlimited agents",
        "Custom workflows",
        "24/7 dedicated support",
        "Custom integrations",
        "SLA guarantee",
      ],
      button: "Go Pro Today",
    },
  ];

  return (
    <div className="min-h-screen  flex flex-col items-center py-12 px-4 font-inter text-black">
      <h1 className="text-5xl font-bold mb-10">Our Pricing</h1>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {cardsData.map((cards, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">{cards.title}</h2>

              <div className="mb-4">
                <span className="text-3xl font-bold">{cards.price}</span>
                <span className="text-gray ml-1">{cards.period}</span>
              </div>

              <ul className="space-y-3 ml-4 mb-20">
                {cards.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="size-5 rounded-full bg-green-600 flex justify-center items-center">
                    <IoIosCheckmark  className="text-white text-2xl"/>
                  </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-auto bg-gray-800 text-white py-2 rounded-full hover:bg-gray-900 transition mt">
              {cards.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
