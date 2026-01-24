"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-rose-50 p-32">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Login
        </h1>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="you@google.com"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Password
            </label>
            <input
              type="password"
              placeholder="at least 6 characters"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            />
          </div>

          {/* Login Button */}
          <Link
            href="/food"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition inline-block text-center"
          >
            Login
          </Link>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Belum punya akun? <span className="text-blue-600">Daftar</span>
        </p>
      </div>
    </div>
  );
}
