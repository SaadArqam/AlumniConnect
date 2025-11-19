"use client";
import React, { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import { getSocket } from "../../utils/socket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { socket, connected } = useSocket(token);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (!token) return;

    // fetch threads
    fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + "/api/chat", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setThreads)
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    const s = getSocket();
    const onNewMessage = (msg) => {
      if (msg.threadId === currentThread) setMessages((m) => [...m, msg]);
    };

    const onUpdateMessage = (msg) => {
      if (msg.threadId !== currentThread) return;
      setMessages((prev) => prev.map((p) => (p.id === msg.id ? msg : p)));
    };

    const onUserTyping = ({ userId }) => {
      if (!userId) return;
      setTypingUsers((prev) => {
        if (prev.includes(userId)) return prev;
        return [...prev, userId];
      });
      // remove after short timeout
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== userId));
      }, 1500);
    };

    s.on("new_message", onNewMessage);
    s.on("user_typing", onUserTyping);
  s.on("update_message", onUpdateMessage);

    return () => {
      s.off("new_message", onNewMessage);
      s.off("user_typing", onUserTyping);
      s.off("update_message", onUpdateMessage);
    };
  }, [socket, currentThread]);

  async function openThread(threadId) {
    setCurrentThread(threadId);
    if (!token) return;
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + `/api/chat/${threadId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const msgs = await res.json();
    setMessages(msgs);

    // join socket room
    if (socket) socket.emit("join_thread", threadId);
  }

  const [replyTo, setReplyTo] = useState(null);

  function handleReply(parentId) {
    setReplyTo(parentId);
    // focus could be handled by MessageInput if needed
  }

  function handleSent(opt) {
    // opt may be { threadId, content, parentId } when socket used; real message will arrive via socket
    setReplyTo(null);
  }

  function handleToggleUpvote(messageId) {
    if (!socket) {
      // fallback: call REST
      fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + `/api/chat/messages/${messageId}/upvote`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()).then((m) => setMessages((prev) => prev.map((p) => (p.id === m.id ? m : p)))).catch(console.error);
      return;
    }

    socket.emit("toggle_upvote", { messageId });
  }

  async function createThread(title) {
    if (!token) return;
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title }),
    });
    const t = await res.json();
    setThreads((prev) => [t, ...prev]);
    openThread(t.id);
  }

  function decodePayloadFromToken(t) {
    try {
      const payload = t.split('.')[1];
      if (!payload) return null;
      const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = b64.padEnd(Math.ceil(b64.length / 4) * 4, '=');
      return JSON.parse(decodeURIComponent(escape(atob(padded))));
    } catch (e) {
      return null;
    }
  }

  const decoded = token ? decodePayloadFromToken(token) : null;
  const currentUserId = decoded?.userId ?? null;

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-lg shadow-xl overflow-hidden bg-gray-800 border border-gray-700">
      {/* Sidebar for Threads */}
      <aside className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Threads</h2>
          <button
            onClick={() => {
              const title = prompt("Enter new thread title:");
              if (title) createThread(title);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            New Thread
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {threads.map((t) => (
            <div
              key={t.id}
              onClick={() => openThread(t.id)}
              className={`p-3 rounded-md cursor-pointer transition duration-200 ease-in-out
                ${currentThread === t.id ? 'bg-blue-700 text-white shadow-md' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
            >
              <div className="font-semibold text-lg">{t.title}</div>
              <div className="text-sm text-gray-400">by {t.createdBy?.name || t.createdById}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-gray-800">
        {currentThread ? (
          <>
            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4">
              <MessageList messages={messages} currentUserId={currentUserId} typingUsers={typingUsers} onReply={handleReply} onToggleUpvote={handleToggleUpvote} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700 bg-gray-900">
              <MessageInput threadId={currentThread} socket={socket} parentId={replyTo} onSent={handleSent} placeholder={replyTo ? 'Replying...' : 'Post a comment...'} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-xl font-semibold">
            Select or create a thread to start chatting
          </div>
        )}
      </main>
    </div>
  );
}
