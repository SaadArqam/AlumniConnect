"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/context/UserContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by name, skills, company, or branch"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

function FilterDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-full border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="ALL">All</option>
      <option value="STUDENT">Students</option>
      <option value="ALUMNI">Alumni</option>
    </select>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 rounded-full border border-gray-300 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 rounded-full border border-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

function UserCard({ user, currentUserId, onConnect, onMessage, outgoingRequests, connections }) {
  const isConnected = useMemo(
    () => connections?.includes(user.id) ?? false,
    [connections, user.id]
  );

  const pending = useMemo(
    () => outgoingRequests?.some((r) => r.toUserId === user.id) ?? false,
    [outgoingRequests, user.id]
  );

  const isMe = currentUserId === user.id;

  const roleLabel = user.role === "ALUMNI" ? "Alumni" : "Student";
  const secondaryLine =
    user.role === "ALUMNI"
      ? [user.company, user.position].filter(Boolean).join(" • ")
      : [user.branch, user.degree, user.graduationYear && `Class of ${user.graduationYear}`]
          .filter(Boolean)
          .join(" • ");

  let connectLabel = "Connect";
  if (isConnected) connectLabel = "Connected";
  else if (pending) connectLabel = "Request Sent";

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 shadow-sm bg-white">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500 text-lg font-semibold">
          {user.profilePic ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user.name?.[0]?.toUpperCase() || "U"
          )}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-gray-900">{user.name}</h3>
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              {roleLabel}
            </span>
          </div>
          {secondaryLine && <p className="text-xs text-gray-600 mt-1">{secondaryLine}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          disabled={isMe || isConnected || pending}
          onClick={() => onConnect(user)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
            isConnected
              ? "bg-green-100 text-green-700 cursor-default"
              : pending
              ? "bg-gray-100 text-gray-500 cursor-default"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {connectLabel}
        </button>
        <button
          disabled={isMe}
          onClick={() => onMessage(user)}
          className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Message
        </button>
      </div>
    </div>
  );
}

export default function ConnectPage() {
  const { user, loading } = useUser();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], totalPages: 1, total: 0 });
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();
    const params = new URLSearchParams({
      q: search,
      role,
      page: String(page),
      limit: "10",
      sort: "name_asc",
    });

    fetch(`${API_BASE}/api/users?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [search, role, page, token]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/connections/sent`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setOutgoingRequests)
      .catch(console.error);

    fetch(`${API_BASE}/api/connections/incoming`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setIncomingRequests)
      .catch(console.error);
  }, [token]);

  // Poll messages for active thread
  useEffect(() => {
    if (!token || !activeThreadId) return;

    let cancelled = false;
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/chat/${activeThreadId}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!cancelled) setMessages(json);
      } catch (e) {
        if (!cancelled) console.error(e);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [activeThreadId, token]);

  const handleConnect = async (targetUser) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/connections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ toUserId: targetUser.id }),
      });
      const json = await res.json();
      if (json.request) {
        setOutgoingRequests((prev) => [...prev, json.request]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMessage = async (targetUser) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/chat/direct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otherUserId: targetUser.id }),
      });
      const thread = await res.json();
      setActiveThreadId(thread.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = async () => {
    if (!token || !activeThreadId || !newMessage.trim()) return;
    try {
      await fetch(`${API_BASE}/api/chat/${activeThreadId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      });
      setNewMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleAccept = async (requestId) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/connections/${requestId}/accept`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setIncomingRequests((prev) => prev.filter((r) => r.id !== requestId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDecline = async (requestId) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/api/connections/${requestId}/decline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setIncomingRequests((prev) => prev.filter((r) => r.id !== requestId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center text-gray-600">Please login to use Connect.</div>;
  }

  const currentConnections = user.connections || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Connect</h1>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0 mb-6">
          <div className="flex-1">
            <SearchBar value={search} onChange={(v) => { setPage(1); setSearch(v); }} />
          </div>
          <FilterDropdown value={role} onChange={(v) => { setPage(1); setRole(v); }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {data.items?.map((u) => (
              <UserCard
                key={u.id}
                user={u}
                currentUserId={user.id}
                connections={currentConnections}
                outgoingRequests={outgoingRequests}
                onConnect={handleConnect}
                onMessage={handleMessage}
              />
            ))}
            {data.items?.length === 0 && (
              <div className="text-sm text-gray-500 mt-4">No users found.</div>
            )}
            <Pagination page={data.page || page} totalPages={data.totalPages || 1} onChange={setPage} />
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-gray-200">
              <h2 className="text-sm font-semibold mb-3">Incoming Requests</h2>
              {incomingRequests.length === 0 && (
                <p className="text-xs text-gray-500">No pending requests.</p>
              )}
              <div className="space-y-2">
                {incomingRequests.map((r) => (
                  <div key={r.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{r.fromUser?.name}</span>
                    </div>
                    <div className="space-x-1">
                      <button
                        onClick={() => handleAccept(r.id)}
                        className="px-2 py-0.5 rounded-full bg-green-600 text-white"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(r.id)}
                        className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-gray-200 flex flex-col h-80">
              <h2 className="text-sm font-semibold mb-3">Messages</h2>
              {activeThreadId ? (
                <>
                  <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                    {messages.map((m) => (
                      <div key={m.id} className="text-xs border border-gray-100 rounded-xl px-2 py-1">
                        <div className="font-medium">{m.author?.name || "User"}</div>
                        <div>{m.content}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-2 py-1 border border-gray-300 rounded-full text-xs"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs"
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-500">Select a user and click Message to start a chat.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


