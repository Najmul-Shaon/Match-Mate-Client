import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo_without_bg.png";
import useAuth from "../../Hooks/useAuth";
import useLogout from "../../Hooks/useLogout";
import useAdmin from "../../Hooks/useAdmin";
import { RiMenuLine } from "react-icons/ri";
import { useState } from "react";
import { FaAngleDown, FaRegUser } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";

const NavBar = () => {
  const { user } = useAuth();
  const handleLogout = useLogout();
  const [isAdmin] = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle menu open/close
  };

  const [isMenuExpand, setIsMenuExpand] = useState(false);

  // all the nav links declare here as variable
  const navLinks = (
    // py-1 px-1.5 lg:px-2 lg:py-1 rounded-md
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block text-xs lg:text-lg font-bold transition duration-200 ${
              isActive
                ? "text-[#AC0404]"
                : "bg-transparent text-black hover:text-[#AC0404]"
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
            `block text-xs lg:text-lg font-bold transition duration-200 ${
              isActive
                ? "text-[#AC0404]"
                : "bg-transparent text-black hover:text-[#AC0404]"
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
            `block text-xs lg:text-lg font-bold transition duration-200 ${
              isActive
                ? "text-[#AC0404]"
                : "bg-transparent text-black hover:text-[#AC0404]"
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
            `block text-xs lg:text-lg font-bold transition duration-200 ${
              isActive
                ? "text-[#AC0404]"
                : "bg-transparent text-black hover:text-[#AC0404]"
            }`
          }
        >
          Contact Us
        </NavLink>
      </li>
      {user && !isAdmin && (
        <li>
          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              `block text-xs lg:text-lg font-bold transition duration-200 ${
                isActive
                  ? "text-[#AC0404]"
                  : "bg-transparent text-black hover:text-[#AC0404]"
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
              `block text-xs lg:text-lg font-bold transition duration-200 ${
                isActive
                  ? "text-[#AC0404]"
                  : "bg-transparent text-black hover:text-[#AC0404]"
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
    <nav className="bg-primary dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 opacity-95">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* site branding: logo and name  */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img className="h-8" src={logo} alt="Match Mate Logo" />
          <span className="self-center text-3xl whitespace-nowrap dark:text-white font-dancing_script font-extrabold">
            Match Mate
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {user ? (
            <div
              onClick={() => setIsMenuExpand(!isMenuExpand)}
              className="flex items-center gap-4"
            >
              <img
                className="rounded-full w-8"
                src={user?.photoURL}
                alt="user"
              />
              <span>
                <FaAngleDown />
              </span>
            </div>
          ) : (
            <div className="space-x-1 lg:space-x-2">
              <Link to="/login">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-accent hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-1.5 py-1 lg:px-2 lg:py-1 dark:bg-accent dark:hover:bg-red-600 dark:focus:ring-red-900 text-xs lg:text-lg"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="focus:outline-none text-black border bg-primary hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-1.5 py-1 lg:px-2 lg:py-1 dark:bg-accent dark:hover:bg-red-600 dark:focus:ring-red-900 text-xs lg:text-lg hover:text-white"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {isMenuExpand && (
            <ul className="bg-primary space-y-2 absolute top-16 right-0 w-48 px-4 py-6 border rounded-lg z-50">
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className={({ isActive }) =>
                    `block text-xs lg:text-lg font-bold transition duration-200 ${
                      isActive
                        ? "text-[#AC0404]"
                        : "bg-transparent text-black hover:text-[#AC0404]"
                    }`
                  }
                >
                  <FaRegUser className="inline-flex me-2" />
                  <span>My Profile</span>
                </NavLink>
              </li>

              <li className="block text-xs lg:text-lg font-bold transition duration-200 text-black hover:text-[#AC0404]">
                <button onClick={handleLogout} type="button" className="">
                  <IoExitOutline className="inline-flex me-2" />{" "}
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          )}
          {isMenuExpand && (
            <>
              <div
                onClick={() => setIsMenuExpand(false)}
                className="fixed inset-0 z-30"
              ></div>
            </>
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
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {/* navlinks from variable  */}
            {navLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
