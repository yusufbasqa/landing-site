"use client";

import { motion, useMotionTemplate, useTransform, type MotionValue } from "framer-motion";

type SceneProps = {
  progress: MotionValue<number>;
};

export function AbsenceScene({ progress }: SceneProps) {
  const badgeOpacity = useTransform(progress, [0, 0.3], [0, 1]);
  const notifyOpacity = useTransform(progress, [0.15, 0.55], [0, 1]);
  const notifyY = useTransform(progress, [0.15, 0.55], [16, 0]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-[16%] left-[13%]">
        <div className="h-9 w-9 rounded-full bg-accent-violet/80" />
        <div className="mt-1 h-24 w-16 rounded-t-full rounded-b-2xl bg-gradient-to-b from-accent-violet/70 to-accent-violet/30" />
      </div>

      <motion.div
        style={{ opacity: badgeOpacity }}
        className="absolute bottom-[32%] left-[36%] flex w-fit items-center gap-1.5 rounded-full border border-accent-orange/30 bg-accent-orange/10 px-2.5 py-1 font-mono text-[10px] text-accent-orange"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
        Out today
      </motion.div>

      <div className="absolute right-[18%] top-[18%] h-28 w-16 rounded-[1.1rem] border-2 border-ink/10 bg-surface">
        <div className="absolute left-1/2 top-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-ink/10" />
      </div>

      <motion.div
        style={{ opacity: notifyOpacity, y: notifyY }}
        className="absolute right-[6%] top-[13%] w-40 rounded-xl border border-border bg-surface-raised p-2.5 shadow-[0_20px_50px_-20px_rgba(20,21,43,0.35)]"
      >
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink/40">
          Standin · 6:02 AM
        </p>
        <p className="mt-1 text-[11px] font-medium text-ink">Ms. Chen · Out sick</p>
      </motion.div>
    </div>
  );
}

const STAFF_ORBS = [
  { x: 20, y: 68, color: "#8b5cf6", size: 22 },
  { x: 30, y: 28, color: "#6366f1", size: 26 },
  { x: 58, y: 18, color: "#6366f1", size: 20 },
  { x: 72, y: 58, color: "#8b5cf6", size: 24 },
];

const MATCH_ORB = { x: 46, y: 46, color: "#22d3ee", size: 28 };

