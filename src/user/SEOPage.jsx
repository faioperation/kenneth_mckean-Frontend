import seoImg from "../assets/images/seoImg.png"

const SEOPage = () => {
  return (
    <div className="flex-1 bg-white min-h-[70vh] lg:min-h-screen">
      <div className="max-w-3xl mx-auto w-full ">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
          SEO
        </h2>
        <img src={seoImg} alt="seoImg" />
      </div>
    </div>
  );
};

export default SEOPage;
