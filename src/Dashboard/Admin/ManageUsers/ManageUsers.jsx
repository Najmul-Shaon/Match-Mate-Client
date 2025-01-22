import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../Components/DashboardTitle/DashboardTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaDeleteLeft, FaUserGear } from "react-icons/fa6";
import { LuBadgeCheck } from "react-icons/lu";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: totalUsers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (targetEmail) => {

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
          .patch(`/user/role/${targetEmail}?role=admin`)
          .then((res) => {
            console.log(res.data);
            
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Updated to Admin",
                text: "User has been updated.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => {});
      }
    });
  
  };

  const handleMakePremium = (targetEmail) => {
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
          .patch(`/user/role/${targetEmail}?role=premium`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Updated to Premium!",
                text: "User has been updated.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => {});
      }
    });
  };

  const handleDeleteUser = (targetEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .delete(
              `/delete/user?targetEmail=${targetEmail}&user=${user?.email}`
            )
            .then((res) => {
              console.log(res.data);
              if (res.data.message === "Same user") {
                return Swal.fire({
                  title: "Hold!",
                  text: "You can't delete yourself.",
                  icon: "error",
                });
              }
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "User has been deleted.",
                  icon: "success",
                });
                refetch();
              }
            });
        }
      })
      .catch((err) => {});
  };
  return (
    <div>
      <DashboardTitle
        content={"Manage Users"}
        qty={totalUsers}
      ></DashboardTitle>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
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
                id="table-search-users"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
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
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  User Email
                </th>
                <th scope="col" className="px-6 py-3">
                  User Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {totalUsers.map((singleUser, i) => (
                <tr
                  key={singleUser?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    {(i + 1).toString().padStart(2, 0)}
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={singleUser?.userPhoto}
                      alt={`${singleUser?.userName} image`}
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {singleUser?.userName}
                      </div>
                      <div className="font-normal text-gray-500">
                        {singleUser?.userEmail}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{singleUser?.userEmail}</td>
                  <td className="px-6 py-4">
                    {(singleUser?.userRole === "admin" && "Admin") ||
                      (singleUser?.userRole === "user" && "User") ||
                      (singleUser?.userRole === "premium" && "Premium")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-x-4">
                      {singleUser?.userRole !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(singleUser?.userEmail)}
                          className="text-accent text-3xl"
                        >
                          <FaUserGear></FaUserGear>
                        </button>
                      )}
                      {singleUser?.userRole !== "premium" && (
                        <button
                          onClick={() =>
                            handleMakePremium(singleUser?.userEmail)
                          }
                          className="text-accent text-3xl"
                        >
                          <LuBadgeCheck></LuBadgeCheck>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(singleUser?.userEmail)}
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

export default ManageUsers;
