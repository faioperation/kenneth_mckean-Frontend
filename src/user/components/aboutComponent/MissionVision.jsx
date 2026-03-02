import MVImage from "../../../assets/images/MVImage.png";

const MissionVision = () => {
  const missionVisionData = [
    {
      id: 1,
      title: "Our Mission",
      para: "Our mission is to build a powerful AI Operating System that enables autonomous task execution, seamless tool integration, and scalable automation. We aim to enhance productivity, reduce manual effort, and deliver intelligent results across web, data, and development environments.",
    },
    {
      id: 2,
      title: "Our Vision",
      para: "Our vision is to lead the future of intelligent automation by creating adaptive, multi-agent systems that learn, optimize, and evolve with every interaction. We strive to redefine how humans collaborate with AI to achieve faster, smarter, and more scalable digital outcomes.",
    },
  ];

  return (
    <section className="font-inter px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={MVImage}
            alt="Mission Vision"
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 text-center lg:text-left">
          {missionVisionData.map((data) => (
            <div key={data.id} className="leading-relaxed">
              <h4 className="font-semibold text-xl sm:text-2xl lg:text-3xl text-black mb-4">
                {data.title}
              </h4>

              <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                {data.para}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
