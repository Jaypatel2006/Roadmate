'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar.jsx";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarPaths = [];
  const shouldShowNavbar = !hideNavbarPaths.includes(pathname);

  return (
    <html lang="en">
      
      <link rel="icon" type="image/png" sizes="1024x1024" href="/logo-1024x1024.png"/>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        antialiased bg-gradient-to-b from-gray-100 to-gray-300 
        text-gray-900 min-h-screen flex flex-col`}
      >
        {/* Navbar - Sticky at top */}
        {shouldShowNavbar && <Navbar />}

        {children}

        {/* Footer Section */}
        <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">RoadMate</h3>
          <p className="text-gray-400 mb-4">
            Innovative solutions for Roadside Emergency.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="\aboutus" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="\contact" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Towing & Roadside Assistance</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Vehicle Recovery & Specialized Towing</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Vehicle Care & Maintenance</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Emergency & Safety Services</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Mail size={20} className="text-gray-400" />
              <span>RoadMate@company.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={20} className="text-gray-400" />
              <span>123 Tech Lane, SVNIT Surat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} RoadMate. All Rights Reserved.
        </p>
      </div>
    </footer>
      </body>
    </html>
  );
}
