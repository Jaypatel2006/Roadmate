"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
          router.push("/");
        }, 1500);
      } else {
        setMessage(`❌ ${data.error || "Registration failed."}`);
      }
    } catch (error) {
      setMessage("❌ Error registering user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden mt-[4%]">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full opacity-20 translate-x-32 translate-y-32"></div>

      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-96 border-t-4 border-blue-500 relative z-10 my-8"
      >
        {/* Toggle switch for User/Mechanic */}
        <div className="flex justify-center mb-6 bg-gray-100 rounded-lg p-1">
          <div className="w-1/2">
            <button className="w-full py-2 text-white bg-blue-600 rounded-lg font-medium transition-all">
              User
            </button>
          </div>
          <div className="w-1/2">
            <Link href="/registerMech">
              <button className="w-full py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-all">
                Mechanic
              </button>
            </Link>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-tight">
          Join RoadMate
        </h2>

        <p className="text-center text-gray-600 mb-6">
          "The road may be uncertain, but with the right help, every journey becomes a success."
        </p>

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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className={`w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* Benefits */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Why join RoadMate?</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center">
              <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Quick response time - average of 15 minutes
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              24/7 roadside assistance
            </li>
            <li className="flex items-center">
              <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              2000+ certified technicians nationwide
            </li>
          </ul>
        </div>

        {/* Login Link */}
        <p className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </motion.div>

      {/* Toast Notification */}
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