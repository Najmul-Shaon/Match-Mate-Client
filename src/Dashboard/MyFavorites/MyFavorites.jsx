import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import DashboardTitle from "../../Components/DashboardTitle/DashboardTitle";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: favoriteBio = [], refetch } = useQuery({
    queryKey: ["fvrtBio", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(typeof favoriteBio[0]?.biodataId);

  const handleDeleteFvrt = (biodataId) => {
    console.log("inside", typeof biodataId, user?.email);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/favorite/delete?bioId=${biodataId}&email=${user?.email}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };
  return (
    <div>
      <DashboardTitle
        content={"My Favorites Biodata"}
        qty={favoriteBio}
      ></DashboardTitle>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="pb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  Sl
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Biodata Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Occuapation
                </th>
                <th scope="col" className="px-6 py-3">
                  Permanent Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {favoriteBio.map((singleFavoriteBio, i) => (
                <tr
                  key={singleFavoriteBio?.biodataId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">{i + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {singleFavoriteBio?.name}
                  </th>
                  <td className="px-6 py-4">{singleFavoriteBio?.biodataId}</td>
                  <td className="px-6 py-4">{singleFavoriteBio?.occupation}</td>
                  <td className="px-6 py-4">
                    {singleFavoriteBio?.permanentAddress?.street},{" "}
                    {singleFavoriteBio?.permanentAddress?.city},{" "}
                    {singleFavoriteBio?.permanentAddress?.division},{" "}
                    {singleFavoriteBio?.permanentAddress?.country}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleDeleteFvrt(singleFavoriteBio?.biodataId)
                      }
                      className="text-accent text-3xl"
                    >
                      <FaDeleteLeft></FaDeleteLeft>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyFavorites;
