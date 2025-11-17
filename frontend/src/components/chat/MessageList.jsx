"use client";
import React, { useEffect, useRef } from "react";

export default function MessageList({ messages, currentUserId, typingUsers = [] }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4 space-y-3 bg-gray-50">
      {messages.map((m) => (
        <div key={m.id} className={`flex ${m.authorId === currentUserId ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[75%] p-2 rounded-lg ${m.authorId === currentUserId ? "bg-blue-500 text-white" : "bg-white text-gray-900 shadow"}`}>
            <div className="text-sm font-medium">{m.author?.name || m.authorId}</div>
            <div className="mt-1 whitespace-pre-wrap">{m.content}</div>
            <div className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        </div>
      ))}

      {typingUsers.length > 0 && (
        <div className="text-sm text-gray-500 px-2">{typingUsers.join(", ")} is typing...</div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
