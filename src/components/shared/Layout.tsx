import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: FC = () => {
  return (
    <>
      <div className="h-screen w-screen">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
