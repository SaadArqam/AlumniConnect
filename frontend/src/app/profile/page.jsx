"use client";

import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading } = useUser();

  const profileDetails = useMemo(() => {
    if (!user?.role || !user?.profile) return null;
    const profile = user.profile || {};

    if (user.role === "STUDENT") {
      return {
        sections: [
          {
            label: "Academics",
            items: [
              { name: "College", value: profile.college },
              { name: "Degree", value: profile.degree },
              { name: "Branch", value: profile.branch },
              { name: "Graduation Year", value: profile.graduationYear },
              { name: "Current Year", value: profile.currentYear },
              { name: "CGPA", value: profile.cgpa },
            ],
          },
        ],
      };
    }

    return {
      sections: [
        {
          label: "Professional",
          items: [
            { name: "Institution", value: profile.college },
            { name: "Graduation Year", value: profile.graduationYear },
            { name: "Company", value: profile.company },
            { name: "Position", value: profile.position },
            { name: "Experience", value: profile.experienceYears ? `${profile.experienceYears} years` : null },
            { name: "Mentoring", value: profile.mentoringAvailable ? "Available" : "Not available" },
          ],
        },
      ],
    };
  }, [user?.role, user?.profile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        <Navbar />
        <main className="px-6 pt-32">
          <div className="mx-auto max-w-5xl space-y-6">
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const needsProfile = !user.role || !user.profile;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="px-4 pb-20 pt-28 md:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">Your profile</p>
                <h1 className="mt-4 text-3xl font-semibold">{user.name || "Welcome"}</h1>
                <p className="mt-2 text-white/60">{user.email}</p>
                {user.bio && <p className="mt-4 text-white/70">{user.bio}</p>}
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <span className="rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-wide text-white/60">
                  {user.role || "Role not set"}
                </span>
                <Link
                  href="/create-profile"
                  className="rounded-2xl border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  {needsProfile ? "Complete profile" : "Edit profile"}
                </Link>
              </div>
            </div>
          </header>

          {needsProfile ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-8 text-center text-white/70">
              <p className="text-lg font-semibold text-white">Almost there!</p>
              <p className="mt-2 text-sm text-white/60">
                We need a bit more information to personalize your experience. Head over to the profile wizard to fill in the details.
              </p>
              <Link
                href="/create-profile"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Go to profile wizard
              </Link>
            </div>
          ) : (
            <section className="grid gap-8 md:grid-cols-2">
              {profileDetails?.sections.map((section) => (
                <div key={section.label} className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <p className="text-xs uppercase tracking-wide text-white/40">{section.label}</p>
                  <div className="mt-4 space-y-4">
                    {section.items.map((item) => (
                      <div key={item.name} className="rounded-xl border border-white/5 bg-black/30 px-4 py-3">
                        <p className="text-xs uppercase text-white/40">{item.name}</p>
                        <p className="mt-1 text-sm text-white/90">{item.value || "—"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-wide text-white/40">Skills</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(user.skills || []).length ? (
                    user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/80"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-white/60">No skills added yet</p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-wide text-white/40">Social Links</p>
                <div className="mt-4 space-y-3">
                  {user.socialLinks ? (
                    Object.entries(user.socialLinks).map(([key, value]) => (
                      <a
                        key={key}
                        href={value || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-between rounded-xl border border-white/5 px-4 py-3 text-sm ${
                          value ? "text-white hover:border-white/30" : "text-white/40 cursor-not-allowed"
                        }`}
                      >
                        <span className="capitalize">{key}</span>
                        <span className="text-xs text-white/50">{value || "Not added"}</span>
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-white/60">No links shared yet</p>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

const SkeletonRow = () => (
  <div className="h-24 rounded-2xl border border-white/5 bg-white/5" />
);
