import React from 'react'

const registeruser = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold text-center mb-6">Registration</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Username<span className="text-red-500">*</span></label>
          <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email<span className="text-red-500">*</span></label>
          <input type="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password<span className="text-red-500">*</span></label>
          <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password<span className="text-red-500">*</span></label>
          <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">Sign up</button>
      </form>
      <p className="text-right mt-4 text-gray-600 text-sm">
        <a href="#" className="text-blue-500 hover:underline">Login</a>
      </p>
    </div>
  </div>
  )
}

export default registeruser