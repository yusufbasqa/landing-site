"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ACCENTS = {
  teal: {
    glow: "rgba(34,211,238,0.4)",
    shadow: "shadow-[0_45px_100px_-30px_rgba(34,211,238,0.55)]",
  },
  brand: {
    glow: "rgba(99,102,241,0.4)",
    shadow: "shadow-[0_45px_100px_-30px_rgba(99,102,241,0.55)]",
  },
} as const;

export function PhoneFrame({
  accent = "teal",
  className = "",
  children,
}: {
  accent?: keyof typeof ACCENTS;
  className?: string;
  children: ReactNode;
}) {
  const a = ACCENTS[accent];

  return (
    <div className={`relative w-[230px] [perspective:1800px] ${className}`}>
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[3rem] blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${a.glow}, transparent 70%)` }}
      />
      <motion.div
        initial={{ rotateX: -3, rotateY: 9 }}
        whileHover={{ rotateX: 0, rotateY: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className={`rounded-[2.75rem] border-[6px] border-ink bg-ink p-1.5 ${a.shadow}`}
      >
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-surface">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
          {children}
        </div>
      </motion.div>
    </div>
  );
}
