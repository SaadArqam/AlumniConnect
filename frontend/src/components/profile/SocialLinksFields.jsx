"use client";

import { SOCIAL_LINK_FIELDS } from "./constants";

export default function SocialLinksFields({ links, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Social Links</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {SOCIAL_LINK_FIELDS.map(({ key, label, placeholder }) => (
          <label key={key} className="space-y-2">
            <span className="text-xs text-white/50 uppercase tracking-wide">{label}</span>
            <input
              type="url"
              value={links[key] || ""}
              onChange={(e) => onChange({ ...links, [key]: e.target.value })}
              placeholder={placeholder}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
