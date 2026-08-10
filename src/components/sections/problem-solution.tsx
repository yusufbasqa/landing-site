"use client";

import { motion, type Variants } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const stack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const scatterCard: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProblemSolution() {
  return (
    <section id="problem" className="relative bg-surface-alt py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="max-w-2xl">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
            The morning scramble
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            Coverage used to mean calling down a list and hoping.
            <br />
            <span className="text-brand">Now it finds itself.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
          <motion.div
            variants={stack}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex flex-col gap-4 lg:h-[420px] lg:gap-0"
          >
            <motion.div
              variants={scatterCard}
              className="rotate-[-3deg] rounded-xl border border-border bg-surface-raised p-4 shadow-sm lg:absolute lg:left-0 lg:top-0 lg:w-64"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
                6:14 AM · Call log
              </p>
              <p className="mt-2 text-sm text-ink/75">
                Called four people. Two didn&rsquo;t pick up.
              </p>
            </motion.div>

            <motion.div
              variants={scatterCard}
              className="rotate-[2deg] rounded-xl border border-border bg-surface-raised p-4 shadow-sm lg:absolute lg:left-28 lg:top-24 lg:w-72"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
                Group text · 12 replies
              </p>
              <p className="mt-2 text-sm text-ink/75">
                &ldquo;can ANYONE cover 3rd period today??&rdquo;
              </p>
            </motion.div>

            <motion.div
              variants={scatterCard}
              className="rotate-[-1.5deg] rounded-xl border border-border bg-surface-raised p-4 shadow-sm lg:absolute lg:left-6 lg:top-[15rem] lg:w-64"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
                Coverage spreadsheet
              </p>
              <p className="mt-2 text-sm text-ink/75">
                <span className="line-through decoration-ink/40">R. Kim</span>{" "}
                ·{" "}
                <span className="line-through decoration-ink/40">J. Patel</span>{" "}
                · ???
              </p>
            </motion.div>

            <motion.div
              variants={scatterCard}
              className="rotate-[3deg] rounded-xl border border-accent-orange/30 bg-accent-orange/10 p-4 shadow-sm lg:absolute lg:left-44 lg:top-[19rem] lg:w-48"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                Sticky note
              </p>
              <p className="mt-2 text-sm text-ink/75">
                ask Denise, she usually knows
              </p>
            </motion.div>
          </motion.div>

          <Reveal delay={0.25}>
            <div className="rounded-2xl border border-border border-l-2 border-l-brand bg-surface-raised/90 p-7 shadow-[0_30px_80px_-25px_rgba(99,102,241,0.35)] backdrop-blur-md">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
                  3rd period · Room 214
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              </div>
              <p className="mt-3 text-xl font-semibold text-ink">M. Alvarez confirmed</p>
              <p className="mt-1 text-sm text-ink/60">
                Auto-matched in 40 seconds · fairness score 92
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink/40">
                  Next in line, if needed
                </p>
                <p className="mt-1.5 text-sm text-ink/55">J. Patel · D. Osei</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
