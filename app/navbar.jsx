"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-xl shadow-lg border-b border-gray-300"
          : "bg-white shadow-md"
      }`}
    >
      {/* Left Side - Logo */}
      <div className="flex items-center gap-4">
        <img
          src="logo.jpg"
          alt="RoadMate Logo"
          className="w-16 h-16 object-contain rounded-3xl"
        />
        <img
          src="name.jpg"
          alt="RoadMate"
          className="h-12 object-contain rounded-xl"
        />
      </div>

      {/* Right Side - Navigation Links & Buttons */}
      <div className="flex items-center gap-6">
        {/* Navigation Links */}
        <div className="flex gap-6">
          {["Home", "About us", "Contact"].map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-black font-semibold transition-transform transform hover:scale-105 hover:text-blue-600 duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex">
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-l-full cursor-pointer hover:brightness-110 transition-all duration-300">
            Sign in
          </button>
          <button className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-2 rounded-r-full border-l border-gray-500 cursor-pointer hover:brightness-110 transition-all duration-300">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
