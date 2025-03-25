"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { motion } from "framer-motion"; // Import Framer Motion for animations

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // Initialize Next.js router

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (unchanged server logic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while registering

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Registration successful! Redirecting...");

        setTimeout(() => {
          router.push("/"); // Redirect to homepage
        }, 1500);
      } else {
        setMessage(`❌ ${data.error || "Registration failed."}`);
      }
    } catch (error) {
      setMessage("❌ Error registering user.");
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-200 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400 rounded-full opacity-20 translate-x-32 translate-y-32"></div>

      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-96 transform hover:scale-105 transition-transform duration-300 border-t-4 border-yellow-500 relative z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-tight">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Username<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gray-50"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gray-50"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gray-50"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className={`w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 ${
              loading
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 shadow-lg hover:shadow-xl cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-right mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="#" className="text-yellow-500 font-medium hover:underline">
            Login
          </a>
        </p>
      </motion.div>

      {/* Toast Notification at Bottom Right */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className={`fixed bottom-4 right-4 p-4 rounded-lg text-sm font-semibold shadow-lg z-20 ${
            message.includes("✅")
              ? "bg-green-500 text-white border border-green-600"
              : "bg-red-500 text-white border border-red-600"
          }`}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
};

export default RegisterUser;