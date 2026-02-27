const HeroSection = ({ title, para }) => {
  return (
    <section className="text-center font-inter px-6 md:px-12 lg:px-20 mt-20 md:mt-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black max-w-3xl mx-auto leading-snug">
        {title}
      </h2>

      <p className="text-gray-500 mt-4 mb-12 md:mb-16 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
        {para}
      </p>
    </section>
  );
};

export default HeroSection;
