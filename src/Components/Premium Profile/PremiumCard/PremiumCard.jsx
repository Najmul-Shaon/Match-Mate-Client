import profile1 from "../../../assets/profile1.jpg";
import NormalButton from "../../Buttons/NormalButton";
const PremiumCard = () => {
  return (
    <div className="card bg-primary shadow-xl rounded-md border-dashed border-2">
      <figure className="px-6 pt-6 flex justify-center">
        <img
          src={profile1}
          alt="User Profile"
          className="w-48 h-48 rounded-full"
        />
      </figure>
      <h2 className="text-xl font-semibold text-center mt-4">Najmul Shaon</h2>
      <div className="flex justify-around gap-4 mt-2 px-4">
        <div>
          <p>Gender: Male</p>
          <p>Age: 26</p>
        </div>
        <div>
          <p>Occupation: Engineer</p>
          <p>Division: Dhaka</p>
        </div>
      </div>
      {/* card action  */}
      <div className="flex items-center justify-center my-4">
        <NormalButton btnText={"View Profile"}></NormalButton>
      </div>
    </div>
  );
};

export default PremiumCard;
