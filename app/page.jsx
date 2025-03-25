"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

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
    { emoji: "🚗", title: "Flat Tire Assistance", desc: "Quick tire replacement" },
    { emoji: "⛽", title: "Fuel Delivery", desc: "Fast fuel refilling" },
    { emoji: "🔋", title: "Battery Services", desc: "Jumpstarts and replacements" },
    { emoji: "🚙", title: "Vehicle Checkup & Repair", desc: "Comprehensive vehicle inspection" },
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
        We Are Here To Save Your {" "}
        <span className="text-blue-500">{text}</span>
        <span className={cursorBlink ? "animate-blink text-black" : "text-black"}>|</span>
        <span className="text-[6vw] md:text-[5vw] text-black">❞</span>
      </motion.h1>

      {/* Quote Below */}
      <p className="mt-6 text-[4vw] md:text-[2.5vw] lg:text-[2vw] text-gray-700 max-w-[80%] font-bold">
        “The road may be uncertain, but with the right help, every journey becomes a success.
        Drive with confidence, knowing assistance is always within reach.”
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-15 mt-12 w-[100%] max-w-[1200px]">
        {/* Card 1 */}
        <motion.div
          className=" p-6 rounded-lg shadow-lg bg-white backdrop-blur-md border border-green-300 min-h-[180px]"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-gray-700 font-semibold text-[3vw] md:text-[1.5vw]">Average Response time</h3>
          <p className="text-[6vw] md:text-[3vw] font-bold text-purple-800">15 Mins</p>
          <div className="flex justify-center items-center">
         <img src="/watch.png" alt="Watch" className="w-[7vw] md:w-[5vw] ml-2rem"  />
         </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-white backdrop-blur-md border border-blue-300 min-h-[180px]"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-gray-700 font-semibold text-[3vw] md:text-[1.5vw]">Anytime Services</h3>
          <p className="text-[6vw] md:text-[3vw] font-bold text-black">24X7</p>
          <div className="flex justify-center items-center">
         <img src="/calander.png" alt="work all time" className="w-[7vw] md:w-[5vw] ml-2rem"  />
         </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-white backdrop-blur-md border border-red-300 min-h-[180px]"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-gray-700 font-semibold text-[3vw] md:text-[1.5vw]">Certified Technicians</h3>
          <p className="text-[6vw] md:text-[3vw] font-bold text-green-800">2000+</p>
          <span className="text-[5vw] md:text-[2vw]">🔧</span>
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
    </div>
   <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/back.png')] bg-cover bg-center bg-no-repeat px-8 relative">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center mb-16 text-white shadow-lg bg-black/40 px-6 py-3 rounded-lg"
      >
        Services Provided
      </motion.h2>

      <div className="relative w-full max-w-6xl flex flex-col items-center">
        {/* Vertical Zig-Zag Line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"></div>

        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`relative flex items-center w-full max-w-3xl my-12 ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {/* Side Connector Line */}
            <div
              className={`absolute w-10 h-1 bg-blue-500 ${
                index % 2 === 0 ? "right-1/2" : "left-1/2"
              } top-1/2 transform -translate-y-1/2`}
            ></div>

            {/* Service Card */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 1, boxShadow: "0px 10px 30px rgba(0, 0, 255, 0.3)" }}
              className="relative bg-white p-6 rounded-xl shadow-xl max-w-md w-[320px] text-center flex flex-col items-center transition-all duration-500 ease-in-out border-2 border-transparent hover:border-blue-500"
            >
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-4xl transition-transform duration-500"
              >
                {service.emoji}
              </motion.span>
              <h3 className="text-xl font-bold mt-2">{service.title}</h3>
              <p className="text-gray-600 text-sm opacity-80 transition-opacity duration-500">{service.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
    
  );
}
