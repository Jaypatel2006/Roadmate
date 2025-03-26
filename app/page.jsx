"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin 
} from 'lucide-react';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [cursorBlink, setCursorBlink] = useState(false);
  const words = ["Time", "Money", "Efforts"];

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 150;
    const nextText = words[index];

    if (!isDeleting && text === nextText) {
      setCursorBlink(true);
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setCursorBlink(false);
      setIndex((prev) => (prev + 1) % words.length);
    } else {
      setCursorBlink(false);
      const timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? prev.slice(0, -1) : nextText.slice(0, prev.length + 1)
        );
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [text, isDeleting, index, words]);

  const services = [
    { emoji: "🚛", title: "Towing Services", desc: "24/7 roadside assistance" },
    {
      emoji: "🚗",
      title: "Flat Tire Assistance",
      desc: "Quick tire replacement",
    },
    { emoji: "⛽", title: "Fuel Delivery", desc: "Fast fuel refilling" },
    {
      emoji: "🔋",
      title: "Battery Services",
      desc: "Jumpstarts and replacements",
    },
    {
      emoji: "🚙",
      title: "Vehicle Checkup & Repair",
      desc: "Comprehensive vehicle inspection",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center justify-start min-h-screen w-full px-6 text-center mt-20 md:mt-32">
        {/* Main Animated Text */}
        <motion.h1
          className="font-extrabold text-[5vw] md:text-[5vw] lg:text-[5vw] xl:text-[4vw] text-black leading-snug whitespace-nowrap"
          animate={{ opacity: [0, 1], scale: [0.9, 1] }}
          transition={{ duration: 1 }}
        >
          <span className="text-[6vw] md:text-[5vw] text-black">❝</span>
          We Are Here To Save Your <span className="text-blue-500">{text}</span>
          <span
            className={cursorBlink ? "animate-blink text-black" : "text-black"}
          >
            |
          </span>
          <span className="text-[6vw] md:text-[5vw] text-black">❞</span>
        </motion.h1>

        {/* Quote Below */}
        <p className="mt-6 text-[4vw] md:text-[2.5vw] lg:text-[2vw] text-gray-700 max-w-[80%] font-bold">
          “The road may be uncertain, but with the right help, every journey
          becomes a success. Drive with confidence, knowing assistance is always
          within reach.”
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 w-full max-w-[1200px] px-4">
  {/* Card 1 */}
  <motion.div
    className="p-6 rounded-2xl shadow-lg bg-white border border-green-400 min-h-[180px] transition-all duration-300"
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 8px 20px rgba(34, 197, 94, 0.5)", // Green glow
    }}
  >
    <h3 className="text-gray-700 font-semibold text-lg sm:text-xl text-center">
      Average Response Time
    </h3>
    <p className="text-4xl font-bold text-green-600 text-center mt-2">15 Mins</p>
    <div className="flex justify-center mt-3">
      <img src="/watch.png" alt="Watch" className="w-12 sm:w-16" />
    </div>
  </motion.div>

  {/* Card 2 */}
  <motion.div
    className="p-6 rounded-2xl shadow-lg bg-white border border-blue-400 min-h-[180px] transition-all duration-300"
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.5)", // Blue glow
    }}
  >
    <h3 className="text-gray-700 font-semibold text-lg sm:text-xl text-center">
      Anytime Services
    </h3>
    <p className="text-4xl font-bold text-blue-600 text-center mt-2">24x7</p>
    <div className="flex justify-center mt-3">
      <img src="/calander.png" alt="Calendar" className="w-12 sm:w-16" />
    </div>
  </motion.div>

  {/* Card 3 */}
  <motion.div
    className="p-6 rounded-2xl shadow-lg bg-white border border-red-400 min-h-[180px] transition-all duration-300"
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 8px 20px rgba(239, 68, 68, 0.5)", // Red glow
    }}
  >
    <h3 className="text-gray-700 font-semibold text-lg sm:text-xl text-center">
      Certified Technicians
    </h3>
    <p className="text-4xl font-bold text-red-600 text-center mt-2">2000+</p>
    <div className="text-center text-5xl mt-2">🔧</div>
  </motion.div>
