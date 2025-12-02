"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://alumniconnect-backend-31pn.onrender.com").replace(/\/$/, "");

const UserContext = createContext({
  user: null,
  loading: true,
  refreshUser: async () => { },
  setUser: () => { },
});

const PROFILE_GUARD_DISABLED_ROUTES = new Set([
  "/login",
  "/signup",
  "/create-profile",
  "/auth/success",
  "/profile",
]);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("token");

    if (!token) {
      setHasToken(false);
      setUser(null);
      setLoading(false);
      return null;
    }

    setHasToken(true);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          setHasToken(false);
        }
        throw new Error("Unable to fetch user");
      }

      const data = await res.json();
      setUser(data);
      return data;
    } catch (error) {
      console.error("[UserProvider] fetchUser error", error);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === "token") {
        fetchUser();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [fetchUser]);

  useEffect(() => {
    if (!hasToken || loading || !user) return;

    const needsProfile = !user.role || !user.profile;
    if (
      needsProfile &&
      pathname &&
      pathname !== "/create-profile" &&
      !PROFILE_GUARD_DISABLED_ROUTES.has(pathname)
    ) {
      router.replace("/create-profile");
    }
  }, [user, hasToken, loading, pathname, router]);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setHasToken(false);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      refreshUser: fetchUser,
      setUser,
      logout,
    }),
    [user, loading, fetchUser, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
};
