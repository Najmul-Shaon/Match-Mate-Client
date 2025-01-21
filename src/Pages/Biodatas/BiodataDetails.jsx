import { CiStar } from "react-icons/ci";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import PremiumCard from "../../Components/Premium Profile/PremiumCard/PremiumCard";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BiodataDetails = () => {
  const { biodataId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: biodataDetails = [] } = useQuery({
    queryKey: ["biodataDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodata/details/${biodataId}`);
      return res.data;
    },
  });
  console.log(biodataDetails[0]);
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
                src={biodataDetails[0]?.biodataPhoto}
                alt=""
              />
            </div>

            <h2 className="text-xl font-bold">
              {biodataDetails[0]?.personalInfo?.name}
            </h2>
            {/* Biodata Number */}
            <p className="text-lg mb-4">
              Biodata ID: {biodataDetails[0]?.biodataId}
            </p>

            {/* Details */}
            <div className="w-full">
              {/* action area  */}
              <div className="flex flex-col lg:flex-row justify-center my-4 gap-4">
                <button className="btn-normal mx-auto flex items-center gap-2">
                  Whislist{" "}
                  <span className="text-2xl font-bold">
                    <CiStar></CiStar>
                  </span>
                </button>
                <Link to="/checkout/:1">
                  <button className="btn-normal">Request for Contact</button>
                </Link>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Biodata Type</span>
                <span>{biodataDetails[0]?.personalInfo?.biodataType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Status</span>
                <span>{biodataDetails[0]?.personalInfo?.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Date of Birth</span>
                <span>{biodataDetails[0]?.personalInfo?.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Height</span>
                <span>{biodataDetails[0]?.personalInfo?.height}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Weight</span>
                <span>{biodataDetails[0]?.personalInfo?.weight} KG</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Religion</span>
                <span>{biodataDetails[0]?.personalInfo?.religion}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-accent">
                <span>Occupation</span>
                <span>{biodataDetails[0]?.personalInfo?.occupation}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-accent">
                <span>Blood Group</span>
                <span>{biodataDetails[0]?.personalInfo?.blood}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Nationality</span>
                <span>{biodataDetails[0]?.personalInfo?.nationality}</span>
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
                      {biodataDetails[0]?.personalInfo?.userPhone}
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Email
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.userEmail}
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Father's Phone
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.familyInfo?.fatherInfo?.fNumber}
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Mother's Phone
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.familyInfo?.motherInfo?.mNumber}
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
                      {
                        biodataDetails[0]?.personalInfo?.address?.present
                          ?.street
                      }
                      ,{" "}
                      {biodataDetails[0]?.personalInfo?.address?.present?.city},{" "}
                      {
                        biodataDetails[0]?.personalInfo?.address?.present
                          ?.division
                      }
                      ,{" "}
                      {
                        biodataDetails[0]?.personalInfo?.address?.present
                          ?.country
                      }
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Permanent Address
                    </td>
                    <td className="px-4 py-2">
                      {
                        biodataDetails[0]?.personalInfo?.address?.permanent
                          ?.street
                      }
                      ,{" "}
                      {
                        biodataDetails[0]?.personalInfo?.address?.permanent
                          ?.city
                      }
                      ,{" "}
                      {
                        biodataDetails[0]?.personalInfo?.address?.permanent
                          ?.division
                      }
                      ,{" "}
                      {
                        biodataDetails[0]?.personalInfo?.address?.permanent
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
                      {biodataDetails[0]?.expectedPartner?.eAge} Year
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Height
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.expectedPartner?.eHeight}
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Weight
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.expectedPartner?.eWeight} KG
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
                      {biodataDetails[0]?.familyInfo?.fatherInfo?.fName}
                    </td>
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Father's Occupation
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.familyInfo?.fatherInfo?.fOccupation}
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Mother's Name
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.familyInfo?.motherInfo?.mName}
                    </td>
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Mother's Occupation
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.familyInfo?.motherInfo?.mOccupation}
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="border-b border-purple-300">
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Brother's (except me)
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.familyInfo?.siblings?.brothers}
                    </td>
                    <td className="px-4 py-2 font-semibold text-purple-700">
                      Sister's (except me)
                    </td>
                    <td className="px-4 py-2">
                      {biodataDetails[0]?.familyInfo?.siblings?.sisters}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* similler profile  */}
      <div className="mt-24">
        <SectionTitle header={"Similler biodata"}></SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <PremiumCard></PremiumCard>
          <PremiumCard></PremiumCard>
          <PremiumCard></PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
