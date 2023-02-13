import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 flex justify-between items-center border-b-2">
      <div>
        <a className="text-xl">Logo</a>
      </div>
      <div>
        <ul className="menu menu-horizontal">
          <li className="px-4">
            <a>สินค้า</a>
          </li>
          <li>
            <a>รายการ</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
