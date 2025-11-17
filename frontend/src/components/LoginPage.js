"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import { Mail, Lock, Apple, Github, Chrome } from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) return setError("Enter a valid email address");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    console.log(isLogin ? "Logging in..." : "Signing up...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0c0d] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm p-8 rounded-3xl shadow-[0_0_80px_rgba(255,0,0,0.15)] bg-[#141416]/60 backdrop-blur-2xl relative border border-white/10"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/20 to-transparent pointer-events-none" />

        <h2 className="text-center text-2xl font-semibold text-gray-100 relative z-10">
          {isLogin ? "Welcome back" : "Join the platform"}
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6 relative z-10">
          {isLogin ? "Sign in to continue" : "Create your account"}
        </p>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <div className="flex items-center bg-[#1b1c1e] mt-1 px-4 py-3 rounded-xl border border-white/5 focus-within:border-red-500/40">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-gray-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <div className="flex items-center bg-[#1b1c1e] mt-1 px-4 py-3 rounded-xl border border-white/5 focus-within:border-red-500/40">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-gray-200 focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-gray-400 text-sm hover:text-gray-200">
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 transition font-medium text-white"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="flex items-center my-6 relative z-10">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-gray-500 text-sm">or continue with</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <div className="flex justify-center gap-3 relative z-10">
          {[Apple, Github, Chrome].map((Icon, i) => (
            <button key={i} className="w-10 h-10 bg-[#1b1c1e] hover:bg-[#222326] flex items-center justify-center rounded-xl border border-white/5">
              <Icon className="w-5 h-5 text-gray-300" />
            </button>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6 relative z-10">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <button
            className="text-red-400 hover:text-red-300 ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
