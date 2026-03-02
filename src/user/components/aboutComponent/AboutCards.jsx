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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center lg:text-left">
        {aboutCardsData.map((aboutCard) => (
          <div key={aboutCard.id} className="text-black">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
              {aboutCard.title}
            </h3>

            <h4 className="text-lg sm:text-xl lg:text-2xl mb-3 font-medium">
              {aboutCard.subTitle}
            </h4>

            <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto lg:mx-0">
              {aboutCard.para}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutCards;
