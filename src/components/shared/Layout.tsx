import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: FC = () => {
  return (
    <>
      <div className="min-h-screen min-w-screen">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
