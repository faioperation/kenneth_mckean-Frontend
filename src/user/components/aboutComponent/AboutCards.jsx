import { motion } from "framer-motion";

const AboutCards = () => {
  const aboutCardsData = [
    {
      id: 1,
      title: "1.2 M+",
      subTitle: "Tasks Processed",
      para: "Intelligent workflows executed across industries worldwide.",
    },
    {
      id: 2,
      title: "99%",
      subTitle: "Execution Accuracy",
      para: "Delivering reliable automation with precision and consistency.",
    },
    {
      id: 3,
      title: "10k+",
      subTitle: "AI Agent",
      para: "Autonomous agents actively solving complex digital tasks.",
    },
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-16 font-inter">
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center lg:text-left"
      >
        {aboutCardsData.map((aboutCard) => (
          <motion.div 
            key={aboutCard.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05 }}
            className="text-black p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
          >
            <motion.h3 
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-blue-600"
            >
              {aboutCard.title}
            </motion.h3>

            <h4 className="text-lg sm:text-xl lg:text-2xl mb-3 font-medium">
              {aboutCard.subTitle}
            </h4>

            <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto lg:mx-0">
              {aboutCard.para}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutCards;