export function SearchScene({ progress }: SceneProps) {
  const dim = useTransform(progress, [0, 1], [1, 0.25]);
  const matchScale = useTransform(progress, [0, 1], [0.85, 1.3]);
  const matchOpacity = useTransform(progress, [0, 1], [0.55, 1]);
  const matchGlow = useTransform(progress, [0, 1], [0.15, 0.55]);
  const glowShadow = useMotionTemplate`0 0 40px 10px rgba(34,211,238,${matchGlow})`;

  return (
    <div className="relative h-full w-full">
      {STAFF_ORBS.map((o, i) => (
        <motion.div
          key={i}
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: o.size,
            height: o.size,
            backgroundColor: o.color,
            opacity: dim,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      ))}
      <motion.div
        style={{
          left: `${MATCH_ORB.x}%`,
          top: `${MATCH_ORB.y}%`,
          width: MATCH_ORB.size,
          height: MATCH_ORB.size,
          backgroundColor: MATCH_ORB.color,
          scale: matchScale,
          opacity: matchOpacity,
          boxShadow: glowShadow,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
    </div>
  );
}

export function MatchScene({ progress }: SceneProps) {
  const sourceOpacity = useTransform(progress, [0, 1], [1, 0.3]);
  const trailOpacity = useTransform(progress, [0, 0.08], [0, 0.35]);
  const dotOpacity = useTransform(progress, [0, 0.85, 1], [1, 1, 0]);
  const dotX = useTransform(progress, [0, 1], [46, 78]);
  const dotY = useTransform(progress, (v) => 46 - Math.sin(v * Math.PI) * 16 + v * 12);
  const dotLeft = useMotionTemplate`${dotX}%`;
  const dotTop = useMotionTemplate`${dotY}%`;
  const ringScale = useTransform(progress, [0.85, 0.95, 1], [1, 1.16, 1]);
  const fillOpacity = useTransform(progress, [0.8, 1], [0, 1]);

  return (
    <div className="relative h-full w-full">
      <motion.div
        style={{ opacity: sourceOpacity }}
        className="absolute left-[46%] top-[46%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-teal"
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M46,46 Q64,28 78,58"
          fill="none"
          stroke="#22d3ee"
          strokeWidth={0.6}
          strokeLinecap="round"
          style={{ opacity: trailOpacity }}
        />
      </svg>

      <motion.div
        style={{ left: dotLeft, top: dotTop, opacity: dotOpacity }}
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_5px_rgba(34,211,238,0.7)]"
      />

      <div className="absolute left-[78%] top-[58%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{ scale: ringScale }}
          className="relative h-10 w-10 rounded-full border-2 border-accent-teal/70"
        >
          <motion.div
            style={{ opacity: fillOpacity }}
            className="absolute inset-1 rounded-full bg-accent-green"
          />
        </motion.div>
      </div>
    </div>
  );
}

export function ApprovalScene({ progress }: SceneProps) {
  const draw = useTransform(progress, [0.15, 0.8], [0, 1]);
  const fill = useTransform(progress, [0.5, 1], [0, 1]);
  const rippleScale = useTransform(progress, [0.75, 1], [0.7, 1.7]);
  const rippleOpacity = useTransform(progress, [0.75, 0.9, 1], [0, 0.35, 0]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute left-[12%] top-[16%] w-[46%] rounded-xl border border-border bg-surface-raised p-3">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink/40">Front office</p>
        <p className="mt-1.5 text-[11px] font-medium text-ink">M. Alvarez · Rm 214</p>
        <p className="mt-0.5 text-[10px] text-ink/50">Review coverage request</p>
      </div>

      <div className="relative h-16 w-16">
        <motion.div
          style={{ scale: rippleScale, opacity: rippleOpacity }}
          className="absolute inset-0 rounded-full border-2 border-accent-green"
        />
        <div className="absolute inset-0 rounded-full border-2 border-border bg-surface" />
        <motion.div style={{ opacity: fill }} className="absolute inset-0 rounded-full bg-accent-green" />
        <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full p-4">
          <motion.path
            d="M5 13l4 4L19 7"
            fill="none"
            stroke="#14152b"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: draw }}
          />
        </svg>
      </div>
    </div>
  );
}

export function ConfirmationScene({ progress }: SceneProps) {
  const notifyOpacity = useTransform(progress, [0, 0.35, 0.55], [1, 1, 0]);
  const notifyY = useTransform(progress, [0.35, 0.55], [0, -14]);
  const roomOpacity = useTransform(progress, [0.4, 0.62], [0, 1]);
  const roomY = useTransform(progress, [0.4, 0.62], [14, 0]);
  const doorRotate = useTransform(progress, [0.55, 0.9], [0, -24]);

  return (
    <div className="relative h-full w-full">
      <motion.div
        style={{ opacity: notifyOpacity, y: notifyY }}
        className="absolute left-1/2 top-[18%] w-44 -translate-x-1/2 rounded-xl border border-accent-green/25 bg-accent-green/10 p-3"
      >
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          <span className="font-mono text-[9px] uppercase tracking-wide text-accent-green">
            Confirmed
          </span>
        </div>
        <p className="mt-1.5 text-[11px] font-medium text-ink">3rd period · Room 214</p>
      </motion.div>

      <motion.div
        style={{ opacity: roomOpacity, y: roomY }}
        className="absolute inset-x-[10%] bottom-[16%] top-[24%]"
      >
        <div className="absolute right-[4%] top-0 h-full w-[18%]" style={{ perspective: 400 }}>
          <motion.div
            style={{ rotate: doorRotate }}
            className="h-full w-full origin-left rounded-md border-2 border-ink/15 bg-surface-raised"
          />
        </div>

        <div className="absolute bottom-0 left-0 flex w-[68%] justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-6 rounded-md bg-brand/70" />
          ))}
        </div>

        <div className="absolute left-[2%] top-0 h-10 w-10 rounded-full border-2 border-ink/15">
          <div
            className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-full rounded-full bg-ink/50"
            style={{ transformOrigin: "bottom center" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-full rotate-[75deg] rounded-full bg-ink/35"
            style={{ transformOrigin: "bottom center" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
