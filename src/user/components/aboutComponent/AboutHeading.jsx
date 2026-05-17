import { motion } from "framer-motion";

const AboutHeading = () => {
  return (
    <section className="font-inter px-6 md:px-12 lg:px-20 mt-16 md:mt-24 lg:mt-28 mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-16">
        <motion.h4 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold text-black"
        >
          Who we are
        </motion.h4>

        <motion.p 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl"
        >
          We are an AI-driven automation platform built to simplify complex
          workflows through intelligent multi-agent systems. Our mission is to
          empower businesses and individuals by transforming high-level goals
          into fully automated, structured outcomes with minimal human
          intervention.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHeading;
