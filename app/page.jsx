"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [text, setText] = useState("Time");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const words = ["Time", "Money"];

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 150;
    const nextText = words[index];

    if (!isDeleting && text === nextText) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    } else {
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
      <div className="flex items-center flex-col h-[85vh] justify-center">
        <motion.div
          className="font-bold text-6xl text-black"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 1 }}
        >
          "We Are Here To Save Your{" "}
          <span className="text-blue-500">{text}</span>
          <span className="animate-blink">|</span>
        </motion.div>
        <div className="mt-6 text-4xl w-[55%] text-center font-semibold text-slate-500">
          RoadMate is a Place where you can find any Type of help related to
          your vehicle at any time Anywhere
        </div>
      </div>
      
    </>
  );
}
