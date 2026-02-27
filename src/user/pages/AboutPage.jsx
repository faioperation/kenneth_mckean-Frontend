import AboutCards from "../components/aboutComponent/AboutCards"
import AboutHeading from "../components/aboutComponent/AboutHeading"
import MissionVision from "../components/aboutComponent/MissionVision"
import HeroSection from "../components/HeroSection"

const AboutPage = ({title,para}) => {
  return (
    <div className="bg-white">
     <HeroSection title={" Powerful AI-Driven Digital Solutions"} para={"Build apps, websites, and designs with intelligent automation and scalable workflows."}/>
     <AboutCards/>
     <AboutHeading/>
     <MissionVision/>
    </div>
  )
}

export default AboutPage
