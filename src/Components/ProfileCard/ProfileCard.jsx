import { Link } from "react-router-dom";

const ProfileCard = ({ cardInfo }) => {
  return (
    <div className="bg-primary rounded-lg shadow-lg flex flex-col">
      <div className="flex gap-2 p-4 flex-1">
        <div className="flex flex-col justify-center items-center w-2/5 space-y-3">
          <img
            className="rounded-full object-cover w-16 h-16"
            src={cardInfo?.biodataPhoto}
            alt="User Profile"
          />
          <div className="text-center">
            <h3 className="text-lg text-gray-800">
              {cardInfo?.personalInfo?.name}
            </h3>
            <p className="text-sm text-gray-500">
              Biodata Id: {cardInfo?.biodataId}
            </p>
          </div>
        </div>
        {/* <hr className="my-4" /> */}
        <div className="w-3/5">
          <ul className="text-sm text-gray-700 space-y-2 list-disc ms-4">
            <li>Gender: {cardInfo?.personalInfo?.biodataType}</li>
            <li>Age: {cardInfo?.personalInfo?.age}</li>
            <li>Occupation: {cardInfo?.personalInfo?.occupation}</li>
            <li>
              Division: {cardInfo?.personalInfo?.address?.permanent?.division}
            </li>
          </ul>
        </div>
      </div>
      {/* card action  */}
      <div className="my-4">
        <Link to={`/biodata/details/${cardInfo?.biodataId}`}>
          <button className="btn-normal w-full ">View Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
