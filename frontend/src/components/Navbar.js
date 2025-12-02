"use client";
import Link from "next/link";
import { Users2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger animation
    setIsMounted(true);

    const t =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
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
    <nav className={`fixed top-4 left-0 right-0 z-50 px-6 transition-all duration-700 ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 bg-white/80 backdrop-blur-lg border border-slate-200/60 rounded-full shadow-lg flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
            <Users2 className="text-white" size={16} />
          </div>
          <span className="text-base font-semibold text-slate-900">Reunify</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-slate-700 hover:text-slate-900 transition-colors text-sm">
            Home
          </Link>
          <Link href="/chat" className="text-slate-700 hover:text-slate-900 transition-colors text-sm">
            Chat
          </Link>
          {/* <Link href="/about" className="text-slate-700 hover:text-slate-900 transition-colors text-sm">
            About
          </Link>
          <Link href="/connect" className="text-slate-700 hover:text-slate-900 transition-colors text-sm">
            Connect
          </Link> */}

          {token && (
            <>
              <Link href="/posts" className="text-slate-700 hover:text-slate-900 transition-colors text-sm">
                Posts
              </Link>
              <Link href="/profile" className="text-slate-700 hover:text-slate-900 transition-colors text-sm">
                Profile
              </Link>
            </>
          )}

          {!token ? (
            <Link
              href="/login"
              className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all text-sm font-medium"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all text-sm font-medium"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 mx-auto max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200 py-4 z-40">
          <div className="flex flex-col gap-1 px-4">
            <Link href="/" className="text-slate-700 hover:text-slate-900 transition-colors py-2.5 px-3 rounded-lg hover:bg-slate-100 text-sm">
              Home
            </Link>
            <Link href="/chat" className="text-slate-700 hover:text-slate-900 transition-colors py-2.5 px-3 rounded-lg hover:bg-slate-100 text-sm">
              Chat
            </Link>
            {/* <Link href="/about" className="text-slate-700 hover:text-slate-900 transition-colors py-2.5 px-3 rounded-lg hover:bg-slate-100 text-sm">
              About
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors py-2.5 px-3 rounded-lg hover:bg-slate-100 text-sm">
              Contact
            </Link> */}

            {token && (
              <>
                <Link href="/posts" className="text-slate-700 hover:text-slate-900 transition-colors py-2.5 px-3 rounded-lg hover:bg-slate-100 text-sm">
                  Posts
                </Link>
                <Link href="/profile" className="text-slate-700 hover:text-slate-900 transition-colors py-2.5 px-3 rounded-lg hover:bg-slate-100 text-sm">
                  Profile
                </Link>
              </>
            )}

            {!token ? (
              <Link
                href="/login"
                className="mt-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-center font-medium text-sm"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="mt-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-center font-medium text-sm"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
