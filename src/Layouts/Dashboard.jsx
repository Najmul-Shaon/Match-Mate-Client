import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo_without_bg.png";
import { LuBadgeCheck, LuLayoutDashboard, LuUsers } from "react-icons/lu";
import useLogout from "../Hooks/useLogout";
import { FaRegEdit } from "react-icons/fa";
import { IoIosLogOut, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { MdOutlineContactPhone } from "react-icons/md";
import { FiUserCheck } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

const Dashboard = () => {
  const handleLogout = useLogout();
  const { user } = useAuth();
  // const isAdmin = true;
  const isAdmin = false;
  return (
    <div className="">
      <Helmet>
        <title>Match Mate || Dashboard</title>
      </Helmet>
      {/* nav bar section start */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {/* branding  */}
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/" className="flex ms-2 md:me-24">
                <img src={logo} className="h-8 me-3" alt="Match Mate Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white font-dancing_script">
                  Match Mate
                </span>
              </Link>
            </div>
            {/* user info normal/admn/premium */}
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user?.photoURL}
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  {/* user name, email  */}
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {user?.displayName}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user?.email}
                    </p>
                  </div>
                  {/* users menu  */}
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700
                        hover:bg-accent hover:text-white"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/biodatas"
                        className="block px-4 py-2 text-sm text-gray-700
                        hover:bg-accent hover:text-white"
                      >
                        Biodatas
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="block px-4 py-2 text-sm text-gray-700
                        hover:bg-accent hover:text-white"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="block px-4 py-2 text-sm text-gray-700
                        hover:bg-accent hover:text-white"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* nav bar section end */}
      {/* side bar start  */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-primary border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-primary">
          <ul className="space-y-2 font-medium">
            {/* navigation menu  */}
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/adminHome"
                    end
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent/80 group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-xl">
                      <LuLayoutDashboard />
                    </span>
                    Admin Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageUsers"
                    end
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent/80 group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-xl">
                      <LuUsers />
                    </span>
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/approvedPremium"
                    end
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent/80 group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-xl">
                      <LuBadgeCheck />
                    </span>
                    Approved Premium
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/approvedContact"
                    end
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent/80 group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-xl">
                      <VscGitPullRequestGoToChanges />
                    </span>
                    Approved Contact Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleLogout}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent hover:text-white group"
                  >
                    <span className="me-3 text-xl">
                      <IoIosLogOut />
                    </span>
                    Log out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent/80 group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-xl">
                      <LuLayoutDashboard />
                    </span>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/viewBiodata"
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-xl">
                      <FiUserCheck />
                    </span>
                    View Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/editBiodata"
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-xl">
                      <FaRegEdit />
                    </span>
                    Create/Edit Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myRequested"
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-xl">
                      <MdOutlineContactPhone />
                    </span>
                    Requested Contacts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myFavorites"
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-2xl">
                      <CiStar />
                    </span>
                    Favorites
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/gotMarried"
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent group hover:text-white ${
                        isActive ? "bg-accent text-white" : ""
                      }`
                    }
                  >
                    <span className="me-3 text-2xl">
                      <IoMdCheckmarkCircleOutline />
                    </span>
                    Got Married
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleLogout}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-accent hover:text-white group"
                  >
                    <span className="me-3 text-xl">
                      <IoIosLogOut />
                    </span>
                    Log out
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
      {/* side bar end  */}
      {/* site content  */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 min-h-[calc(100vh-100px)]">
          <Outlet></Outlet>

          {/* <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div> */}
          {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div> */}
          {/* <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div> */}
          {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div> */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
