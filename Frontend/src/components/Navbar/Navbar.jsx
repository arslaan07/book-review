import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Profile",
      link: "/profile/settings",
    },
    {
        title: "Admin",
        link: "/profile/add-book",
      },
  ];
  const {isAuthenticated, role} = useSelector((state) => state.auth);
  if (isAuthenticated === false) {
    links.splice(1, 2);
  }
  else if(isAuthenticated && role === "admin") {
    links.splice(1,1)
  }
  else if(isAuthenticated && role === "user") {
    links.splice(2,2)
  }
  const [mobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative w-full flex bg-red-400 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="/NavBook.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold ">Book Review</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className={`hover:text-black transition-all duration-300 cursor-pointer ${
                  items.title === "Profile" || items.title === "Admin"
                    ? "hover:bg-white hover:text-black transition-all duration-300 border-2 border-blue-500 rounded-md px-2"
                    : ""
                }`}
                key={i}
              >
                {items.title}{" "}
              </Link>
            ))}
          </div>
          {isAuthenticated === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}

          <button
            className="text-white text-2xl md:hidden hover:text-zinc-400 "
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full mb-8 z-40 flex flex-col items-center justify-center gap-8`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`hover:text-blue-500 transition-all text-white duration-300 cursor-pointer ${
              items.title === "Profile" || items.title === "Admin"
                ? "hover:bg-white hover:text-black transition-all duration-300 border-2 border-blue-500 rounded-md px-2"
                : ""
            }`}
            key={i}
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}{" "}
          </Link>
        ))}
        {isAuthenticated === false && (
          <>
            <Link
              to="/login" onClick={() => setMobileNav("hidden")}
              className="px-4 py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to="/signup" onClick={() => setMobileNav("hidden")}
              className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;