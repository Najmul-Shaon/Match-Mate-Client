import { CiStar } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import SimillerBiodata from "./SimillerBiodata";
import { FaLock } from "react-icons/fa";
import usePremium from "../../Hooks/usePremium";
import useAuth from "../../Hooks/useAuth";
import { TiTickOutline } from "react-icons/ti";
import useAdmin from "../../Hooks/useAdmin";

const BiodataDetails = () => {
  const { user } = useAuth();
  const [isPremium] = usePremium();
  const [isAdmin] = useAdmin();

  const { biodataId } = useParams();
  const axiosSecure = useAxiosSecure();

  // fetch specific bidoata informaiton by id
  const { data: biodataDetails = [] } = useQuery({
    queryKey: ["biodataDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodata/details/${biodataId}`);
      return res.data;
    },
  });

  // check: already requested for contact information or not
  const { data: isRequested } = useQuery({
    queryKey: ["isRequested", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/check/requestContact?id=${biodataId}&email=${user?.email}`
      );
      return res.data;
    },
  });

  // check: already added into favorite or not
  const { data: isFavorite, refetch } = useQuery({
    queryKey: ["isFavorite", biodataId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/check/favorite?id=${biodataId}&email=${user?.email}`
      );
      return res.data;
    },
  });



  const fvrtBiodata = {
    biodataId: biodataDetails?.biodataId,
    name: biodataDetails?.personalInfo?.name,
    permanentAddress: biodataDetails?.personalInfo?.address?.permanent,
    occupation: biodataDetails?.personalInfo?.occupation,
    userEmail: user?.email,
  };

  const handleWishList = () => {
    axiosSecure
      .post("/favorites", fvrtBiodata)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Added to wishlist");
          refetch();
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-9 gap-6">
        {/* profile card  */}
        <div className="p-4 bg-primary text-black rounded-lg shadow-lg col-span-3 border border-accent self-start">
          {/* personal info  */}
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="p-1 bg-accent/40 rounded-full flex items-center justify-center mb-4">
              <img
                className="w-24 h-24 rounded-full"
                src={biodataDetails?.biodataPhoto}
                alt=""
              />
            </div>

            <h2 className="text-xl font-bold">
              {biodataDetails?.personalInfo?.name}
            </h2>
            {/* Biodata Number */}
            <p className="text-lg mb-4">
              Biodata ID: {biodataDetails?.biodataId}
            </p>

            {/* Details */}
            <div className="w-full">
              {/* action area  */}
              <div className="flex flex-col lg:flex-row justify-between items-center my-4 gap-4">
                {isFavorite?.isFavorite ? (
                  <button className="btn-normal mx-auto flex items-center gap-2">
                    Wishlisted{" "}
                    <span className="text-2xl font-bold">
                      <TiTickOutline></TiTickOutline>
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleWishList}
                    className="btn-normal mx-auto flex items-center gap-2"
                  >
                    Wishlist{" "}
                    <span className="text-2xl font-bold">
                      <CiStar></CiStar>
                    </span>
                  </button>
                )}

                {/* ****************************************************************** */}

                {!isPremium &&
                  !isAdmin &&
                  (isRequested?.requested ? (
                    <Link to={"/dashboard/myRequested"}>
                      <button className="btn-normal">View Contact</button>
                    </Link>
                  ) : (
                    <Link to={`/checkout/${biodataDetails?.biodataId}`}>
                      <button className="btn-normal">
                        Request for Contact
                      </button>
                    </Link>
                  ))}

                {/* ****************************************************************** */}
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Biodata Type</span>
                <span>{biodataDetails?.personalInfo?.biodataType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Status</span>
                <span>{biodataDetails?.personalInfo?.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Date of Birth</span>
                <span>{biodataDetails?.personalInfo?.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Height</span>
                <span>{biodataDetails?.personalInfo?.height}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Weight</span>
                <span>{biodataDetails?.personalInfo?.weight} KG</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Religion</span>
                <span>{biodataDetails?.personalInfo?.religion}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Occupation</span>
                <span>{biodataDetails?.personalInfo?.occupation}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-accent">
                <span>Blood Group</span>
                <span>{biodataDetails?.personalInfo?.blood}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Nationality</span>
                <span>{biodataDetails?.personalInfo?.nationality}</span>
              </div>
            </div>
          </div>
        </div>
        {/* details informations table  */}

        <div className="p-4 border-2 rounded-lg col-span-6 space-y-8">
          {/* contact table  */}
          <div className="bg-primary rounded-lg shadow-md border-accent border-t-2 py-4">
            <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
              Contact
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {/* Row 1 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Phone Number
                    </td>
                    <td className="px-4 py-2">
                      {isPremium || isAdmin ? (
                        biodataDetails?.personalInfo?.userPhone
                      ) : (
                        <FaLock></FaLock>
                      )}
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Email
                    </td>
                    <td className="px-4 py-2">
                      {isPremium || isAdmin ? (
                        biodataDetails?.userEmail
                      ) : (
                        <FaLock></FaLock>
                      )}
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Father's Phone
                    </td>
                    <td className="px-4 py-2">
                      {isPremium || isAdmin ? (
                        biodataDetails?.familyInfo?.fatherInfo?.fNumber
                      ) : (
                        <FaLock></FaLock>
                      )}
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Mother's Phone
                    </td>
                    <td className="px-4 py-2">
                      {isPremium || isAdmin ? (
                        biodataDetails?.familyInfo?.motherInfo?.mNumber
                      ) : (
                        <FaLock></FaLock>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* address table  */}
          <div className="bg-primary rounded-lg shadow-md border-accent border-t-2 py-4">
            <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
              Address
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {/* Row 1 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Present Address
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.personalInfo?.address?.present?.street},{" "}
                      {biodataDetails?.personalInfo?.address?.present?.city},{" "}
                      {biodataDetails?.personalInfo?.address?.present?.division}
                      ,{" "}
                      {biodataDetails?.personalInfo?.address?.present?.country}
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Permanent Address
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.personalInfo?.address?.permanent?.street}
                      , {biodataDetails?.personalInfo?.address?.permanent?.city}
                      ,{" "}
                      {
                        biodataDetails?.personalInfo?.address?.permanent
                          ?.division
                      }
                      ,{" "}
                      {
                        biodataDetails?.personalInfo?.address?.permanent
                          ?.country
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Expected partnar table */}
          <div className="bg-primary rounded-lg shadow-md border-accent border-t-2 py-4">
            <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
              Expected Partner
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {/* Row 1 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Age
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.expectedPartner?.eAge} Year
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Height
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.expectedPartner?.eHeight}
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Weight
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.expectedPartner?.eWeight} KG
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* family table */}
          <div className="bg-primary rounded-lg shadow-md border-accent border-t-2 py-4">
            <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
              Family Info
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {/* Row 1 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Father's Name
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.familyInfo?.fatherInfo?.fName}
                    </td>
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Father's Occupation
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.familyInfo?.fatherInfo?.fOccupation}
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Mother's Name
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.familyInfo?.motherInfo?.mName}
                    </td>
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Mother's Occupation
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.familyInfo?.motherInfo?.mOccupation}
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Brother's (except me)
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.familyInfo?.siblings?.brothers}
                    </td>
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Sister's (except me)
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails?.familyInfo?.siblings?.sisters}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* similler profile  */}
      <SimillerBiodata
        biodataType={biodataDetails?.personalInfo?.biodataType}
      ></SimillerBiodata>
    </div>
  );
};

export default BiodataDetails;
