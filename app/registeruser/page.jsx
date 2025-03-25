"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [notification, setNotification] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Registration failed.");

      setNotification("User registered successfully!");

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 p-6">
      <div className="flex bg-white p-8 rounded-2xl shadow-xl w-[700px]">
        {/* Image Section */}
        <div className="w-1/2 flex justify-center items-center">
          <img src="/user.png" alt="User" className="w-48 h-48 object-cover rounded-lg shadow-lg" />
        </div>

        {/* Form Section */}
        <div className="w-1/2 pl-6">
          {/* Toggle Button */}
          <div className="flex justify-between mb-4">
            <button className="w-1/2 p-2 text-center bg-blue-600 text-white rounded-l-lg">User</button>
            <Link href="/registerMech" className="w-1/2">
              <button className="w-full p-2 text-center bg-gray-300 rounded-r-lg hover:bg-blue-600 hover:text-white transition-all">
                Mechanic
              </button>
            </Link>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">User Registration</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />

            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all">
              Register
            </button>
          </form>
        </div>
      </div>

      {/* Notification Message */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
}
