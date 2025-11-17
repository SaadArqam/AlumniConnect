"use client";
import React, { useState, useCallback } from "react";

export default function MessageInput({ threadId, socket, parentId = null, onSent, placeholder = "Write a message..." }) {
  const [value, setValue] = useState("");

  const send = useCallback(
    (e) => {
      e?.preventDefault();
      const content = value.trim();
      if (!content) return;

      if (socket) {
        socket.emit("send_message", { threadId, content, parentId });
      } else {
        // fallback to REST
        fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + `/api/chat/${threadId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify({ content, parentId }),
        }).then((r) => r.json()).then((m) => onSent && onSent(m)).catch(console.error);
      }

      setValue("");
      if (onSent) onSent({ threadId, content, parentId });
    },
    [value, socket, threadId, parentId, onSent]
  );

  const onType = () => {
    if (!socket) return;
    socket.emit("typing", { threadId });
  };

  return (
    <form onSubmit={send} className="p-3 bg-white border-t flex gap-2">
      <textarea
        className="flex-1 p-2 border rounded resize-none"
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) send(e); }}
        onInput={onType}
        placeholder={placeholder}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
    </form>
  );
}
