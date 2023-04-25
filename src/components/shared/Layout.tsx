import React, { FC } from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
