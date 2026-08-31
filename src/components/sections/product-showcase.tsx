"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { BrowserFrame } from "@/components/showcase/browser-frame";
import { PhoneFrame } from "@/components/showcase/phone-frame";

const DESKTOP_SCREENS = [
  {
    url: "app.subngo.app/reports",
    accent: "brand" as const,
    caption: "Admin console · Reports",
    src: "/screenshots/reports.png",
    width: 1851,
    height: 2331,
    alt: "SubnGo reports page listing teacher absences, substitute workload, and coverage gaps",
    offset: "",
  },
  {
    url: "app.subngo.app/schedule",
    accent: "teal" as const,
    caption: "Admin console · Schedule, by teacher",
    src: "/screenshots/schedule-teacher.png",
    width: 1037,
    height: 911,
    alt: "SubnGo schedule grid filtered to view by teacher",
    offset: "md:mt-16",
  },
];

const MOBILE_SCREENS = [
  {
    accent: "teal" as const,
    caption: "Teacher app · Home",
    src: "/screenshots/teacher-home.jpeg",
    alt: "Teacher home screen showing PTO balance and today's coverage tasks",
    offset: "sm:translate-y-4",
  },
  {
    accent: "brand" as const,
    caption: "Admin console · Approvals",
    src: "/screenshots/admin-approvals.jpeg",
    alt: "Admin approval detail for a coverage request, with an auto-approved badge",
    offset: "sm:-translate-y-6",
  },
  {
    accent: "teal" as const,
    caption: "Teacher app · Calendar",
    src: "/screenshots/calendar.jpeg",
    alt: "Calendar view with a holiday tapped open",
    offset: "sm:translate-y-8",
  },
];

export function ProductShowcase() {
  return (
    <section id="product" className="relative overflow-hidden bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="max-w-2xl">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
            See it in action
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            This is the real product.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/60">
            No staged mockups. These are live screens from the teacher app
            and the admin console, doing exactly what they do every school day.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2 md:gap-x-14">
          {DESKTOP_SCREENS.map((screen, i) => (
            <Reveal key={screen.caption} delay={i * 0.12} className={screen.offset}>
              <BrowserFrame url={screen.url} accent={screen.accent}>
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="h-full w-full object-cover object-top"
                />
              </BrowserFrame>
              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">
                {screen.caption}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap items-start justify-center gap-x-10 gap-y-16 sm:gap-x-14 lg:gap-x-20">
          {MOBILE_SCREENS.map((screen, i) => (
            <Reveal key={screen.caption} delay={0.24 + i * 0.12} className={screen.offset}>
              <PhoneFrame accent={screen.accent}>
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={738}
                  height={1600}
                  sizes="230px"
                  className="h-full w-full object-cover"
                />
              </PhoneFrame>
              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">
                {screen.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
