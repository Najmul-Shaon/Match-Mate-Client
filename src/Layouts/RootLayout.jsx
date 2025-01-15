import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="font-quickSand">
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
