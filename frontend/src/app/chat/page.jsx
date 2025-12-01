"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ChatWindow from "../../components/chat/ChatWindow";

export default function Page() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 pt-20 pb-4 max-w-[1600px] mx-auto w-full">
        {!token ? (
          <div className="max-w-md mx-auto mt-20">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Sign in Required</h3>
              <p className="text-slate-600 mb-6 text-sm">You must be signed in to access chat.</p>
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium text-sm shadow-lg"
              >
                Go to Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-6rem)]">
            <ChatWindow />
          </div>
        )}
      </main>
    </div>
  );
}
