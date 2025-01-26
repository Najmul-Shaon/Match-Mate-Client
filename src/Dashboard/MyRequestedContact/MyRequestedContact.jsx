import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import DashboardTitle from "../../Components/DashboardTitle/DashboardTitle";

const MyRequestedContact = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // get all requested contact list
  const { data: requestData = [], refetch } = useQuery({
    queryKey: ["requestData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contactRequest?email=${user?.email}`);
      return res.data;
    },
  });

  const handleRequestContactDelete = (biodataId) => {
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
        axiosSecure.delete(`/contactRequest/${biodataId}`).then((res) => {

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
      <div>
        <DashboardTitle
          content={"My Requested Contact"}
          qty={requestData}
        ></DashboardTitle>
      </div>
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
              placeholder="Search by biodata id (i.e 1)"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Biodata Id
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Email
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
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-4">{singleRequestData?.name}</td>
                <td className="px-6 py-4">{singleRequestData?.biodataId}</td>
                <td className="px-6 py-4">
                  {singleRequestData?.requestStatus}
                </td>
                <td className="px-6 py-4">
                  {singleRequestData?.requestStatus === "pending"
                    ? "Pending"
                    : singleRequestData?.phone}
                </td>
                <td className="px-6 py-4">
                  {singleRequestData?.requestStatus === "pending"
                    ? "Pending"
                    : singleRequestData?.userEmail}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleRequestContactDelete(singleRequestData?.biodataId)
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
  );
};

export default MyRequestedContact;
