import SectionTitle from "../SectionTitle/SectionTitle";
import StepCard from "./StepCard";

const HowWorks = () => {
  return (
    <div className="bg-primary py-12 mt-24">
      <div className="max-w-screen-xl mx-auto px-4">
        <SectionTitle
          header={"How Match Mate Work's"}
          subHeader={"Get started with Match Mate in 3 easy steps"}
        ></SectionTitle>
        <div>
          <StepCard></StepCard>
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
