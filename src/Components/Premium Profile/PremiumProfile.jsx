import NormalButton from "../Buttons/NormalButton";
import SectionTitle from "../SectionTitle/SectionTitle";
import PremiumCard from "./PremiumCard/PremiumCard";

const PremiumProfile = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <SectionTitle header={"Our Premium Profile's"}></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
      </div>
      <div className="flex justify-center mt-12">
        <NormalButton btnText={"View All"}></NormalButton>
      </div>
    </div>
  );
};

export default PremiumProfile;
