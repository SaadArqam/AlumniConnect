"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentForm from "@/components/forms/StudentForm";
import AlumniForm from "@/components/forms/AlumniForm";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Not authorized");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!user) return null;

  const handleRoleSelect = async (role) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/set-role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error("Unable to set role");
      const updated = await res.json();
      setUser((u) => ({ ...u, role: updated.role }));
    } catch (err) {
      console.error(err);
      alert("Error setting role");
    }
  };

  const refetch = async () => {
    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Not authorized");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Profile</h1>

      {!user.role ? (
        <div style={{ textAlign: "center" }}>
          <p>Please select your role to continue:</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
            <button onClick={() => handleRoleSelect("STUDENT")} style={{ padding: 12 }}>Student</button>
            <button onClick={() => handleRoleSelect("ALUMNI")} style={{ padding: 12 }}>Alumni</button>
          </div>
        </div>
      ) : user.role === "STUDENT" ? (
        <StudentForm user={user} onSaved={refetch} />
      ) : (
        <AlumniForm user={user} onSaved={refetch} />
      )}
    </div>
  );
}
