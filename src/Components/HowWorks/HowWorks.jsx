import SectionTitle from "../SectionTitle/SectionTitle";
import StepCard from "./StepCard";

const HowWorks = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <SectionTitle
        header={"How Match Mate Work's"}
        subHeader={"Get started with Match Mate in 3 easy steps"}
      ></SectionTitle>
      <div >
        <StepCard></StepCard>
        
      </div>
    </div>
  );
};

export default HowWorks;
