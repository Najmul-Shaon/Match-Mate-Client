import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import PremiumCard from "../../Components/Premium Profile/PremiumCard/PremiumCard";
import coverImg from "../../assets/BidataCover.jpg";
import Cover from "../../Shared/Cover/Cover";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import Filter from "./Filter";
import { FiFilter } from "react-icons/fi";

const Biodatas = () => {
  const axiosPublic = useAxiosPublic();

  const { data: biodatas = [] } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodatas");
      return res.data;
    },
  });
  console.log(typeof biodatas[0]?.biodataId);

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Helmet>
        <title>Match Mate || Biodatas</title>
      </Helmet>
      <Cover coverImg={coverImg} coverTitle={"Discover Profiles"}></Cover>
      <div className="mt-20 text-center">
        <SectionTitle header={"Explore Genuine Connections"}></SectionTitle>
      </div>
      {/* layout  */}
      <div className="grid grid-cols-12 mt-8 gap-6">
        <aside className="col-span-3  self-start bg-primary p-6 rounded-lg">
          <h5 className="font-semibold">Filter by:</h5>
          {/*  <div></div> */}
          <Filter></Filter>
        </aside>
        <div className="col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biodatas.map((biodata) => (
              <ProfileCard key={biodata._id} cardInfo={biodata}></ProfileCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;
