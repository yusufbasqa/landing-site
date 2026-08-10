"use client";

import { motion, type Variants } from "framer-motion";

const CANDIDATES = [
  { name: "M. Alvarez", dedicated: true, score: 92 },
  { name: "J. Patel", dedicated: true, score: 88 },
  { name: "D. Osei", dedicated: false, score: 81 },
  { name: "R. Kim", dedicated: false, score: 74 },
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const row: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function MatchingEngineVisual() {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-6 shadow-[0_30px_80px_-35px_rgba(20,21,43,0.3)]">
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
        Open · 3rd period · Room 214
      </p>

      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-4 space-y-2"
      >
        {CANDIDATES.map((c, i) => (
          <motion.li
            key={c.name}
            variants={row}
            className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
              i === 0 ? "border-brand/30 bg-brand/5" : "border-border bg-surface-alt/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-ink">{c.name}</span>
              {c.dedicated && (
                <span className="rounded-full bg-brand/10 px-2 py-0.5 font-mono text-[10px] text-brand">
                  Dedicated
                </span>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-ink/45">Fairness {c.score}</span>
              {i === 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.85, duration: 0.35 }}
                  className="flex items-center gap-1 rounded-full bg-accent-green/10 px-2 py-0.5 font-mono text-[10px] text-accent-green"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                  Confirmed
                </motion.span>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
