// src/components/Header.tsx
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h2
            className="text-3xl font-bold pt-10 "
            style={{ fontFamily: "IVY Mode, Sans-serif" }}
          >
            LIKHAWAT
          </h2>
          <span className="text-2xl">Printing Press</span>
        </div>

        {/* Right: Burger Menu */}
        <div className="ml-auto text-white text-xl cursor-pointer" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          } shadow-lg`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Menu Content */}
        <div className="flex flex-col gap-6 px-6 py-6 text-base uppercase font-medium">
          <Link to="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/careers" onClick={() => setMenuOpen(false)}>Careers</Link>
          <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          <hr />

          {/* <div className="flex space-x-4 text-lg">
            <FaSearch className="cursor-pointer" />
            <FaUser className="cursor-pointer" />
            <FaShoppingBag className="cursor-pointer" />
          </div> */}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
