import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 pb-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] select-none">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16">
        
        {/* Brand legacy column */}
        <div className="md:col-span-6 flex flex-col items-start">
          <div className="flex items-center gap-2.5 mb-6 group">
            <img
              src={assets.SF_logo}
              className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              alt="SF Logo"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.2em] font-semibold text-secondary leading-none">
                SOUZA
              </span>
              <span className="font-sans text-[8px] tracking-[0.4em] text-accent mt-0.5 leading-none">
                FLAIR
              </span>
            </div>
          </div>
          <p className="font-sans text-xs tracking-wider text-surface/70 leading-relaxed max-w-md">
            Souza Flair is a luxury fashion house dedicated to crafting modern elegance. We combine architectural tailoring with fine fabrics to compose visual expressions of identity, ensuring every piece in our collection is a timeless masterpiece.
          </p>
          
          {/* Social media icons (SVG) */}
          <div className="flex items-center gap-4 mt-6">
            <a href="#" className="w-9 h-9 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 group" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 6.5h.01" />
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth={2} />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 group" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 group" aria-label="Pinterest">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.59 2.3A10.74 10.74 0 0 0 1 12c0 4.1 2.3 7.66 5.7 9.46.08-.82.16-2.1.34-3l1.83-7.75s-.47-.94-.47-2.33c0-2.18 1.27-3.8 2.84-3.8 1.34 0 1.98 1 1.98 2.2 0 1.34-.86 3.35-1.3 5.21-.37 1.57.78 2.85 2.33 2.85 2.8 0 4.96-2.95 4.96-7.22 0-3.77-2.71-6.42-6.59-6.42-4.5 0-7.13 3.37-7.13 6.85 0 1.36.52 2.81 1.18 3.6a.46.46 0 0 1 .1.43l-.44 1.83a.4.4 0 0 1-.3.26C3.96 14.88 3.5 13 3.5 11.23c0-4.93 3.59-9.46 10.33-9.46 5.42 0 9.63 3.86 9.63 9 0 5.4-3.4 9.73-8.1 9.73-1.58 0-3.07-.82-3.58-1.8l-.98 3.73c-.35 1.37-1.3 3.09-1.95 4.14A10.78 10.78 0 0 0 23 12c0-5.36-4.34-9.7-9.7-9.7z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Company links column */}
        <div className="md:col-span-3">
          <h3 className="font-serif text-sm font-semibold tracking-[0.2em] text-secondary uppercase mb-6">
            Company
          </h3>
          <ul className="flex flex-col gap-3 font-sans text-xs tracking-wider text-surface/70">
            <li>
              <Link to="/" className="hover:text-white transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-white transition-colors duration-300">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors duration-300">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors duration-300">
                Bespoke Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Support info column */}
        <div className="md:col-span-3">
          <h3 className="font-serif text-sm font-semibold tracking-[0.2em] text-secondary uppercase mb-6">
            Contact
          </h3>
          <ul className="flex flex-col gap-3 font-sans text-xs tracking-wider text-surface/70">
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-secondary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.099.281L9.05 7.7a10 10 0 002.25 2.25l1.5-1.51a1 1 0 01.28-.1l2.2.55a1 1 0 01.73.94V19a2 2 0 01-2 2h-1C7.82 21 3 16.18 3 10V5z" />
              </svg>
              <span>+91 994-488-3319</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-secondary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>concierge@souzaflair.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright panel */}
      <div className="border-t border-secondary/10 pt-8 mt-4">
        <p className="text-center text-[10px] tracking-[0.25em] text-surface/50 font-sans uppercase">
          Copyright © {currentYear} Souza Flair - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
