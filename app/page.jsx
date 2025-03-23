"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Poppins,} from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export default function Home() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [cursorBlink, setCursorBlink] = useState(false); // Controls blinking
  const words = ["Time", "Money", "Efforts"];

  useEffect(() => {
    

    const typingSpeed = isDeleting ? 100 : 150;
    const nextText = words[index];

    if (!isDeleting && text === nextText) {
      setCursorBlink(true); // Start blinking when fully typed
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setCursorBlink(false); // Stop blinking when deleting starts
      setIndex((prev) => (prev + 1) % words.length);
    } else {
      setCursorBlink(false); // No blinking while typing/deleting
      const timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? prev.slice(0, -1) : nextText.slice(0, prev.length + 1)
        );
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [text, isDeleting, index, words]);

  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen px-6 text-center"
           style={{ marginTop: "0vh" }} // Moves content to 25% height from top
      >
        {/* Main Animated Text */}
        <motion.h1
          className="font-extrabold text-5xl md:text-7xl text-black leading-snug whitespace-nowrap"
          animate={{ opacity: [0, 1], scale: [0.9, 1] }}
          transition={{ duration: 1 }}
        >
          <span className="text-7xl text-black">“</span>
          We Are Here To Save Your{" "}
          <span className="text-blue-500">{text}</span>
          <span className={cursorBlink ? "animate-blink text-black" : "text-black"}>
            |
          </span>
          <span className="text-7xl text-black">”</span>
        </motion.h1>

        {/* Quote Below */}
        <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-2xl">
          “The road may be uncertain, but with the right help, every journey becomes a success. 
          Drive with confidence, knowing assistance is always within reach.”
        </p>

        {/* Blinking Cursor Animation (Only when word is completed) */}
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
    </>
  );
}
