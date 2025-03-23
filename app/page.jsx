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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 text-center mt-20 md:mt-40">
      <motion.h1
        className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black leading-snug"
        animate={{ opacity: [0, 1], scale: [0.9, 1] }}
        transition={{ duration: 1 }}
      >
        <span className="text-6xl md:text-7xl text-black">❝</span>
        We Are Here To Save Your <span className="text-blue-500">{text}</span>
        <span className={cursorBlink ? "animate-blink text-black" : "text-black"}>|</span>
        <span className="text-6xl md:text-7xl text-black">❞</span>
      </motion.h1>

      <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl font-bold">
        “The road may be uncertain, but with the right help, every journey becomes a success.
        Drive with confidence, knowing assistance is always within reach.”
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-5xl px-4">
        <motion.div className="p-6 rounded-lg shadow-lg bg-green-200/80 border border-green-300" whileHover={{ scale: 1.05 }}>
          <h3 className="text-gray-700 font-semibold">Average Response time</h3>
          <p className="text-3xl font-bold text-purple-800">15 Mins ⏱️</p>
        </motion.div>

        <motion.div className="p-6 rounded-lg shadow-lg bg-blue-200/80 border border-blue-300" whileHover={{ scale: 1.05 }}>
          <h3 className="text-gray-700 font-semibold">Anytime Services</h3>
          <p className="text-3xl font-bold text-black">24X7 📅</p>
        </motion.div>

        <motion.div className="p-6 rounded-lg shadow-lg bg-red-200/80 border border-red-300" whileHover={{ scale: 1.05 }}>
          <h3 className="text-gray-700 font-semibold">Certified Technicians</h3>
          <p className="text-3xl font-bold text-green-800">2000+ 🔧</p>
        </motion.div>
      </div>

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
