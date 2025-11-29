"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users } from "lucide-react";

const ROLE_OPTIONS = [
  {
    key: "STUDENT",
    title: "I am a Student",
    description: "Discover mentors, grow your skillset, and find opportunities to connect with inspiring alumni.",
    icon: GraduationCap,
    accent: "from-indigo-500/40 via-blue-500/20 to-transparent",
  },
  {
    key: "ALUMNI",
    title: "I am an Alumni",
    description: "Share your journey, mentor students, and tap into a vibrant professional network.",
    icon: Users,
    accent: "from-emerald-500/40 via-green-500/20 to-transparent",
  },
];

export default function RoleSelectionPrompt({ selectedRole, onSelect }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {ROLE_OPTIONS.map((role) => {
        const Icon = role.icon;
        const isActive = selectedRole === role.key;
        return (
          <motion.button
            key={role.key}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(role.key)}
            className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${
              isActive
                ? "border-white/20 from-white/5 to-transparent shadow-[0_0_45px_rgba(79,70,229,0.35)]"
                : "border-white/10 from-white/0 to-transparent hover:border-white/30"
            } p-6 text-left transition duration-200`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${role.accent} pointer-events-none`} />
            <div className="relative flex items-start gap-4">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                  isActive ? "border-white/40 bg-black/40" : "border-white/10 bg-black/20"
                }`}
              >
                <Icon className="h-6 w-6 text-white" />
              </span>
              <div>
                <p className="text-lg font-semibold text-white">{role.title}</p>
                <p className="mt-1 text-sm text-white/70">{role.description}</p>
              </div>
            </div>
            {isActive && (
              <span className="absolute right-4 top-4 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 text-xs uppercase tracking-wide text-emerald-200">
                Selected
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
