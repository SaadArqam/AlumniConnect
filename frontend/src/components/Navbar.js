"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-wide"
          >
            AlumniConnect
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/explore" className="hover:text-gray-300">Explore</Link>
            <Link href="/login" className="hover:text-gray-300">Login</Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2">
          <Link href="/" className="block hover:text-gray-300">Home</Link>
          <Link href="/explore" className="block hover:text-gray-300">Explore</Link>
          <Link href="/login" className="block hover:text-gray-300">Login</Link>
        </div>
      )}
    </nav>
  );
}
