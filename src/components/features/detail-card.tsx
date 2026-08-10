"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const detailCardVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function DetailCard({
  label,
  title,
  body,
  children,
}: {
  label: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={detailCardVariant}
      className="flex flex-col rounded-xl border border-border bg-surface-raised p-6 shadow-sm"
    >
      <p className="font-mono text-[11px] uppercase tracking-wide text-brand/70">{label}</p>
      <h3 className="mt-2 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{body}</p>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}
