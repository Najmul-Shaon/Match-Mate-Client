import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import PremiumCard from "./PremiumCard/PremiumCard";
import ProfileCard from "../ProfileCard/ProfileCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const PremiumProfile = () => {
  const [selectedValue, setSelectedValue] = useState("asc");

  const axiosPublic = useAxiosPublic();
  const {
    data: premiumProfile = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["premiumProfile", selectedValue],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `premiumProfile?sortby=${selectedValue}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  const handleChangle = (e) => {
    setSelectedValue(e.target.value);
    refetch();
  };
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-24">
      <SectionTitle
        header={"Featured Profile's"}
        subHeader={"Discover meaningful connections with ease"}
      ></SectionTitle>
      {/* sorting  */}
      {/* **************************************  */}

      <div className="flex justify-end">
        <form className="max-w-sm">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Sort by
          </label>
          <select
            value={selectedValue}
            onChange={handleChangle}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
          </select>
        </form>
      </div>

      {/* **************************************  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard>
        <PremiumCard></PremiumCard> */}
        {premiumProfile.map((singlePremiumProfile) => (
          <ProfileCard
            key={singlePremiumProfile?.biodataId}
            cardInfo={singlePremiumProfile}
          ></ProfileCard>
        ))}
        {/* <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard>
        <ProfileCard></ProfileCard> */}
      </div>
      <div className="flex justify-center mt-12">
        <Link to="/biodatas">
          <button className="btn-normal">View All</button>
        </Link>
      </div>
    </div>
  );
};

export default PremiumProfile;
