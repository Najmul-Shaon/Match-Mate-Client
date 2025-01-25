import { FaDeleteLeft } from "react-icons/fa6";
import DashBoardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
const ManageSuccessStory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: successStory = [], refetch } = useQuery({
    queryKey: ["successStory"],
    queryFn: async () => {
      const res = await axiosSecure.get("/successStory");
      return res.data;
    },
  });
  console.log(successStory);

  const handleViewStory = (successStory) => {
    console.log(successStory);
    Swal.fire({
      text: successStory?.story,
      imageUrl: successStory?.coupleImgUrl,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Success image",
    });
  };

  const handleDeleteSuccesStory = (id) => {
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
          .delete(`/successStory/${id}`)
          .then((res) => {
            console.log(res.data.deletedCount);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((er) => {});
      }
    });
    console.log(id);
  };

  return (
    <div>
      <DashBoardTitle content={"Manage Success Story"}></DashBoardTitle>
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
                  Male Bio Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Female Bio Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Marriege Date
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {successStory.map((singleSuccessStory, i) => (
                <tr
                  key={singleSuccessStory?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    {(i + 1).toString().padStart(2, "0")}
                  </td>
                  <th scope="row" className="px-6 py-4 ">
                    {singleSuccessStory?.selfId}
                  </th>
                  <td className="px-6 py-4">{singleSuccessStory?.partnerId}</td>
                  <td className="px-6 py-4">
                    {new Date(
                      singleSuccessStory?.marriageDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-x-3">
                      <button
                        onClick={() => handleViewStory(singleSuccessStory)}
                        className="text-accent text-3xl"
                      >
                        <IoEyeOutline></IoEyeOutline>
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteSuccesStory(singleSuccessStory?._id)
                        }
                        className="text-accent text-3xl"
                      >
                        <FaDeleteLeft></FaDeleteLeft>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* *******************************************************  */}

          {/* *******************************************************  */}
        </div>
      </div>
    </div>
  );
};

export default ManageSuccessStory;
