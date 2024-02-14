import { useAuth } from "@/utils/context/AuthContext";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { isAuthen, email } = useAuth();
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  const navbarList = [
    { name: "Home", path: "/", must_login: false },
    { name: "Login", path: "/login", must_login: false },
    { name: "Register", path: "/register", must_login: false },
    { name: email, path: "/user", must_login: true },
  ];

  return (
    <nav className="bg-[#0A2468] border-gray-200 sticky top-0 z-50">
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
            {navbarList
              .filter(
                (v: { path: string; name: string; must_login: boolean }) => {
                  return v.must_login == isAuthen;
                }
              )
              .map((nav) => (
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
