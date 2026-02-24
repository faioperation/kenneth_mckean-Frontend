import creativeImage from "../../../assets/images/creative.png"
import uiuxImage from "../../../assets/images/uiux.png"
import AIImage from "../../../assets/images/AI.png"
import graphicImage from "../../../assets/images/graphic.png"

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
     image:uiuxImage,
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
    <div className="mb-30.5">
      {sectionsData.map((section, index) => (
        <div
          key={index}
          className={`flex items-center justify-between px-20 mt-20 ${
            section.reverse ? "flex-row-reverse" : ""
          }`}
        >
          <div className="max-w-[625px] rounded-3xl overflow-hidden">
            <img
              src={section.image}
              alt="featuresImage"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="max-w-[506px] font-semibold text-3xl leading-[150%]">
              {section.title}
            </h3>
            <p className="text-gray mt-6 text-[20px] leading-[150%] font-normal max-w-[591px]">
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesContent;
