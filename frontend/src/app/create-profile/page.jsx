"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import RoleSelectionPrompt from "@/components/profile/RoleSelectionPrompt";
import StudentProfileForm from "@/components/profile/StudentProfileForm";
import AlumniProfileForm from "@/components/profile/AlumniProfileForm";
import { useUser } from "@/context/UserContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://alumniconnect-backend-31pn.onrender.com";

export default function CreateProfilePage() {
  const router = useRouter();
  const { user, loading, setUser } = useUser();
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading) {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) router.replace("/login");
    }
  }, [loading, router]);

  useEffect(() => {
    if (user?.role) {
      setSelectedRole(user.role);
    }
  }, [user?.role]);

  const handleSave = async (payload) => {
    if (!selectedRole) {
      setError("Please select a role first.");
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        router.replace("/login");
        return;
      }

      const res = await fetch(`${API_BASE}/api/users/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buildPayload(selectedRole, payload)),
      });

      if (!res.ok) {
        const message = await res.json().catch(() => ({}));
        throw new Error(message?.message || "Failed to save profile");
      }

      const data = await res.json();
      setUser(data);
      router.replace("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Complete your profile</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Tell us more about yourself</h1>
            <p className="mt-4 text-white/60">Choose your role to unlock a personalized experience and start connecting instantly.</p>
          </div>

          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="space-y-8">
              <RoleSelectionPrompt selectedRole={selectedRole} onSelect={setSelectedRole} />

              {error && <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

              {selectedRole === "STUDENT" ? (
                <StudentProfileForm user={user} onSubmit={handleSave} submitting={submitting} />
              ) : selectedRole === "ALUMNI" ? (
                <AlumniProfileForm user={user} onSubmit={handleSave} submitting={submitting} />
              ) : (
                <p className="rounded-2xl border border-dashed border-white/20 bg-black/20 px-6 py-8 text-center text-white/60">
                  Select a role to continue with tailored profile questions.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const buildPayload = (role, formData) => {
  const base = {
    role,
    name: formData.name,
    bio: formData.bio,
    skills: formData.skills || [],
    socialLinks: formData.socialLinks || {},
  };

  if (role === "STUDENT") {
    base.profile = {
      type: "student",
      college: formData.college || "",
      degree: formData.degree || "",
      branch: formData.branch || "",
      graduationYear: formData.graduationYear ? Number(formData.graduationYear) : null,
      currentYear: formData.currentYear || "",
      cgpa: formData.cgpa === "" ? null : Number(formData.cgpa),
      bio: formData.bio,
    };
  } else {
    base.profile = {
      type: "alumni",
      college: formData.college || "",
      graduationYear: formData.graduationYear ? Number(formData.graduationYear) : null,
      company: formData.company || "",
      position: formData.position || "",
      experienceYears: formData.experienceYears ? Number(formData.experienceYears) : null,
      mentoringAvailable: Boolean(formData.mentoringAvailable),
      bio: formData.bio,
    };
  }

  return base;
};
