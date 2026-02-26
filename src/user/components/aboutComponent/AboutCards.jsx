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
      para: "Delivering reliable automation with precision and consistency..",
    },
    {
      id: 3,
      title: "10k+",
      subTitle: "Ai Agent",
      para: "Autonomous agents actively solving complex digital tasks.",
    },
  ];
  return (
    <div className="px-20 flex justify-between items-center font-inter">
      {aboutCardsData.map((aboutCard, id) => (
        <div key={id} className="text-black">
          <div className="font-semibold leading-[150%]">
            <h3 className="text-5xl  mb-5">{aboutCard.title}</h3>
            <h4 className="text-2xl mb-3">{aboutCard.subTitle}</h4>
            <p className="font-normal text-base text-gray w-80">{aboutCard.para}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutCards;
