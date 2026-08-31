"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

export function CTA() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedAt(
      new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    );
    setSubmitted(true);
  }

  return (
    <section id="demo" className="relative overflow-hidden bg-surface py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(244,147,60,0.16),rgba(34,211,238,0.1)_60%,transparent_80%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Get started
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            See it match your next absence.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/60">
            Fifteen minutes. Bring a real schedule if you want, and we&rsquo;ll
            show you a live match.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-md">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface-raised/80 p-7 shadow-[0_30px_90px_-30px_rgba(244,147,60,0.35)] backdrop-blur-md">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="font-mono text-[11px] uppercase tracking-wide text-ink/45"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jordan Lee"
                      className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="font-mono text-[11px] uppercase tracking-wide text-ink/45"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jordan@lincolnschools.edu"
                      className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="school"
                      className="font-mono text-[11px] uppercase tracking-wide text-ink/45"
                    >
                      School or district name
                    </label>
                    <input
                      id="school"
                      name="school"
                      type="text"
                      required
                      placeholder="Lincoln Elementary"
                      className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 rounded-[10px] bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
                  >
                    Request a demo
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="py-4 text-center"
                >
                  <div className="mx-auto flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink/45">
                      {submittedAt} · Request received
                    </p>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-ink">
                    You&rsquo;re on the list.
                  </p>
                  <p className="mt-1.5 text-sm text-ink/60">
                    We&rsquo;ll reach out within a day to schedule your demo.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
