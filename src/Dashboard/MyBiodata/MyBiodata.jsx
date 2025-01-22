import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyBiodata = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myBiodata = [] } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodata?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(myBiodata);

  const handleMakePremium = (bId) => {
    const biodataInfo = {
      userEmail: user?.email,
      status: "pending",
      biodataId: bId,
      userName: myBiodata?.personalInfo?.name,
    };
    console.log(biodataInfo);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/premiumRequest", biodataInfo)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                title: "Submitted!",
                icon: "success",
              });
              navigate("/dashboard");
            }
          })
          .catch((er) => {});
      }
    });
  };

  return (
    <div className="">
      {/* <div className="max-w-screen-xl mx-auto px-4 mt-20"> */}
      <Helmet>
        <title>Match Mate || View</title>
      </Helmet>

      <div className="p-4 space-y-8">
        <div className="flex justify-center">
          <figure className="p-1 bg-accent/40 rounded-full">
            <img
              className="rounded-full w-16 h-16 md:w-28 md:h-28 lg:w-36 lg:h-36"
              src={myBiodata?.biodataPhoto}
              alt="image description"
            />
          </figure>
        </div>
        {/* Personal info  */}
        <div className="bg-primary rounded-lg shadow-md border-accent border-t-2 py-4">
          <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
            Personal Details
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody>
                {/* Row 1 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Name
                  </td>
                  <td className="px-4 py-2">{myBiodata?.personalInfo?.name}</td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Id
                  </td>
                  <td className="px-4 py-2">{myBiodata?.biodataId}</td>
                </tr>
                {/* Row 2 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Gender
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.personalInfo?.biodataType}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Status
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.personalInfo?.status}
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Date of Birth
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.personalInfo?.dateOfBirth}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Age
                  </td>
                  <td className="px-4 py-2">{myBiodata?.personalInfo?.age}</td>
                </tr>
                {/* Row 2 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Height
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.personalInfo?.height}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Weight
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.personalInfo?.weight} KG
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Religion
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.personalInfo?.religion}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Occupation
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.personalInfo?.occupation}
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Blood group
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.personalInfo?.blood}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* contact table  */}
        <div className="bg-primary rounded-lg shadow-md border-accent border-t-2 py-4">
          <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
            Contact Details
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
                    {myBiodata?.personalInfo?.userPhone}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Email
                  </td>
                  <td className="px-4 py-2">{myBiodata?.userEmail}</td>
                </tr>
                {/* Row 2 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Father's Phone
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.familyInfo?.fatherInfo?.fNumber}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Mother's Phone
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.familyInfo?.motherInfo?.mNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* address table  */}
        <div className="bg-primary rounded-lg shadow-md border-accent border-t-2 py-4">
          <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
            Address Details
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
                    {myBiodata?.personalInfo?.address?.present?.street},{" "}
                    {myBiodata?.personalInfo?.address?.present?.city},{" "}
                    {myBiodata?.personalInfo?.address?.present?.division},{" "}
                    {myBiodata?.personalInfo?.address?.present?.country}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Permanent Address
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.personalInfo?.address?.permanent?.street},{" "}
                    {myBiodata?.personalInfo?.address?.permanent?.city},{" "}
                    {myBiodata?.personalInfo?.address?.permanent?.division},{" "}
                    {myBiodata?.personalInfo?.address?.permanent?.country}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Expected partnar table */}
        <div className="bg-primary rounded-lg shadow-md border-accent border-t-2 py-4">
          <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
            Expected Partner Details
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
                    {myBiodata?.expectedPartner?.eAge} Year
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Height
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.expectedPartner?.eHeight}
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Weight
                  </td>

                  <td className="px-4 py-2">
                    {myBiodata?.expectedPartner?.eWeight} KG
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* family table */}
        <div className="bg-primary rounded-lg shadow-md border-accent border-t-2 py-4">
          <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
            Family Details
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
                    {myBiodata?.familyInfo?.fatherInfo.fName}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Father's Occupation
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.familyInfo?.fatherInfo.fOccupation}
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Mother's Name
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.familyInfo?.motherInfo.mName}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Mother's Occupation
                  </td>
                  <td className="px-4 py-2">
                    {" "}
                    {myBiodata?.familyInfo?.motherInfo.mOccupation}
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="border-b border-purple-300">
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Brother's (except me)
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.familyInfo?.siblings?.brothers}
                  </td>
                  <td className="px-4 py-2 font-semibold text-purple-700">
                    Sister's (except me)
                  </td>
                  <td className="px-4 py-2">
                    {myBiodata?.familyInfo?.siblings?.sisters}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* btn action  */}
      <div className="flex justify-center mt-12 mb-6">
        {myBiodata?.length === 0 ? (
          <button
            disabled
            type="button"
            className="btn-normal cursor-not-allowed"
          >
            Make Premium
          </button>
        ) : (
          <button
            disabled={myBiodata?.length === 0}
            onClick={() => handleMakePremium(myBiodata?.biodataId)}
            type="button"
            className="btn-normal"
          >
            Make Premium
          </button>
        )}
      </div>
    </div>
  );
};

export default MyBiodata;
