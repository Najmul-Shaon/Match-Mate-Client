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
        path: "/biodata/:id",
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
        path: "/checkout/:id",
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
        element: <BiodataCreateEdit></BiodataCreateEdit>,
      },
      {
        path: "myRequested",
        element: <h3>My myRequested</h3>,
      },
      {
        path: "myFavorites",
        element: <h3>My myFavorites</h3>,
      },
    ],
  },
]);

export default Router;
