import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();

  // Automatically close search bar when routing away
  useEffect(() => {
    setShowSearch(false);
  }, [location, setShowSearch]);

  if (!showSearch) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full z-45 bg-primary/95 backdrop-blur-md border-b border-secondary/25 pt-28 pb-8 px-4 flex items-center justify-center shadow-2xl animate-fade-in"
      style={{
        animation: "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {/* Slide down keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}} />

      <div className="w-full max-w-2xl flex items-center gap-4 relative">
        {/* Search Bar Container */}
        <div className="flex-grow flex items-center bg-primary/60 border border-secondary/30 focus-within:border-secondary transition-colors duration-300 rounded-sm px-5 py-3.5">
          <input
            type="text"
            placeholder="Search our collection..."
            className="flex-grow bg-transparent text-sm text-white placeholder-accent/40 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-secondary"
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
        </div>

        {/* Close Button */}
        <button
          onClick={() => setShowSearch(false)}
          className="p-3 text-white/70 hover:text-secondary transition-colors duration-300 cursor-pointer"
          aria-label="Close search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
