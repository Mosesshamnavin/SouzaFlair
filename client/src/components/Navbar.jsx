import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const location = useLocation();

  // Check if we are on the homepage
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Set initial scroll state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar styles based on scroll position and route
  const navBgClass = isHomePage
    ? isScrolled
      ? "bg-primary/95 backdrop-blur-md py-4 border-b border-secondary/15 shadow-xl text-white"
      : "bg-transparent py-6 text-white"
    : "bg-primary/98 backdrop-blur-md py-4 border-b border-secondary/15 shadow-xl text-white";

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-center justify-between ${navBgClass}`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <img
          src={assets.SF_logo}
          className="h-10 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          alt="SouzaFlair"
        />
        <div className="flex flex-col">
          <span className="font-serif text-lg sm:text-xl tracking-[0.2em] font-semibold text-secondary leading-none">
            SOUZA
          </span>
          <span className="font-sans text-[8px] tracking-[0.4em] text-accent mt-0.5 leading-none">
            FLAIR
          </span>
        </div>
      </Link>

      {/* Nav Links (Desktop) */}
      <ul className="hidden sm:flex gap-8 text-xs tracking-[0.2em] font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1.5 transition-colors duration-300 ${
              isActive ? "text-secondary font-semibold" : "text-white/80 hover:text-white"
            }`
          }
        >
          <p className="hover-underline">HOME</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-secondary hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1.5 transition-colors duration-300 ${
              isActive ? "text-secondary font-semibold" : "text-white/80 hover:text-white"
            }`
          }
        >
          <p className="hover-underline">COLLECTION</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-secondary hidden" />
        </NavLink>
        <NavLink
          to="/wardrobe"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1.5 transition-colors duration-300 ${
              isActive ? "text-secondary font-semibold" : "text-white/80 hover:text-white"
            }`
          }
        >
          <p className="hover-underline">WARDROBE</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-secondary hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1.5 transition-colors duration-300 ${
              isActive ? "text-secondary font-semibold" : "text-white/80 hover:text-white"
            }`
          }
        >
          <p className="hover-underline">ABOUT</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-secondary hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1.5 transition-colors duration-300 ${
              isActive ? "text-secondary font-semibold" : "text-white/80 hover:text-white"
            }`
          }
        >
          <p className="hover-underline">CONTACT</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-secondary hidden" />
        </NavLink>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-5 sm:gap-6">
        {/* Search */}
        <button
          onClick={() => setShowSearch(true)}
          className="focus:outline-none focus:text-secondary text-white/90 transition-all"
          aria-label="Search products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 cursor-pointer hover:text-secondary hover:scale-115 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Profile Dropdown */}
        <div className="group relative">
          <button className="focus:outline-none focus:text-secondary text-white/90 transition-all" aria-label="User profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 cursor-pointer hover:text-secondary hover:scale-115 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
            <div className="flex flex-col gap-2.5 w-40 py-4 px-5 bg-primary/95 border border-secondary/20 glass-panel-dark text-white/90 rounded-md shadow-2xl">
              <Link to="/login" className="cursor-pointer hover:text-secondary transition-colors duration-300 text-xs tracking-wider">
                My Profile
              </Link>
              <Link to="/order" className="cursor-pointer hover:text-secondary transition-colors duration-300 text-xs tracking-wider">
                Orders
              </Link>
              <p className="cursor-pointer hover:text-secondary transition-colors duration-300 text-xs tracking-wider border-t border-white/10 pt-2">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative focus:outline-none focus:text-secondary text-white/90 transition-all"
          aria-label="View shopping cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 cursor-pointer hover:text-secondary hover:scale-115 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary text-primary font-serif font-bold text-[9px] flex items-center justify-center rounded-full shadow-md animate-pulse">
            {getCartCount()}
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setVisible(true)}
          className="focus:outline-none focus:text-secondary text-white/90 sm:hidden transition-all"
          aria-label="Open navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 cursor-pointer hover:text-secondary hover:scale-105 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* SideBar menu for small screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 bg-primary/98 border-l border-secondary/20 transition-all duration-500 ease-in-out overflow-hidden shadow-2xl flex flex-col ${
          visible ? "w-full sm:w-[350px]" : "w-0"
        }`}
      >
        <div className="flex flex-col text-white/90 p-6 h-full">
          {/* Close menu button */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 cursor-pointer self-start mb-10 hover:text-secondary transition-colors duration-300 text-sm tracking-widest"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 rotate-180 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <p>CLOSE</p>
          </div>

          <div className="flex flex-col gap-6 font-serif text-lg tracking-[0.25em] pl-4">
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `hover:text-secondary transition-colors duration-300 py-2 border-b border-white/5 ${
                  isActive ? "text-secondary font-bold" : ""
                }`
              }
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `hover:text-secondary transition-colors duration-300 py-2 border-b border-white/5 ${
                  isActive ? "text-secondary font-bold" : ""
                }`
              }
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `hover:text-secondary transition-colors duration-300 py-2 border-b border-white/5 ${
                  isActive ? "text-secondary font-bold" : ""
                }`
              }
              to="/wardrobe"
            >
              WARDROBE
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `hover:text-secondary transition-colors duration-300 py-2 border-b border-white/5 ${
                  isActive ? "text-secondary font-bold" : ""
                }`
              }
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `hover:text-secondary transition-colors duration-300 py-2 border-b border-white/5 ${
                  isActive ? "text-secondary font-bold" : ""
                }`
              }
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>

          {/* Side drawer footer */}
          <div className="mt-auto text-center border-t border-white/10 pt-6">
            <img src={assets.SF_logo} className="h-8 mx-auto mb-3 opacity-60" alt="SF logo" />
            <p className="text-[10px] tracking-[0.3em] text-accent uppercase">
              Where Elegance Meets Expression
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
