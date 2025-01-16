import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Biodatas from "../Pages/Biodatas/Biodatas";
import BiodataDetails from "../Pages/Biodatas/BiodataDetails";
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
        path: "/biodata/:id",
        element: <BiodataDetails></BiodataDetails>,
      },
    ],
  },
]);

export default Router;
