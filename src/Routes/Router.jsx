import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Biodatas from "../Pages/Biodatas/Biodatas";
import BiodataDetails from "../Pages/Biodatas/BiodataDetails";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Dashboard from "../Layouts/Dashboard";
import BiodataCreateEdit from "../Dashboard/BiodataCreateEdit/BiodataCreateEdit";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import MyBiodata from "../Dashboard/MyBiodata/MyBiodata";
import MyRequestedContact from "../Dashboard/MyRequestedContact/MyRequestedContact";
import MyFavorites from "../Dashboard/MyFavorites/MyFavorites";
import ManageUsers from "../Dashboard/Admin/ManageUsers/ManageUsers";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "biodatas",
        element: <Biodatas></Biodatas>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/biodata/details/:biodataId",
        element: (
          <PrivateRoute>
            <BiodataDetails></BiodataDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/checkout/:biodataId",
        element: (
          <PrivateRoute>
            <CheckOut></CheckOut>
          </PrivateRoute>
        ),
      },
    ],
  },
  // dashboard page
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // normal users
      {
        path: "viewBiodata",
        element: (
          <PrivateRoute>
            <MyBiodata></MyBiodata>
          </PrivateRoute>
        ),
      },
      {
        path: "editBiodata",
        element: (
          <PrivateRoute>
            <BiodataCreateEdit></BiodataCreateEdit>
          </PrivateRoute>
        ),
      },
      {
        path: "myRequested",
        element: (
          <PrivateRoute>
            <MyRequestedContact></MyRequestedContact>
          </PrivateRoute>
        ),
      },
      {
        path: "myFavorites",
        element: (
          <PrivateRoute>
            <MyFavorites></MyFavorites>
          </PrivateRoute>
        ),
      },
      // admin sections
      {
        path: "adminHome",
        element: <h3>Admin home</h3>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "approvedPremium",
        element: <h3>premium home</h3>,
      },
      {
        path: "approvedContact",
        element: <h3>Contact home</h3>,
      },
    ],
  },
]);

export default Router;
