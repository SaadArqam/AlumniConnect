"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(t);

    function onStorage(e) {
      if (e.key === "token") setToken(e.newValue);
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken(null);
    router.push("/");
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0a0a0b]/60 border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-white text-xl font-semibold tracking-wide">
          AlumniConnect
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-gray-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/chat" className="hover:text-white">Chat</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex">
          {!token ? (
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition text-white font-medium"
            >
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition text-white font-medium">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu className="w-6 h-6 text-gray-200" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0b0b0c]/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-3">
          <Link href="/" className="block text-gray-300">Home</Link>
          <Link href="/chat" className="block text-gray-300">Chat</Link>
          <Link href="/about" className="block text-gray-300">About</Link>
          {!token ? (
            <Link
              href="/login"
              className="block mt-2 w-full text-center py-2 rounded-xl bg-red-500 hover:bg-red-600 transition text-white"
            >
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="block mt-2 w-full text-center py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition text-white">
              Logout
            </button>
          )}
        </div>
      )}
    </motion.nav>
  );
}
