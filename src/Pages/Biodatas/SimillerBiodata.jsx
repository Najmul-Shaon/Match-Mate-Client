import { useQuery } from "@tanstack/react-query";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SimillerBiodata = ({ biodataType }) => {
  const axiosSecure = useAxiosSecure();
  const { data: simillerBiodatas = [], refetch } = useQuery({
    queryKey: ["simillerBiodatas", biodataType],
    enabled: !!biodataType,
    queryFn: async () => {
      if (!biodataType) {
        return [];
      }
      const res = await axiosSecure.get(
        `/biodatas?biodataTypeWithLimit=${biodataType}&limit=3`
      );
      return res.data;
    },
  });
  console.log(simillerBiodatas);
  return (
    <div className="mt-24">
      <SectionTitle header={"Similler biodata"}></SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {simillerBiodatas.map((simillerBiodata) => (
          <ProfileCard
            cardInfo={simillerBiodata}
            key={simillerBiodata._id}
          ></ProfileCard>
        ))}
      </div>
    </div>
  );
};

export default SimillerBiodata;
