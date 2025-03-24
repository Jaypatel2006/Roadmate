"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-xl shadow-lg border-b border-gray-300"
          : "bg-white shadow-md"
      }`}
    >
      {/* Left Side - Logo */}
      <div className="flex items-center gap-4">
        <img
          src="logo.png"
          alt="RoadMate Logo"
          className="w-14 md:w-16 h-14 md:h-16 object-contain rounded-3xl"
        />
        <img
          src="name.jpg"
          alt="RoadMate"
          className="h-10 md:h-12 object-contain rounded-xl"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {["Home", "About us", "Contact"].map((link, index) => (
          <a
            key={index}
            href="#"
            className="text-black font-semibold transition-all transform hover:scale-105 hover:text-blue-600 duration-300"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Buttons for Desktop */}
      <div className="hidden md:flex">
        <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-l-full cursor-pointer hover:brightness-110 transition-all duration-300">
          Sign in
        </button>
        <button className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-5 py-2 rounded-r-full border-l border-gray-500 cursor-pointer hover:brightness-110 transition-all duration-300">
          Sign up
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-white shadow-md border-b border-gray-300 flex flex-col items-center space-y-6 py-6 md:hidden"
          >
            {["Home", "About us", "Contact"].map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-black font-semibold text-lg transition-all transform hover:scale-105 hover:text-blue-600 duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}

            {/* Mobile Buttons */}
            <div className="flex flex-col w-3/4 gap-3">
              <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-full cursor-pointer hover:brightness-110 transition-all duration-300">
                Sign in
              </button>
              <button className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-5 py-2 rounded-full cursor-pointer hover:brightness-110 transition-all duration-300">
                Sign up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
