"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ← yeh hook lagaya

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("yaha tak aayaa");
    if (data.status == 200) {
      setTimeout(() => {
        router.push('/main');
      }, 1000);
      
    } else {
      alert(data.message || "Login failed");
    }

    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="px-8 pt-12 pb-8 bg-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 mt-2">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                  className="pl-10 pr-4 py-3 block w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-4 py-3 block w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
                />
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 group"
              >
                Log In
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </button>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-50 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/registeruser"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
