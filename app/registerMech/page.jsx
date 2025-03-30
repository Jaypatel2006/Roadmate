"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const RegisterMechanic = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    latitude: null,
    longitude: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get User's Location
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setMessage("✅ Location captured successfully!");
          setTimeout(() => setMessage(""), 3000);
        },
        (error) => {
          setMessage(`❌ Error getting location: ${error.message}`);
          setTimeout(() => setMessage(""), 3000);
        }
      );
    } else {
      setMessage("❌ Geolocation not supported.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/registerMech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage("✅ Registration successful! Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setMessage(`❌ ${result.message || "Registration failed."}`);
      }
    } catch (error) {
      setMessage("❌ Error registering mechanic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full opacity-20 translate-x-32 translate-y-32"></div>

      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full border-t-4 border-blue-500 relative z-10 my-8 mx-4"
      >
        {/* Toggle switch for User/Mechanic */}
        <div className="flex justify-center mb-6 bg-gray-100 rounded-lg p-1">
          <div className="w-1/2">
            <Link href="/registeruser">
              <button className="w-full py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-all">
                User
              </button>
            </Link>
          </div>
          <div className="w-1/2">
            <button className="w-full py-2 text-white bg-blue-600 rounded-lg font-medium transition-all">
              Mechanic
            </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 tracking-tight">
          Join as a Technician
        </h2>

        <p className="text-center text-gray-600 mb-6">
          "The road may be uncertain, but with the right help, every journey becomes a success."
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
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
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-4">
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
              placeholder="Create a secure password"
            />
          </div>
          
          <div className="mb-4 pt-2">
            <div className="flex items-center mb-2">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <span className="text-sm text-gray-500">
                  {formData.latitude && formData.longitude 
                    ? "Location captured successfully!" 
                    : "We need your location to connect you with nearby customers"}
                </span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={getLocation}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-5 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get My Location
            </button>
          </div>
          
          <div className="mb-6 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Why Join Our Network?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Flexible hours with premium rates for off-hours
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Join our network of 2000+ certified technicians
              </li>
              <li className="flex items-center">
                <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Steady stream of customers through our platform
              </li>
            </ul>
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
            {loading ? "Registering..." : "Register as Mechanic"}
          </button>
        </form>

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

export default RegisterMechanic;
