"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    title: "M. Alvarez confirmed",
    meta: "7:15 AM",
    color: "bg-accent-green",
    delay: 0.1,
  },
  {
    title: "M. Alvarez cancels",
    meta: "7:42 AM · marked unavailable",
    color: "bg-accent-orange",
    delay: 0.55,
  },
  {
    title: "J. Patel confirmed",
    meta: "7:42 AM · reassigned in 0.6s",
    color: "bg-accent-green",
    delay: 1.0,
    emphasize: true,
  },
];

export function CascadeVisual() {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-6 shadow-[0_30px_80px_-35px_rgba(20,21,43,0.3)]">
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
        Room 214 · 3rd period
      </p>

      <div className="relative mt-6 pl-6">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeInOut" }}
          style={{ originY: 0 }}
          className="absolute left-[7px] top-1 h-[calc(100%-1.5rem)] w-px bg-border"
        />

        {STEPS.map((step) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: step.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6 last:mb-0"
          >
            <span
              className={`absolute -left-6 top-1 h-3 w-3 rounded-full ring-4 ring-surface-raised ${step.color}`}
            />
            <p
              className={`text-sm ${
                step.emphasize ? "font-semibold text-ink" : "font-medium text-ink/75"
              }`}
            >
              {step.title}
            </p>
            <p className="mt-0.5 font-mono text-xs text-ink/45">{step.meta}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
