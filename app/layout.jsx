import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
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
      
      <link rel="icon" href="/logo.jpg" type="image/png" />
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        antialiased bg-gradient-to-b from-gray-100 to-gray-300 
        text-gray-900 min-h-screen flex flex-col`}
      >
        {/* Navbar - Sticky at top */}
        <div className="sticky top-0 z-50 bg-white shadow-md">
          <Navbar />
        </div>

        {/* Main Content - Responsive & Centered */}
        <main className="flex-grow container mx-auto px-6 py-10 max-w-4xl">
          {children}
        </main>

        {/* Footer Section */}
        <footer className="text-center py-6 text-gray-500">
          © {new Date().getFullYear()} RoadMate. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
