import { motion } from "framer-motion";

const HeroSection = ({ title, para }) => {
  return (
    <section className="text-center font-inter px-6 md:px-12 lg:px-20 mt-20 md:mt-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black max-w-3xl mx-auto leading-snug"
      >
        {title}
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-500 mt-4 mb-12 md:mb-16 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
      >
        {para}
      </motion.p>
    </section>
  );
};

export default HeroSection;
