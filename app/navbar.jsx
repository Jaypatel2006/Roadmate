'use client'
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 sm:px-8 py-4 flex justify-between items-center z-50 transition-all duration-300 ${
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
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-3xl"
        />
        <img
          src="name.jpg"
          alt="RoadMate"
          className="h-10 sm:h-12 object-contain rounded-xl"
        />
      </div>

      {/* Right Side - Navigation Links & Buttons */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex gap-6">
          {['Home', 'About us', 'Contact'].map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-black font-semibold transition-transform transform hover:scale-105 hover:text-blue-600 duration-300"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex">
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-l-full hover:brightness-110 transition-all duration-300">
            Sign in
          </button>
          <button className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-2 rounded-r-full border-l border-gray-500 hover:brightness-110 transition-all duration-300">
            Sign up
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        {isMobileMenuOpen ? (
          <X className="w-8 h-8 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
        ) : (
          <Menu className="w-8 h-8 cursor-pointer" onClick={() => setIsMobileMenuOpen(true)} />
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white bg-opacity-90 z-40 flex flex-col items-center justify-center gap-8">
          {['Home', 'About us', 'Contact'].map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-black text-xl font-semibold transition-transform transform hover:scale-105 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="flex flex-col gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:brightness-110 transition-all duration-300">
              Sign in
            </button>
            <button className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-8 py-3 rounded-full hover:brightness-110 transition-all duration-300">
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
