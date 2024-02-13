import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  // const auth = useContext(AuthContext);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  const navbarList = [
    { name: "Home", path: "/" },
    { name: "login", path: "/login" },
    { name: "register", path: "/register" },
    { name: "user", path: "/user" },
  ];

  return (
    <nav className="bg-blue-600 border-gray-200 dark:bg-gray-900 sticky top-0 z-50">
      <div className="min-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="pl-3 md:text-2xl text-white font-bold">
          <h1>Login Sample</h1>
        </Link>

        {/* NavList */}
        <div
          className={
            showMenu
              ? "w-full md:block md:w-auto"
              : "hidden w-full md:block md:w-auto"
          }
        >
          <ul className="font-medium flex flex-col items-center p-2 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {navbarList.map((nav) => (
              <Link
                className={
                  pathname == nav.path
                    ? "block py-1 px-4 text-white rounded-2xl bg-lightblue"
                    : "block py-1 px-4 text-white rounded-2xl hover:bg-lightblue transition-all duration-100 ease-linear hover:scale-105"
                }
                key={nav.path}
                to={nav.path}
              >
                {nav.name}
              </Link>
            ))}
            {/* Check Auth Login */}
            {/* {auth?.authContext.isAuthenticated ? (
              <UserNavbar
                email={auth.authContext.email}
                userName={auth.authContext.userName}
                profileUrl={auth.authContext.profileUrl}
              />
            ) : (
              <Link
                className=" text-gray-800 hover:bg-lightblue hover:text-white px-3 py-1 bg-gray-200 rounded-full transition ease-linear duration-200 hover:scale-105"
                to="/login"
              >
                เข้าสู่ระบบ
              </Link>
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
