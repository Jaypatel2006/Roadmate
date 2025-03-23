"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  return (
    <div className="flex flex-col items-center justify-start h-screen px-6 text-center mt-40">
      {/* Main Animated Text */}
      <motion.h1

        className="font-extrabold text-5xl md:text-7xl text-black leading-snug whitespace-nowrap"
        animate={{ opacity: [0, 1], scale: [0.9, 1] }}
        transition={{ duration: 1 }}
      >
        <span className="text-7xl text-black">❝</span>
        We Are Here To Save Your{" "}
        <span className="text-blue-500">{text}</span>
        <span className={cursorBlink ? "animate-blink text-black" : "text-black"}>|</span>
        <span className="text-7xl text-black">❞</span>
      </motion.h1>

      {/* Quote Below */}
      <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-2xl font-bold">
        “The road may be uncertain, but with the right help, every journey becomes a success.
        Drive with confidence, knowing assistance is always within reach.”
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-35 w-full max-w-5xl">
        {/* Card 1 */}
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-green-200/80 backdrop-blur-md border border-green-300"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-gray-700 font-semibold">Average Response time</h3>
          <p className="text-3xl font-bold text-purple-800">15 Mins</p>
          <span className="text-2xl">⏱️</span>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-blue-200/80 backdrop-blur-md border border-blue-300"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-gray-700 font-semibold">Anytime Services</h3>
          <p className="text-3xl font-bold text-black">24X7</p>
          <span className="text-2xl">📅</span>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-red-200/80 backdrop-blur-md border border-red-300"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-gray-700 font-semibold">Certified Technicians</h3>
          <p className="text-3xl font-bold text-green-800">2000+</p>
          <span className="text-2xl">🔧</span>
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
  );
}
