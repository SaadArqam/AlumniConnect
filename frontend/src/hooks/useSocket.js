"use client";
import { useEffect, useState } from "react";
import { initSocket, getSocket, disconnectSocket } from "../utils/socket";

export default function useSocket(token) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    const s = initSocket(token);
    try {
      s.connect();
    } catch (e) {
      // connect may throw if already connected; ignore
    }

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onError = (err) => console.error("Socket error", err);

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);
    s.on("connect_error", onError);

    return () => {
      if (s) {
        s.off("connect", onConnect);
        s.off("disconnect", onDisconnect);
        s.off("connect_error", onError);
      }
      disconnectSocket();
    };
  }, [token]);

  return { socket: getSocket(), connected };
}
