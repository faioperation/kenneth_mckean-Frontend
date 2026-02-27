
const HeroSection = ({title,para}) => {
  return (
      <div className="text-center mt-15 font-inter">
        <h2 className="text-[40px] text-black font-semibold w-130.75 mx-auto">
         {title}
        </h2>
        <p className="text-gray mt-2 mb-15 w-110 mx-auto">
         {para}
        </p>
      </div>
  )
}

export default HeroSection
