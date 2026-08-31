"use client";

import { motion } from "framer-motion";

export function FloatingStatusCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute right-[7%] top-[38%] hidden w-56 lg:block"
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-2xl border border-border/80 bg-surface-raised/75 p-4 shadow-[0_25px_70px_-18px_rgba(244,147,60,0.45)] backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
            Room 214 · 8:00 AM
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
        </div>
        <p className="mt-2 text-sm font-medium text-ink">M. Alvarez confirmed</p>
        <p className="mt-0.5 text-xs text-ink/55">
          Matched in 40 seconds · fairness score 92
        </p>
      </motion.div>
    </motion.div>
  );
}
