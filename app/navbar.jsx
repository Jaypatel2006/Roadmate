import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-md bg-white">
      {/* Left Side - Logo & Name */}
      <div className="flex items-center gap-3">
        <img
          src="logo.jpg" // Replace with actual logo path
          alt="RoadMate Logo"
          className="w-18 h-18 object-contain rounded-4xl"
        />
        <img
          src="name.jpg" // Replace with actual name path
          alt="RoadMate"
          className="h-17 object-contain rounded-2xl"
        />
        <p>welcome</p>
      </div>

      {/* Middle - Navigation Links */}
      <div className="bg-gray-200 px-6 py-2 rounded-full flex items-center gap-6">
        <a href="#" className="text-black font-medium hover:underline">
          Home
        </a>
        <a href="#" className="text-black font-medium hover:underline">
          About us
        </a>
        <a href="#" className="text-black font-medium hover:underline">
          Contact
        </a>

        {/* Right Side - Buttons */}
        <div className="flex">
          <button className="bg-black text-white px-5 py-2 rounded-l-full">
            Sign in
          </button>
          <button className="bg-black text-white px-5 py-2 rounded-r-full border-l border-gray-400">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
