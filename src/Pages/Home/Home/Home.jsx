import Commuinity from "../../../Components/Commuinity/Commuinity";
import HowWorks from "../../../Components/HowWorks/HowWorks";
import PremiumProfile from "../../../Components/Premium Profile/PremiumProfile";
import SuccessStory from "../../../Components/SuccessStory/SuccessStory";
import WhyUs from "../../../Components/WhyUs/WhyUs";
import Banner from "../Banner/Banner";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PremiumProfile></PremiumProfile>
      <HowWorks></HowWorks>
      <WhyUs></WhyUs>
      <Commuinity></Commuinity>
      <SuccessStory></SuccessStory>
    </div>
  );
};

export default Home;
