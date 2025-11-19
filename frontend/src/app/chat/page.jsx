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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900">
      <header className="p-4 bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">AlumniConnect — Chat</h1>
          {/* Potentially add user info or other header elements here */}
        </div>
      </header>

      <main className="container mx-auto p-6">
        {!token ? (
          <div className="max-w-xl mx-auto mt-12 bg-gradient-to-br from-white via-blue-50 to-blue-100 p-8 rounded-lg shadow-xl text-center border border-blue-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Please login to access chat</h3>
            <p className="text-gray-600 mb-6">You must be signed in to view and participate in chat threads.</p>
            <Link href="/login" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg transition duration-300 easea_in_out transform hover:scale-105">Go to Login</Link>
          </div>
        ) : (
          <ChatWindow />
        )}
      </main>
    </div>
  );
}
