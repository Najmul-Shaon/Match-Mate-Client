import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo_without_bg.png";
import useAuth from "../../Hooks/useAuth";
import useLogout from "../../Hooks/useLogout";
import useAdmin from "../../Hooks/useAdmin";
import { RiMenuLine } from "react-icons/ri";
import { useState } from "react";

const NavBar = () => {
  const { user } = useAuth();
  const handleLogout = useLogout();
  const [isAdmin] = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle menu open/close
  };
  const navLinks = (
    // text-xs lg:text-lg px-1.5 py-1 lg:px-2 lg:py-1
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block text-xs lg:text-lg font-bold py-1 px-1.5 lg:px-2 lg:py-1 rounded-md transition duration-200 ${
              isActive
                ? "bg-[#AC0404] text-white shadow-md"
                : "bg-transparent text-black hover:bg-[#AC0404] hover:text-white"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/biodatas"
          className={({ isActive }) =>
            `block text-xs lg:text-lg font-bold py-1 px-1.5 lg:px-2 lg:py-1 rounded-md transition duration-200 ${
              isActive
                ? "bg-[#AC0404] text-white shadow-md"
                : "bg-transparent text-black hover:bg-[#AC0404] hover:text-white"
            }`
          }
        >
          Biodatas
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `block text-xs lg:text-lg font-bold py-1 px-1.5 lg:px-2 lg:py-1 rounded-md transition duration-200 ${
              isActive
                ? "bg-[#AC0404] text-white shadow-md"
                : "bg-transparent text-black hover:bg-[#AC0404] hover:text-white"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `block text-xs lg:text-lg font-bold py-1 px-1.5 lg:px-2 lg:py-1 rounded-md transition duration-200 ${
              isActive
                ? "bg-[#AC0404] text-white shadow-md"
                : "bg-transparent text-black hover:bg-[#AC0404] hover:text-white"
            }`
          }
        >
          Contact Us
        </NavLink>
      </li>
      {user && !isAdmin && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block text-xs lg:text-lg font-bold py-1 px-1.5 lg:px-2 lg:py-1 rounded-md transition duration-200 ${
                isActive
                  ? "bg-[#AC0404] text-white shadow-md"
                  : "bg-transparent text-black hover:bg-[#AC0404] hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <NavLink
            to="/dashboard/adminHome"
            className={({ isActive }) =>
              `block text-xs lg:text-lg font-bold py-1 px-1.5 lg:px-2 lg:py-1 rounded-md transition duration-200 ${
                isActive
                  ? "bg-[#AC0404] text-white shadow-md"
                  : "bg-transparent text-black hover:bg-[#AC0404] hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 opacity-80">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img className="h-8" src={logo} alt="Match Mate Logo" />
          <span className="self-center text-3xl whitespace-nowrap dark:text-white font-dancing_script font-extrabold">
            Match Mate
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                type="button"
                className="text-black bg-white border border-gray-300 focus:outline-none hover:bg-accent hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs lg:text-lg py-1 px-1.5 lg:px-2 lg:py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Log out
              </button>
            </>
          ) : (
            <div className="space-x-1 lg:space-x-2">
              <Link to="/login">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-accent hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-1.5 py-1 lg:px-2 lg:py-1 dark:bg-accent dark:hover:bg-red-600 dark:focus:ring-red-900 text-xs lg:text-lg"
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  // className="text-black bg-primary border border-gray-300 focus:outline-none hover:bg-accent hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-base px-1 py-0.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  className="focus:outline-none text-black border bg-primary hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-1.5 py-1 lg:px-2 lg:py-1 dark:bg-accent dark:hover:bg-red-600 dark:focus:ring-red-900 text-xs lg:text-lg hover:text-white"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <span className="text-2xl">
              <RiMenuLine></RiMenuLine>
            </span>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {/* navlinks from variable  */}
            {navLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
