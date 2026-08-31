"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ACCENTS = {
  brand: {
    glow: "rgba(244,147,60,0.35)",
    shadow: "shadow-[0_60px_120px_-40px_rgba(244,147,60,0.5)]",
  },
  teal: {
    glow: "rgba(34,211,238,0.35)",
    shadow: "shadow-[0_60px_120px_-40px_rgba(34,211,238,0.5)]",
  },
} as const;

export function BrowserFrame({
  url,
  accent = "brand",
  className = "",
  children,
}: {
  url: string;
  accent?: keyof typeof ACCENTS;
  className?: string;
  children: ReactNode;
}) {
  const a = ACCENTS[accent];

  return (
    <div className={`relative [perspective:1800px] ${className}`}>
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[3rem] blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${a.glow}, transparent 70%)` }}
      />
      <motion.div
        initial={{ rotateX: 4, rotateY: -7 }}
        whileHover={{ rotateX: 0, rotateY: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className={`overflow-hidden rounded-2xl border border-border/70 bg-surface-raised ${a.shadow}`}
      >
        <div className="flex items-center gap-1.5 border-b border-border/70 bg-surface-alt/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-3 rounded-md bg-surface px-3 py-1 font-mono text-[10px] text-ink/40">
            {url}
          </span>
        </div>
        <div className="aspect-[16/10] bg-surface">{children}</div>
      </motion.div>
    </div>
  );
}
