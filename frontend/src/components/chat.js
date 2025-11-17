"use client";
import useSocket from "@/hooks/useSocket";
import { useState, useEffect } from "react";

export default function ChatPage() {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div>
      <h1>Chat</h1>

      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}

      <button
        onClick={() => socket.emit("message", "Hello from frontend!")}
      >
        Send Hello
      </button>
    </div>
  );
}
