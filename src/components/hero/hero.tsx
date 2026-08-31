"use client";

import { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { FloatingStatusCard } from "./floating-status-card";
import { heroTextStore } from "@/lib/hero-text-store";

const HeroScene = dynamic(() => import("./hero-scene").then((m) => m.HeroScene), {
  ssr: false,
});

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const update = () => {
      heroTextStore.bottom =
        text.getBoundingClientRect().bottom - section.getBoundingClientRect().top;
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(text);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="pointer-events-none relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1400px] flex-col justify-center px-6 py-24 sm:px-10">
        <motion.div ref={textRef} variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.div
            variants={item}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-ink/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            Substitute coverage, automated
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-tight text-ink"
          >
            Coverage that
            <br />
            finds itself.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
            SubnGo matches every absence to the right substitute automatically —
            and keeps looking if the first pick can&rsquo;t make it.
          </motion.p>

          <motion.div variants={item} className="pointer-events-auto mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#demo"
              className="rounded-[10px] bg-brand px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
            >
              Request a demo
            </a>
            <a
              href="#how-it-works"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink/75 transition-colors hover:text-ink"
            >
              See how it works
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <FloatingStatusCard />
    </section>
  );
}
