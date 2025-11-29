"use client";

import { useMemo, useState } from "react";
import SkillSelector from "./SkillSelector";
import SocialLinksFields from "./SocialLinksFields";

export default function AlumniProfileForm({ user, onSubmit, submitting }) {
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
    graduationYear: user?.profile?.graduationYear || user?.graduationYear || "",
    company: user?.profile?.company || user?.company || "",
    position: user?.profile?.position || user?.position || "",
    experienceYears: user?.profile?.experienceYears || user?.experienceYears || "",
    mentoringAvailable: Boolean(user?.profile?.mentoringAvailable),
    skills: Array.isArray(user?.skills) ? user.skills : [],
    socialLinks: initialSocial,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, role: "ALUMNI" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Your full name"
          required
        />
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
          label="Graduation Institution"
          value={form.college}
          onChange={(e) => handleChange("college", e.target.value)}
          placeholder="Your alma mater"
          required
        />
        <Field
          label="Graduation Year"
          type="number"
          value={form.graduationYear}
          onChange={(e) => handleChange("graduationYear", e.target.value)}
          placeholder="2018"
          min="1900"
        />
        <Field
          label="Current Company"
          value={form.company}
          onChange={(e) => handleChange("company", e.target.value)}
          placeholder="Acme Corp"
          required
        />
        <Field
          label="Position"
          value={form.position}
          onChange={(e) => handleChange("position", e.target.value)}
          placeholder="Senior Engineer"
          required
        />
        <Field
          label="Experience (years)"
          type="number"
          value={form.experienceYears}
          onChange={(e) => handleChange("experienceYears", e.target.value)}
          placeholder="5"
          min="0"
        />
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
        <div>
          <p className="text-sm font-medium text-white">Available for Mentoring</p>
          <p className="text-xs text-white/50">Let students know if they can reach out for guidance</p>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={form.mentoringAvailable}
            onChange={(e) => handleChange("mentoringAvailable", e.target.checked)}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:top-0.5 after:left-[4px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition peer-checked:bg-emerald-500/60 peer-checked:after:translate-x-full" />
        </label>
      </div>

      <SkillSelector selectedSkills={form.skills} onChange={(skills) => handleChange("skills", skills)} />

      <SocialLinksFields links={form.socialLinks} onChange={(links) => handleChange("socialLinks", links)} />

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_10px_40px_rgba(16,185,129,0.35)] transition hover:brightness-110 disabled:opacity-60"
      >
        {submitting ? "Saving profile..." : "Save Alumni Profile"}
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
