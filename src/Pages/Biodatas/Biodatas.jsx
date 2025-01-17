import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PremiumCard from "../../Components/Premium Profile/PremiumCard/PremiumCard";

const Biodatas = () => {
  const axiosSecure = useAxiosSecure();

  const { data: biodatas = [] } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas");
      return res.data;
    },
  });


  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-24">
      <Helmet>
        <title>Match Mate || Biodatas</title>
      </Helmet>
      {/* <Cover></Cover> */}
      <div className="mt-20 text-center">
        <SectionTitle header={"Explore Genuine Connections"}></SectionTitle>
      </div>
      {/* layout  */}
      <div className="grid grid-cols-12 mt-8 gap-6">
        <aside className="col-span-3 border border-green-600 self-start">
          <h5>Filted by:</h5>
          <div></div>
        </aside>
        <div className="col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biodatas.map((biodata) => (
              <PremiumCard
                key={biodata.BiodataId}
                cardInfo={biodata}
              ></PremiumCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;
