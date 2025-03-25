"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function RegisterPage() {
  const router = useRouter(); // Initialize router

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    latitude: null,
    longitude: null,
  });

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
        },
        (error) => alert("Error getting location: " + error.message)
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  // Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/registerMech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (response.ok) {
      alert("Registration Successful!");
      router.push("/"); // Redirect to home page
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Mechanic Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Get Location
          </button>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
