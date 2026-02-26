import AppDesignIcon from "../../assets/icons/AppDesignIcon";
import DesignIcon from "../../assets/icons/DesignIcon";
import SlideIcon from "../../assets/icons/SlideIcon";
import SparkleIcon from "../../assets/icons/SparkleIcon";
import WebsiteIcon from "../../assets/icons/WebsiteIcon";

const TextCardLayouts = () => {
  const features = [
    {
      id: 1,
      title: "Create Slides",
      desc: "Generate presentation-ready slides from your ideas",
      icon: <SlideIcon />,
    },
    {
      id: 2,
      title: "Build Website",
      desc: "Build and deploy complete websites instantly",
      icon: <WebsiteIcon />,
    },
    {
      id: 3,
      title: "Apps Develop",
      desc: "Develop scalable web and mobile applications",
      icon: <AppDesignIcon />,
    },
    {
      id: 4,
      title: "Design",
      desc: "Create modern UI, illustration and graphic designs",
      icon: <DesignIcon />,
    },
  ];

  return (
    <div className="font-inter  w-[779px] mx-auto ">
      <div className="bg-white shadow border border-gray opacity-25 text-center rounded-2xl p-6">
        <div className="text-left flex items-center gap-x-3 mb-20">
          <span>
            <SparkleIcon />
          </span>
          <h3 className="text-lg font-regular leading-[100%] text-black ">
            Create in anything....
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 mb-67">
        {features.map((item) => {
          return (
            <div
              key={item.id}
              className="border rounded-2xl p-5 hover:shadow-md transition bg-white"
            >
              <div className="mb-4">{item.icon}</div>

              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>

              <p className="text-sm text-gray">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextCardLayouts;
