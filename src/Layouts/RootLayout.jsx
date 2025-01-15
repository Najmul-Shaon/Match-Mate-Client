import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <h1>This is the root</h1>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
