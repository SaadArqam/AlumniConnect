"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ChatWindow from "../../components/chat/ChatWindow";

export default function Page() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-900 to-blue-500 text-gray-100 font-sans">
      <header className="p-4 bg-gray-800/30 backdrop-blur-md border-b border-gray-700 shadow-lg">
        <div className="container mx-auto font-semibold text-lg text-gray-100">AlumniConnect — Chat</div>
      </header>

      <main className="container mx-auto p-6">
        {!token ? (
          <div className="max-w-xl mx-auto mt-12 bg-gray-800/30 backdrop-blur-md p-8 rounded-3xl shadow-xl text-center border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">Please login to access chat</h3>
            <p className="text-gray-300 mb-6">You must be signed in to view and participate in chat threads.</p>
            <Link href="/login" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">Go to Login</Link>
          </div>
        ) : (
          <ChatWindow />
        )}
      </main>
    </div>
  );
}
