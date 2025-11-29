"use client";

import { useMemo, useState } from "react";
import SkillSelector from "./SkillSelector";
import SocialLinksFields from "./SocialLinksFields";

const numberOrEmpty = (value) => (typeof value === "number" && !Number.isNaN(value) ? value : "");

export default function StudentProfileForm({ user, onSubmit, submitting }) {
  const initialSocial = useMemo(() => ({
    linkedin: user?.socialLinks?.linkedin || "",
    github: user?.socialLinks?.github || "",
    portfolio: user?.socialLinks?.portfolio || "",
    twitter: user?.socialLinks?.twitter || "",
  }), [user]);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || user?.profile?.bio || "",
    college: user?.profile?.college || user?.college || "",
    degree: user?.profile?.degree || user?.degree || "",
    branch: user?.profile?.branch || user?.branch || "",
    graduationYear: numberOrEmpty(user?.profile?.graduationYear || user?.graduationYear),
    currentYear: user?.profile?.currentYear || "",
    cgpa: user?.profile?.cgpa ?? user?.cgpa ?? "",
    skills: Array.isArray(user?.skills) ? user.skills : [],
    socialLinks: initialSocial,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, role: "STUDENT", cgpa: form.cgpa === "" ? "" : Number(form.cgpa) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-white/40">Name</label>
          <input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
            placeholder="Your full name"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-white/40">Email</label>
          <input
            value={form.email}
            disabled
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white/70"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wide text-white/40">Bio</label>
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
          placeholder="Share a short introduction..."
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="College / Institution"
          value={form.college}
          onChange={(e) => handleChange("college", e.target.value)}
          placeholder="e.g., National Institute of Tech"
          required
        />
        <Field
          label="Degree"
          value={form.degree}
          onChange={(e) => handleChange("degree", e.target.value)}
          placeholder="B.Tech, B.Sc, ..."
          required
        />
        <Field
          label="Branch"
          value={form.branch}
          onChange={(e) => handleChange("branch", e.target.value)}
          placeholder="Computer Science"
          required
        />
        <Field
          label="Graduation Year"
          type="number"
          value={form.graduationYear}
          onChange={(e) => handleChange("graduationYear", e.target.value)}
          placeholder="2026"
          min="1900"
        />
        <Field
          label="Current Year of Study"
          value={form.currentYear}
          onChange={(e) => handleChange("currentYear", e.target.value)}
          placeholder="3rd Year"
        />
        <Field
          label="CGPA (optional)"
          type="number"
          step="0.01"
          value={form.cgpa}
          onChange={(e) => handleChange("cgpa", e.target.value)}
          placeholder="8.5"
          min="0"
          max="10"
        />
      </div>

      <SkillSelector selectedSkills={form.skills} onChange={(skills) => handleChange("skills", skills)} />

      <SocialLinksFields links={form.socialLinks} onChange={(links) => handleChange("socialLinks", links)} />

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_10px_40px_rgba(99,102,241,0.35)] transition hover:brightness-110 disabled:opacity-60"
      >
        {submitting ? "Saving profile..." : "Save Student Profile"}
      </button>
    </form>
  );
}

const Field = ({ label, ...props }) => (
  <label className="space-y-2">
    <span className="text-xs uppercase tracking-wide text-white/40">{label}</span>
    <input
      {...props}
      className={`w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none ${
        props.className || ""
      }`}
    />
  </label>
);
