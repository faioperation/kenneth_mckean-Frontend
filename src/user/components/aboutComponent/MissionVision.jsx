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
    <div className="flex  gap-6 items-center font-inter px-20 mb-45">
      <div>
        <img src={MVImage} alt="MVImage" className="rounded-lg" />
      </div>
      <div className="flex flex-col gap-y-8">
        {missionVisionData.map((data, id) => (
          <div key={id} className="leading-[150%]">
            <h4 className="font-semibold text-2xl text-black mb-5">
              {data.title}
            </h4>
            <p className="font-normal text-base text-gray w-auto">
              {data.para}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionVision;
