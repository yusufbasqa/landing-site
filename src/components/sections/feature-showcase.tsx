"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { MatchingEngineVisual } from "@/components/features/matching-engine-visual";
import { CascadeVisual } from "@/components/features/cascade-visual";
import { DetailCard, detailCardVariant } from "@/components/features/detail-card";

export function FeatureShowcase() {
  return (
    <section id="features" className="relative bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="max-w-2xl">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            The mechanics
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            Every match runs on the same logic.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/60">
            Not a form that routes to a person. An engine that ranks, reassigns,
            and keeps everyone in the loop on its own.
          </p>
        </Reveal>

        {/* Matching engine */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand/70">
              Matching engine
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Ranks every candidate, then picks the fairest one.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60">
              Standin scores each available substitute on dedication to your
              school and how recently they&rsquo;ve worked — so the same three
              people don&rsquo;t get every shift, and dedicated subs get first
              call at the schools they know.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <MatchingEngineVisual />
          </Reveal>
        </div>

        {/* Cascade reassignment */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand/70">
              Cascade reassignment
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
              If your substitute cancels, the system just keeps going.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60">
              No new phone calls. When a confirmed substitute becomes
              unavailable themselves, Standin reassigns from the same ranked
              list — instantly, without anyone picking up a phone.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:order-1">
            <CascadeVisual />
          </Reveal>
        </div>

        {/* Supporting features */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-24 grid gap-6 sm:grid-cols-2"
        >
          <DetailCard
            label="PTO tracking"
            title="Absences log themselves."
            body="Standin ties into your school's clock-in system, so a missed scan becomes a logged absence automatically — no manual entry."
          >
            <div className="rounded-lg border border-border bg-surface-alt/60 p-3 font-mono text-[11px] text-ink/55">
              <div className="flex items-center justify-between">
                <span>Clock-in, 3rd period</span>
                <span className="text-ink/35">— no scan —</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span>PTO logged</span>
                <span className="text-accent-green">7:58 AM ✓</span>
              </div>
            </div>
          </DetailCard>

          <DetailCard
            label="Messaging"
            title="Only who needs to talk, can."
            body="Substitutes and staff message each other while a coverage is active — and lose access the moment it ends."
          >
            <div className="space-y-1.5">
              <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-brand/10 px-2.5 py-1.5 text-xs text-ink/80">
                Can you start 5 min early?
              </div>
              <div className="w-fit max-w-[85%] rounded-lg rounded-bl-sm bg-surface-alt px-2.5 py-1.5 text-xs text-ink/80">
                On my way
              </div>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-ink/35">
              Visible while covering Rm 214 only
            </p>
          </DetailCard>

          <DetailCard
            label="Notifications"
            title="The right people, the moment it matters."
            body="Substitutes are notified the instant they're matched. Admins are notified the instant something needs attention."
          >
            <motion.div
              variants={detailCardVariant}
              className="rounded-lg border border-border bg-surface-raised p-2.5 shadow-sm"
            >
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                Standin · now
              </span>
              <p className="mt-0.5 text-xs text-ink/75">
                You&rsquo;re confirmed for 3rd period, Room 214
              </p>
            </motion.div>
          </DetailCard>

          <DetailCard
            label="Multi-school"
            title="One account, every building."
            body="Districts run every school's coverage from one place — substitutes can be dedicated to one site or float across several."
          >
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center gap-2 text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Lincoln Elementary
              </div>
              <div className="flex items-center gap-2 text-ink/40">
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                Washington Middle
              </div>
              <div className="flex items-center gap-2 text-ink/40">
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                Roosevelt High
              </div>
            </div>
          </DetailCard>
        </motion.div>
      </div>
    </section>
  );
}
