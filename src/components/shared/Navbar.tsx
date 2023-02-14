import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 fw-full flex justify-between items-center bg-white sm:px-8  px-4 py-4 border-b border-b-[#e6ebf4]">
      <div>
        <Link to="/" className="text-xl">
          Logo
        </Link>
      </div>
      <div>
        <ul className="menu menu-horizontal">
          <li className="px-4">
            <Link to="/">สินค้า</Link>
          </li>
          <li className="px-4">
            <Link to="/log">รายการ</Link>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
