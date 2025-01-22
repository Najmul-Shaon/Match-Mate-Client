import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DashboardTitle from "../../Components/DashboardTitle/DashboardTitle";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const ApproveContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: requestData = [], refetch } = useQuery({
    queryKey: ["requestData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contactRequest");
      return res.data;
    },
  });
  console.log(requestData);

  const handleDeleteContactRequest = (id) => {
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
        axiosSecure.delete(`/contactRequest/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Request has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleAcceptContactRequest = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/update/contactRequest/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Approved!",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => {});
      }
    });
  };

  return (
    <div>
      <DashboardTitle
        content={"Contact Request"}
        qty={requestData}
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
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Biodata Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((singleRequestData, i) => (
                <tr
                  key={singleRequestData?.biodataId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    {(i + 1).toString().padStart(2, "0")}
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {singleRequestData?.name || "N/A"}
                  </th>
                  <td className="px-6 py-4">{singleRequestData?.userEmail}</td>
                  <td className="px-6 py-4">{singleRequestData?.biodataId}</td>
                  <td className="px-6 py-4">
                    <div className="space-x-3">
                      <button
                        onClick={() =>
                          handleAcceptContactRequest(
                            singleRequestData?.biodataId
                          )
                        }
                        className="text-accent text-3xl"
                      >
                        <FaRegCheckCircle></FaRegCheckCircle>
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteContactRequest(
                            singleRequestData?.biodataId
                          )
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
        </div>
      </div>
    </div>
  );
};

export default ApproveContactRequest;
