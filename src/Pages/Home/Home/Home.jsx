import HowWorks from "../../../Components/HowWorks/HowWorks";
import PremiumProfile from "../../../Components/Premium Profile/PremiumProfile";
import SuccessStory from "../../../Components/SuccessStory/SuccessStory";
import Banner from "../Banner/Banner";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PremiumProfile></PremiumProfile>
      <HowWorks></HowWorks>
      {/* <WhyUs></WhyUs> */}
      <SuccessStory></SuccessStory>
    </div>
  );
};

export default Home;
