import { Link } from "react-router-dom";

const PremiumCard = ({ cardInfo }) => {
  return (
    <div className="card bg-primary shadow-xl rounded-md border-dashed border-2 flex flex-col items-center justify-center">
      <figure className=" py-3 px-2 flex justify-center">
        <img
          src={cardInfo?.biodataPhoto}
          alt="User Profile"
          className="w-40 h-40 rounded-full"
        />
      </figure>
      <h2 className="text-xl font-semibold text-center mt-4 px-4">
        {cardInfo?.Name}
      </h2>
      <p className="text-base font-normal text-center mb-2 px-4">
        Biodata Id: {cardInfo?.biodataId}
      </p>
      <div className="flex justify-evenly gap-4 mt-2 px-4 grow">
        <div>
          <p className="text-sm">
            Gender: {cardInfo?.personalInfo?.biodataType}
          </p>
          <p className="text-sm">Age: {cardInfo?.personalInfo?.age}</p>
        </div>
        <div>
          <p className="text-sm">
            Occupation: {cardInfo?.personalInfo?.occupation}
          </p>
          <p className="text-sm">
            Division: {cardInfo?.personalInfo?.address?.permanent?.division}
          </p>
        </div>
      </div>
      {/* card action  */}
      <div className="flex items-center justify-center my-4">
        <Link to={`/biodata/details/${cardInfo?.biodataId}`}>
          <button className="btn-normal">View Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default PremiumCard;
