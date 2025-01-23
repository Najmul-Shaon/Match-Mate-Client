import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import PremiumCard from "./PremiumCard/PremiumCard";
import ProfileCard from "../ProfileCard/ProfileCard";

const PremiumProfile = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-24">
      <SectionTitle
        header={"Featured Profile's"}
        subHeader={"Discover meaningful connections with ease"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard> */}
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
      </div>
      <div className="flex justify-center mt-12">
        <Link to="/biodatas">
          <button className="btn-normal">View All</button>
        </Link>
      </div>
    </div>
  );
};

export default PremiumProfile;
