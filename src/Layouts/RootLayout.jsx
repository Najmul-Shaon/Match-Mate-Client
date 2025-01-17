import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";
import Footer from "../Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { BsCheck2Circle } from "react-icons/bs";

const RootLayout = () => {
  return (
    <div className="font-quickSand">
      <Toaster
        toastOptions={{
          error: {
            icon: (
              <TbAlertOctagonFilled
                size={24}
                color="red"
              ></TbAlertOctagonFilled>
            ),
          },
          success: {
            icon: <BsCheck2Circle size={24} color="green"></BsCheck2Circle>,
          },
        }}
      />
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
