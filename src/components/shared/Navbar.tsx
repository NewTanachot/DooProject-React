import { useContext } from "react";
import { Link } from "react-router-dom";
import { ActionContext } from "../../context/action";

const Navbar = () => {
  const { isLogin } = useContext(ActionContext);
  return (
    <div className="navbar bg-base-100 fw-full flex justify-between items-center bg-white sm:px-8  px-4 py-4 border-b border-b-[#e6ebf4]">
      <div>
        <Link to="/" className="text-xl">
          Logo
        </Link>
      </div>

      {isLogin && (
        <menu>
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
          <div>
            <button className="btn btn-primary">Logout</button>
          </div>
        </menu>
      )}
    </div>
  );
};

export default Navbar;
