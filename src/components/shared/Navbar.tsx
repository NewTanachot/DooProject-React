import { useContext } from "react";
import { Link } from "react-router-dom";
import { ActionContext } from "../../context/action";

const Navbar = () => {
  const { isLogin, currentUser, handleLogout } = useContext(ActionContext);
  return (
    <div className="navbar bg-base-100 w-full flex justify-between items-center bg-white sm:px-8  px-4 py-4 border-b border-b-[#e6ebf4]">
      <div>
        <Link to="/" className="text-xl">
          Logo
        </Link>
      </div>

      {isLogin && (
        <>
          <menu>
            <div>
              <ul className="menu menu-horizontal ">
                <li className="px-4 text-lg">
                  <Link to="/">สินค้า</Link>
                </li>
                <li className="px-4 text-lg">
                  <Link to="/log">รายการ</Link>
                </li>
              </ul>
            </div>
          </menu>
          <section>
            <h2 className="mr-2 font-semibold text-lg bg-black py-2 px-4 text-white rounded-lg">
              {currentUser}
            </h2>
            <div>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Navbar;
