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
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white border-b">
        <div className="container mx-auto">AlumniConnect — Chat</div>
      </header>

      <main className="p-6">
        {!token ? (
          <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Please login to access chat</h3>
            <p className="text-sm text-gray-600 mb-4">You must be signed in to view and participate in chat threads.</p>
            <Link href="/login" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Go to Login</Link>
          </div>
        ) : (
          <ChatWindow />
        )}
      </main>
    </div>
  );
}
