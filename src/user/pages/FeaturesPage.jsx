import FeaturesContent from "../components/featuresComponents/FeaturesContent";
import HeroSection from "../components/HeroSection";

const FeaturesPage = ({title,para}) => {
  return (
    <div>
      <HeroSection
        title={" Powerful AI-Driven Digital Solutions"}
        para={
          "Build apps, websites, and designs with intelligent automation and scalable workflows."
        }
      />
      <FeaturesContent />
    </div>
  );
};

export default FeaturesPage;
