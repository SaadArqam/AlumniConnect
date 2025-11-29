"use client";

import { motion } from "framer-motion";
import { SKILL_GROUPS } from "./constants";

export default function SkillSelector({ selectedSkills, onChange }) {
  const toggleSkill = (skill) => {
    const exists = selectedSkills.includes(skill);
    const next = exists
      ? selectedSkills.filter((item) => item !== skill)
      : [...selectedSkills, skill];
    onChange(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Skills</h3>
        <span className="text-xs text-white/50">{selectedSkills.length} selected</span>
      </div>
      <div className="space-y-4">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-xs uppercase tracking-wide text-white/50 mb-2">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const isActive = selectedSkills.includes(skill);
                return (
                  <motion.button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full border px-4 py-1.5 text-sm transition ${
                      isActive
                        ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                        : "border-white/10 bg-black/30 text-white/70 hover:border-white/30"
                    }`}
                  >
                    {skill}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
