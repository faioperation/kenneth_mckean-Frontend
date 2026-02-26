import TextCardLayouts from "../components/TextCardLayouts";

const HomePage = () => {
  return (
 <>
    <div className="text-center mt-15 font-inter font-semibold px-20">
      <h2 className="text-[20px] text-gray  w-130.75 mx-auto">Hello, Akash!</h2>
      <p className="text-gray mt-2 mb-15 w-110 mx-auto text-[32px]">
        How can I assist you today?
      </p>
    </div>
    <TextCardLayouts/>
 </>
  );
};

export default HomePage;
