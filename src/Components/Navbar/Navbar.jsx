import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollY = window.scrollY;
  function handleScroll() {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    lastScrollY = window.scrollY;
  }
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  let navigate = useNavigate();
  let { UserLogin, setUserLogin } = useContext(UserContext);
  let { countCart } = useContext(CartContext);

  function Logout() {
    setUserLogin(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <>
      <nav
        className={`bg-white/60 backdrop-blur-md shadow-md py-2 transition-transform duration-300 lg:fixed w-full left-0 right-0 z-30 ${
          showNavbar ? "lg:translate-y-0" : "lg:-translate-y-full"
        }`}
      >
        <div className="container  mx-auto flex flex-col  lg:flex-row lg:justify-between">
          <div className="flex flex-col md:flex-row md:justify-center ">
            <img width={130} src={Logo} alt="" />
            <ul className="flex  flex-col md:flex-row  ">
              {UserLogin !== null ? (
                <>
                  <li className="text-md font-medium text-slate-800 mx-2 my-3 px-3 lg:px-0 ">
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li className="text-md font-medium text-slate-800 mx-2 my-3 px-3 lg:px-0 ">
                    <NavLink to={"cart"}>Cart</NavLink>
                  </li>
                  <li className="text-md font-medium text-slate-800 mx-2 my-3 px-3 lg:px-0 ">
                    <NavLink to={"allorders"}>My Orders</NavLink>
                  </li>
                  <li className="text-md font-medium text-slate-800 mx-2 my-3 px-3 lg:px-0 ">
                    <NavLink to={"wishlist"}>Wish List</NavLink>
                  </li>
                  <li className="text-md font-medium text-slate-800 mx-2 my-3 px-3 lg:px-0 ">
                    <NavLink to={"categories"}>Categories</NavLink>
                  </li>
                  <li className="text-md font-medium text-slate-800 mx-2 my-3 px-3 lg:px-0 ">
                    <NavLink to={"brands"}>Brands</NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <ul className="flex  flex-col md:flex-row md:justify-center md:pt-2 lg:pt-0">
            {UserLogin === null ? (
              <>
                <li className="text-md text-slate-800 mx-2  my-1 p-2 font-semibold">
                  <NavLink className=" p-3  lg:p-0 " to={"login"}>
                    Login
                  </NavLink>{" "}
                </li>
                <li className="text-md text-white mx-2  my-1 bg-green-500 rounded-xl p-2 font-semibold ">
                  <NavLink className=" p-3  lg:p-0  " to={"register"}>
                    Register
                  </NavLink>{" "}
                </li>
              </>
            ) : null}
            {UserLogin !== null ? (
              <>
                <li className="text-md font-medium text-gray-600 hover:text-gray-900 transition duration-300 mx-3 my-3 px-3 lg:px-0 relative">
                  <NavLink to={"cart"}>
                    <i className="fa-solid fa-cart-shopping fa-2xl  ">
                      {countCart > 0 && (
                        <div className="absolute lg:-top-2 lg:-right-2 md:-top-3 md:right-1 right-0 top-0 text-white text-xs z-10 bg-green-600 pt-0.5 px-1.5 rounded-sm">
                          {countCart}
                        </div>
                      )}
                    </i>
                  </NavLink>
                </li>
                <li
                  onClick={Logout}
                  className="text-md text-white mx-2  my-1 cursor-pointer  bg-green-600 rounded-xl p-2 font-semibold hover:bg-green-700 transition duration-300"
                >
                  <span className=" p-3  lg:p-0 ">Logout</span>{" "}
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </nav>
    </>
  );
}
