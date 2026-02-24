import {Routes, Route } from "react-router";
import FeaturesPage from "./user/pages/FeaturesPage";
import CommonLayout from "./user/components/CommonLayout";
import AboutPage from "./user/pages/AboutPage";
import PricingPage from "./user/pages/PricingPage";


const App = () => {
  return (
   <Routes>
      <Route element={<CommonLayout />}>
        {/* <Route index element={<HomePage />} /> */}
        <Route path="/features" element={<FeaturesPage/>} />      
        <Route path="/pricing" element={<PricingPage/>} />      
        <Route path="/about" element={<AboutPage/>} />      
      </Route>
    </Routes>
  );
};

export default App;
