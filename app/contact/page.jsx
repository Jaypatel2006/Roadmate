"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-12 mt-[5%]">
      {/* Hero Section */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-blue-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Contact Us
      </motion.h1>
      <p className="text-lg text-gray-700 text-center mt-4 max-w-2xl">
        Need assistance? Reach out to us anytime, and we'll get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <div className="mt-10 w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send us a message</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-center">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-72">
          <h3 className="text-xl font-semibold text-gray-800">📍 Location</h3>
          <p className="text-gray-600">123 Roadside St, Emergency City, USA</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-72">
          <h3 className="text-xl font-semibold text-gray-800">📞 Phone</h3>
          <p className="text-gray-600">+1 800 123 4567</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-72">
          <h3 className="text-xl font-semibold text-gray-800">✉️ Email</h3>
          <p className="text-gray-600">support@roadmate.com</p>
        </div>
      </div>

      {/* Google Map Placeholder */}
      <div className="mt-12 w-full max-w-4xl">
        <iframe
          className="w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509161!2d144.95373531550425!3d-37.81627974202137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f3a2f5%3A0x1db9b2b4a63e11fd!2sEmergency%20Assistance%20Center!5e0!3m2!1sen!2sus!4v1617773336161!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
