"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  AbsenceScene,
  SearchScene,
  MatchScene,
  ApprovalScene,
  ConfirmationScene,
} from "@/components/story/story-scenes";

const STAGES = [
  { time: "6:02 AM", eyebrow: "The absence", heading: "Ms. Chen can't come in today." },
  {
    time: "6:03 AM",
    eyebrow: "The search",
    heading: "The system checks who's free, who's dedicated, who hasn't worked in a while.",
  },
  {
    time: "6:04 AM",
    eyebrow: "The match",
    heading: "M. Alvarez — fairness score 92 — matched in 40 seconds.",
  },
  {
    time: "6:19 AM",
    eyebrow: "The approval",
    heading: "One tap from the front office. No forms, no calls.",
  },
  { time: "7:58 AM", eyebrow: "The confirmation", heading: "Covered." },
] as const;

const SCENES = [AbsenceScene, SearchScene, MatchScene, ApprovalScene, ConfirmationScene];

// Scroll distance dedicated to each stage. Wider = slower, smoother transitions.
const STAGE_VH = 160;

// Each stage is fully visible only in the middle 70% of its 1/5 segment;
// the outer 15% on either edge is a fade zone. Segments never overlap, so at
// most one stage is ever above 0 opacity at a time.
const FADE_FRACTION = 0.15;

function useStageWindow(scrollYProgress: MotionValue<number>, index: number, total: number) {
  const size = 1 / total;
  const start = index * size;
  const end = start + size;
  const fadeInEnd = start + FADE_FRACTION * size;
  const fadeOutStart = end - FADE_FRACTION * size;
  const input = [start, fadeInEnd, fadeOutStart, end];

  const opacity = useTransform(scrollYProgress, input, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, input, [16, 0, 0, -16]);
  const scale = useTransform(scrollYProgress, input, [0.97, 1, 1, 1.03]);
  // Internal stage choreography (orb travel, checkmark draw, ...) only
  // plays while the stage is fully visible, not during its fades.
  const local = useTransform(scrollYProgress, [fadeInEnd, fadeOutStart], [0, 1]);

  return { opacity, y, scale, local };
}

function HeaderIntro() {
  return (
    <div className="max-w-2xl">
      <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        How it works
      </div>
      <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink">
        One morning, start to finish.
      </h2>
    </div>
  );
}

function StoryProgress({
  scrollYProgress,
  activeStage,
}: {
  scrollYProgress: MotionValue<number>;
  activeStage: number;
}) {
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative mt-10 flex items-center justify-between">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
      <motion.div
        style={{ scaleX: fill }}
        className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-brand"
      />
      {STAGES.map((s, i) => (
        <div key={s.time} className="relative z-10 flex flex-col items-center gap-2 bg-surface-alt px-2">
          <span
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === activeStage
                ? "scale-125 bg-brand"
                : i < activeStage
                  ? "bg-brand/50"
                  : "bg-border"
            }`}
          />
          <span
            className={`hidden font-mono text-[10px] transition-colors duration-300 sm:block ${
              i === activeStage ? "text-ink" : "text-ink/35"
            }`}
          >
            {s.time}
          </span>
        </div>
      ))}
    </div>
  );
}

function SceneCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px]">
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(99,102,241,0.2),transparent_70%)] blur-3xl"
      />
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-surface-raised shadow-[0_50px_120px_-40px_rgba(20,21,43,0.35)]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(20,21,43,0.06) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        {children}
      </div>
    </div>
  );
}

function StaticStory() {
  const settled = useMotionValue(1);

  return (
    <section id="how-it-works" className="relative bg-surface-alt py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <HeaderIntro />
        <div className="mt-16 flex flex-col gap-20">
          {STAGES.map((s, i) => {
            const Scene = SCENES[i];
            return (
              <div key={s.time} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <SceneCanvas>
                  <Scene progress={settled} />
                </SceneCanvas>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand/70">
                    {s.time} · {s.eyebrow}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                    {s.heading}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PinnedStory() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length)));
    // TEMP DEBUG — remove once the stage math is confirmed in-browser.
    console.log(`[how-it-works] scrollYProgress=${v.toFixed(3)} activeStage=${next}`);
    setActiveStage((prev) => (prev === next ? prev : next));
  });

  const stages = [
    useStageWindow(scrollYProgress, 0, STAGES.length),
    useStageWindow(scrollYProgress, 1, STAGES.length),
    useStageWindow(scrollYProgress, 2, STAGES.length),
    useStageWindow(scrollYProgress, 3, STAGES.length),
    useStageWindow(scrollYProgress, 4, STAGES.length),
  ];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative bg-surface-alt"
      style={{ height: `${STAGES.length * STAGE_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
          <HeaderIntro />
          <StoryProgress scrollYProgress={scrollYProgress} activeStage={activeStage} />

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <SceneCanvas>
              {STAGES.map((s, i) => {
                const Scene = SCENES[i];
                const stage = stages[i];
                return (
                  <motion.div
                    key={s.time}
                    style={{ opacity: stage.opacity, scale: stage.scale }}
                    className="absolute inset-0"
                  >
                    <Scene progress={stage.local} />
                  </motion.div>
                );
              })}
            </SceneCanvas>

            <div className="relative min-h-[9rem] lg:min-h-[12rem]">
              {STAGES.map((s, i) => {
                const stage = stages[i];
                return (
                  <motion.div
                    key={s.time}
                    style={{ opacity: stage.opacity, y: stage.y }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand/70">
                      {s.time} · {s.eyebrow}
                    </p>
                    <p className="mt-3 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                      {s.heading}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? <StaticStory /> : <PinnedStory />;
}
