"use client";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center text-center px-6 md:px-12 lg:px-24 py-12 w-full mt-[5%]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600">About Us</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          Providing 24/7 roadside assistance and emergency support to keep you safe on every journey.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-12 max-w-3xl"
      >
        <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
        <p className="mt-3 text-lg text-gray-600">
          We are committed to delivering fast, reliable, and affordable roadside assistance, ensuring
          that help is always just a call away when you need it most.
        </p>
      </motion.div>

      {/* Key Features */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-1 mt-12 w-[100%]  max-w-[900px]">
  {[
    { title: "24/7 Support", icon: "📞", text: "Round-the-clock emergency assistance." },
    { title: "Fast Response", icon: "⚡", text: "Average response time of 15 minutes." },
    { title: "Certified Technicians", icon: "🔧", text: "Skilled professionals at your service." }
  ].map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 w-[90%] mx-auto"
    >
      <div className="text-5xl">{feature.icon}</div>
      <h3 className="mt-3 text-xl font-semibold">{feature.title}</h3>
      <p className="mt-2 text-gray-600">{feature.text}</p>
    </motion.div>
  ))}
</div>


      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-16"
      >
      </motion.div>
    </div>
  );
}
