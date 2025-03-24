import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar.jsx";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Next.js App with Google Fonts",
  description: "Using modern fonts in Next.js with enhanced styling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <link rel="icon" type="image/png" sizes="1024x1024" href="/logo-1024x1024.png"/>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        antialiased bg-gradient-to-b from-gray-100 to-gray-300 
        text-gray-900 min-h-screen flex flex-col`}
      >
        {/* Navbar - Sticky at top */}
        <Navbar />

        {children}

        {/* Footer Section */}
        <footer className="text-center py-6 text-gray-500">
          © {new Date().getFullYear()} RoadMate. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
