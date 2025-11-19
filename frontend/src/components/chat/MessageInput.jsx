"use client";
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Send, Reply } from "lucide-react"; // Assuming lucide-react is available for icons

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
    <form onSubmit={send} className="flex flex-col gap-2 p-3 bg-gradient-to-r from-white to-blue-50 rounded-lg border border-blue-200">
      {parentId && (
        <div className="flex items-center text-xs text-blue-700 mb-2">
          <Reply size={14} className="mr-2" />
          Replying…
        </div>
      )}
      <div className="flex items-center gap-2">
        <textarea
          className="flex-1 p-3 border border-blue-200 bg-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-blue-600 transition duration-200 ease-in-out"
          rows={1}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onType();
          }}
          onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) send(e); }}
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white inline-flex items-center justify-center hover:from-blue-700 hover:to-blue-600 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}

MessageInput.propTypes = {
  threadId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  socket: PropTypes.object,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSent: PropTypes.func,
  placeholder: PropTypes.string,
};