</div>


        {/* Blinking Cursor Animation */}
        <style>
          {`
          @keyframes blink {
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 0.5s step-start infinite;
          }
        `}
        </style>
      </div><div className="flex flex-col items-center justify-center min-h-screen bg-[url('/back.png')] bg-cover bg-center bg-no-repeat px-8 relative">
  <div className="relative w-full max-w-6xl flex flex-col items-center">
    {/* Road Sign Heading */}
    <motion.h2
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 text-4xl font-bold text-white uppercase tracking-wide bg-green-900 px-8 py-4 rounded-lg shadow-lg border-4 border-white transform -rotate-3 mb-0"
      style={{
        background: "linear-gradient(145deg, #1a3c34, #0f2924)", // Green gradient for road sign
        width: "fit-content",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      Services Provided
      {/* Poles connecting to the road */}
      <div className="absolute -bottom-8 left-1/4 w-2 h-8 bg-gray-700 rounded-b"></div>
      <div className="absolute -bottom-8 right-1/4 w-2 h-8 bg-gray-700 rounded-b"></div>
    </motion.h2>

    {/* Road-like Design with SVG - Starts after heading */}
    <div className="relative w-full flex flex-col items-center">
      <svg
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-full z-0"
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
      >
        {/* Road Background */}
        <rect x="0" y="0" width="40" height="100%" fill="#4a4a4a" />
        {/* Yellow Center Line (Dashed) */}
        <path
          d="M 20 0 V 1000"
          stroke="#FFD700"
          strokeWidth="4"
          strokeDasharray="20 20"
        />
        {/* White Lane Markings on Sides */}
        <path
          d="M 5 0 V 1000"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="15 15"
        />
        <path
          d="M 35 0 V 1000"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="15 15"
        />
      </svg>

      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} // Changed to false so animation replays on every scroll
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className={`relative flex items-center w-full max-w-3xl my-12 mt-40 mb-5 ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {/* Side Connector Line */}
          <div
            className={`absolute w-16 h-1 bg-gray-600 ${
              index % 2 === 0 ? "right-1/2 mr-6" : "left-1/2 ml-6"
            } top-1/2 transform -translate-y-1/2`}
          ></div>

          {/* Service Card with Road-Inspired Border and Hover */}
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: index % 2 === 0 ? 2 : -2, // Matches previous dynamic tilt
              boxShadow: "0px 10px 30px rgba(30, 30, 30, 0.4)", // Yellow glow like road lines
            }}
            className="relative bg-white p-6 rounded-xl shadow-xl max-w-md w-[320px] text-center flex flex-col items-center transition-all duration-500 ease-in-out border-4 border-double border-gray-400"
            style={{
              background: "linear-gradient(145deg, #ffffff, #f0f0f0)", // Subtle road-like texture
            }}
          >
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }} // Changed to false for replay on scroll
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-4xl transition-transform duration-500"
            >
              {service.emoji}
            </motion.span>
            <h3 className="text-xl font-bold mt-2">{service.title}</h3>
            <p className="text-gray-600 text-sm opacity-80 transition-opacity duration-500">
              {service.desc}
            </p>
          </motion.div>
        </motion.div>
      ))}

      {/* Tree Design at the Bottom */}
      <div className="relative z-10 mt-12">
        <svg
          width="200"
          height="300"
          viewBox="0 0 200 300"
          className="w-48 h-72"
        >
          {/* Tree Trunk */}
          <rect
            x="90"
            y="150"
            width="20"
            height="150"
            fill="#5C4033"
            rx="5"
          />
          {/* Tree Foliage - Layered Circles */}
          <circle cx="100" cy="150" r="60" fill="#2E8B57" opacity="0.9" />
          <circle cx="80" cy="120" r="50" fill="#3CB371" opacity="0.85" />
          <circle cx="120" cy="110" r="45" fill="#66CDAA" opacity="0.8" />
          {/* Small Branches */}
          <path d="M 95 180 L 70 160" stroke="#5C4033" strokeWidth="3" />
          <path
            d="M 105 180 L 130 160"
            stroke="#5C4033"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
