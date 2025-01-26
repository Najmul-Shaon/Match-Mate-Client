import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import coverImg from "../../assets/BidataCover.jpg";
import Cover from "../../Shared/Cover/Cover";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const Biodatas = () => {
  const [filters, setFilters] = useState({
    ageRange: { min: "", max: "" },
    biodataType: { male: false, female: false },
    divisions: {
      Dhaka: false,
      Chattogram: false,
      Rangpur: false,
      Barisal: false,
      Khulna: false,
      Mymensingh: false,
      Sylhet: false,
    },
  });

  const transformToQuery = (filters) => {
    const params = new URLSearchParams();

    // add age range to params
    if (filters.ageRange.min) {
      params.append("minAge", filters.ageRange.min);
    }
    if (filters.ageRange.max) {
      params.append("maxAge", filters.ageRange.max);
    }

    // add biodata type to params
    const biodataType = Object.keys(filters.biodataType)
      .filter((key) => filters.biodataType[key])
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
      .join(",");

    if (biodataType) {
      params.append("biodataType", biodataType);
    }
    // add division to params
    const divisions = Object.keys(filters.divisions)
      .filter((key) => filters.divisions[key])
      .join(",");

    if (divisions) {
      params.append("divisions", divisions);
    }
    return params.toString();
  };

  // transorm filters into query string
  const queryString = transformToQuery(filters);

  const axiosPublic = useAxiosPublic();

  const {
    data: biodatas = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodatas?${queryString}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [queryString]);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

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
          <Filter
            filters={filters}
            setFilters={setFilters}
            refetch={refetch}
          ></Filter>
        </aside>
        <div className="col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biodatas.length === 0 && <h3>No biodata found</h3>}
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
