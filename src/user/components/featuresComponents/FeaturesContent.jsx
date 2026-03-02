import creativeImage from "../../../assets/images/creative.png";
import uiuxImage from "../../../assets/images/uiux.png";
import AIImage from "../../../assets/images/AI.png";
import graphicImage from "../../../assets/images/graphic.png";

const FeaturesContent = () => {
  const sectionsData = [
    {
      title: "Full-stack website from a single Prompt",
      description:
        "Just describe — AI turns your idea into a fully functional website. No complex code. AI handles the setup, optimization, and deployment.",
      image: creativeImage,
      reverse: false,
    },
    {
      title: "Strategic UI/UX Design Excellence & App Development",
      description:
        "We create visually compelling, user-centric digital experiences. Our designs enhance usability and deliver seamless interaction across all devices.",
      image: uiuxImage,
      reverse: true,
    },
    {
      title: "Intelligent AI & Automation Systems",
      description:
        "We create smart workflows powered by AI, streamlining operations and boosting productivity with automation.",
      image: AIImage,
      reverse: false,
    },
    {
      title: "Creative Graphic Design Solutions",
      description:
        "We deliver impactful and visually appealing graphic design services that strengthen your brand identity and communication.",
      image: graphicImage,
      reverse: true,
    },
  ];

  return (
    <div className="mb-20 md:mb-28 lg:mb-32">
      {sectionsData.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-6 md:px-12 lg:px-20 mt-16 md:mt-20 ${
            section.reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden">
            <img
              src={section.image}
              alt="featuresImage"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black leading-snug">
              {section.title}
            </h3>

            <p className="text-gray-500 mt-4 md:mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesContent;
