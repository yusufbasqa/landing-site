"use client";

import { motion, type Variants } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  { n: "01", label: "Teacher requests" },
  { n: "02", label: "System suggests" },
  { n: "03", label: "Admin approves" },
  { n: "04", label: "Substitute notified" },
];

const cardStack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-surface-alt py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="max-w-2xl">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            How it works
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            From open period to confirmed sub, in minutes.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/60">
            Four steps. No phone calls.
          </p>
        </Reveal>

        <div className="relative mt-16 hidden items-center justify-between lg:flex">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}
            style={{ originX: 0 }}
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-brand"
          />
          {STEPS.map((s) => (
            <div key={s.n} className="relative z-10 flex items-center gap-2 bg-surface-alt px-3">
              <span className="font-mono text-xs font-medium text-brand">{s.n}</span>
              <span className="text-sm font-medium text-ink/70">{s.label}</span>
            </div>
          ))}
        </div>

        <motion.div
          variants={cardStack}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4"
        >
          <motion.div
            variants={card}
            className="rounded-xl border border-border bg-surface-raised p-5 shadow-sm"
          >
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
              01 · 6:02 AM · Absence request
            </p>
            <p className="mt-3 text-sm font-medium text-ink">Ms. Chen · 3rd period</p>
            <p className="mt-1 text-sm text-ink/60">Room 214 · Tomorrow · Sick</p>
            <span className="mt-4 inline-flex w-fit items-center rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink/50">
              Submitted
            </span>
          </motion.div>

          <motion.div
            variants={card}
            className="rounded-xl border border-border bg-surface-raised p-5 shadow-sm"
          >
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
              02 · 6:03 AM · Suggested match
            </p>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-sm font-medium text-ink">M. Alvarez</p>
              <span className="rounded-full bg-brand/10 px-2 py-0.5 font-mono text-[10px] text-brand">
                Dedicated
              </span>
            </div>
            <p className="mt-1 text-sm text-ink/60">Fairness score 92</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-ink/35">
              Next: J. Patel (88)
            </p>
          </motion.div>

          <motion.div
            variants={card}
            className="rounded-xl border border-border bg-surface-raised p-5 shadow-sm"
          >
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
              03 · 6:19 AM · Reviewed by K. Romero
            </p>
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-green/10 px-3 py-1 text-xs font-medium text-accent-green">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              Approved
            </span>
            <p className="mt-4 text-sm text-ink/60">One tap, no forms.</p>
          </motion.div>

          <motion.div
            variants={card}
            className="rounded-xl border border-border bg-surface-raised p-5 shadow-sm"
          >
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
              04 · 6:20 AM · Push notification
            </p>
            <div className="mt-3 rounded-lg border border-border bg-surface-alt/60 p-2.5">
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                Standin · now
              </span>
              <p className="mt-0.5 text-xs text-ink/75">
                You&rsquo;re confirmed for 3rd period, Room 214
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
