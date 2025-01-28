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
import Pagination from "./Pagination";
import { CiFilter } from "react-icons/ci";

const Biodatas = () => {
  const axiosPublic = useAxiosPublic();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

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
    if (currentPage !== undefined) {
      params.append("page", currentPage);
    }
    if (itemsPerPage !== undefined) {
      params.append("size", itemsPerPage);
    }
    return params.toString();
  };

  // transorm filters into query string
  const queryString = transformToQuery(filters);

  // get total biodata count from the db
  const { data: biodatasCount = {} } = useQuery({
    queryKey: ["biodatasCount", queryString],
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodataCounts?${queryString}`);
      return res.data;
    },
  });

  const numberOfPage = Math.ceil(biodatasCount?.count / itemsPerPage);
  const pagesCount = !isNaN(numberOfPage)
    ? [...Array(numberOfPage).keys()]
    : [];

  const {
    data: biodatas = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["biodatas", queryString],
    queryFn: async () => {
      const res = await axiosPublic.get(`/biodatas?${queryString}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [queryString]);

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 relative">
      <Helmet>
        <title>Match Mate || Biodatas</title>
      </Helmet>
      <Cover coverImg={coverImg} coverTitle={"Discover Profiles"}></Cover>
      <div className="mt-20 text-center">
        <SectionTitle header={"Explore Genuine Connections"}></SectionTitle>
      </div>
      {/* layout  */}

      <div className=" grid grid-cols-12 mt-8 gap-6 relative">
        {/* Filter Icon Button (visible only on small and medium screens) */}
        <button onClick={toggleFilter} className="lg:hidden self-start z-10">
          <CiFilter className="text-2xl"></CiFilter>
        </button>

        {/* <aside className="col-span-3  self-start bg-primary p-6 rounded-lg"> */}
        <aside
          className={`absolute top-10 left-0 h-auto bg-primary p-6 z-20 transition-transform duration-300 ease-in-out transform ${
            isFilterVisible ? "translate-x-0" : "-translate-x-96"
          } lg:static lg:translate-x-0 lg:col-span-3 self-start rounded-lg`}
        >
          <div className="flex items-center justify-between">
            <h5 className="font-semibold">Filter by:</h5>
            <p className="text-xs">
              <span>
                <select
                  onChange={handleItemsPerPage}
                  defaultValue={itemsPerPage}
                  className="rounded-lg text-sm"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </span>
              /page
            </p>
          </div>
          <Filter
            filters={filters}
            setFilters={setFilters}
            refetch={refetch}
          ></Filter>
        </aside>
        <div className="col-span-12 lg:col-span-9 flex flex-col justify-between">
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biodatas.length === 0 && <h3>No biodata found</h3>}
            {biodatas.map((biodata) => (
              <ProfileCard key={biodata._id} cardInfo={biodata}></ProfileCard>
            ))}
          </div>

          <div className="flex flex-col justify-center items-center my-8">
            <Pagination
              pagesCount={pagesCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></Pagination>
          </div>
        </div>
        {/* Background Overlay (for when the filter is visible) */}
        {isFilterVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 lg:hidden"
            onClick={toggleFilter}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Biodatas;
