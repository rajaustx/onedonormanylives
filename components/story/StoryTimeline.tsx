"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { scrollRevealLeft, scrollRevealRight } from "@/lib/animation";

const timelineEvents = [
  {
    year: "2014 — May",
    title: "The Spark",
    subheader: "Where the journey began",
    summary:
      "In May 2014, Dr. Thankam heard a talk on organ donation at Manipal Hospital, Bangalore. Although many pledged that day, she learned that only a small fraction of pledges translate into actual donations. That gap stayed with her.",
    side: "left" as const,
  },
  {
    year: "2016 — December",
    title: "A Decision to Act",
    subheader: "Choosing to be in charge",
    summary:
      "By December 2016, she decided not to leave it to circumstance. She chose to donate a kidney while alive, anonymously, to whoever needed it most.",
    side: "right" as const,
  },
  {
    year: "2017 — Jan–Feb",
    title: "Medical Workup",
    subheader: "Fit to donate",
    summary:
      "In early 2017, she completed the required scans and blood tests. The evaluation process felt routine, and the workup confirmed she was medically fit. The donor evaluation was provided at no cost.",
    side: "left" as const,
  },
  {
    year: "2017–2023",
    title: "Years of Waiting",
    subheader: "A system not built for this",
    summary:
      "Approval required a hospital authorization committee. Because anonymous living donation was unfamiliar locally, progress stalled. Her doctors advocated repeatedly, but the case kept getting deferred.",
    side: "right" as const,
  },
  {
    year: "2023 — Jan–Mar",
    title: "Police Verification and a Match",
    subheader: "A recipient identified",
    summary:
      "In early 2023, she completed police verification, interviews, and extensive documentation. A compatible recipient was identified: a 24-year-old orphan boy on the waiting list.",
    side: "left" as const,
  },
  {
    year: "2023 — Committee Decision",
    title: "A Painful No",
    subheader: "\"No relationship established\"",
    summary:
      "Despite sympathetic listening, the committee rejected the request, citing inability to establish a relationship between donor and recipient. The irony: the donation was anonymous by intent.",
    side: "right" as const,
  },
  {
    year: "2024 — Aftermath",
    title: "A Quiet Year",
    subheader: "Hope dimmed, time passing",
    summary:
      "For nearly a year, she stepped back. The journey had already spanned years, and she was getting older. Then she learned the earlier matched recipient had passed away.",
    side: "left" as const,
  },
  {
    year: "2025 — January",
    title: "Legal Recourse",
    subheader: "A new path forward",
    summary:
      "In January 2025, she returned to her transplant team determined to try again. She was advised that the remaining path was legal, and she chose to pursue it.",
    side: "right" as const,
  },
  {
    year: "2025 — Mar–Jun",
    title: "Case Preparation",
    subheader: "Building the petition",
    summary:
      "She shared her full documentation with counsel before leaving for a Doctors Without Borders mission. By June 2025, the legal review concluded there was a strong case to be made.",
    side: "left" as const,
  },
  {
    year: "2025 — December",
    title: "High Court Ruling",
    subheader: "A precedent-setting win",
    summary:
      "In December 2025, the Karnataka High Court ruled in her favor and directed the authorization committee to grant permission. The order was time-bound and required rapid recipient matching.",
    side: "right" as const,
  },
  {
    year: "2026 — February 2",
    title: "Approval at Last",
    subheader: "Permission granted",
    summary:
      "The authorization committee met again on February 2, 2026. Backed by the court order, her case was approved, clearing the way for surgery within days.",
    side: "left" as const,
  },
  {
    year: "2026 — February 10",
    title: "The Donation",
    subheader: "A journey fulfilled",
    summary:
      "On February 10, 2026, the surgery took place. After nearly a decade of persistence, Dr. Thankam successfully completed an anonymous living kidney donation.",
    side: "right" as const,
  },
];

export function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const reduceMotion = useReducedMotion();

  const lineHeight = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    reduceMotion ? ["0%", "100%", "100%", "100%", "100%", "100%"] : ["0%", "20%", "40%", "60%", "80%", "100%"]
  );

  return (
    <section ref={containerRef} className="relative border-t border-stone-200/40 bg-stone-50/80 py-20 dark:border-stone-800/40 dark:bg-stone-950/95 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-16 text-center font-serif text-2xl font-medium text-stone-800 dark:text-stone-100 sm:text-3xl">
          2014 → 2026
        </h2>

        <div className="relative">
          {/* Vertical line - thick for visible scroll progress */}
          <div className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700 sm:w-4">
            {!reduceMotion && (
              <motion.div
                className="absolute left-0 top-0 h-full w-full origin-top rounded-full bg-amber-600 dark:bg-amber-500"
                style={{ scaleY: lineHeight }}
              />
            )}
          </div>

          <div className="space-y-0">
            {timelineEvents.map((event, i) => (
              <TimelineNode
                key={event.year}
                event={event}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({
  event,
  index,
  reduceMotion,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
  reduceMotion: boolean;
}) {
  const variants = event.side === "left" ? scrollRevealLeft : scrollRevealRight;
  const finalVariants = reduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : variants;

  const card = (
    <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50">
      <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">{event.year}</p>
      <h3 className="mt-2 font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
        {event.title}
      </h3>
      {"subheader" in event && event.subheader && (
        <p className="mt-1 text-sm font-medium text-stone-500 dark:text-stone-400">
          {event.subheader}
        </p>
      )}
      <p className="mt-3 text-stone-600 dark:text-stone-400">{event.summary}</p>
    </div>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={finalVariants}
      className="relative flex min-h-[160px] items-center py-12 md:py-16"
    >
      <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-6">
        <div className="flex w-full justify-center md:w-[calc(50%-1.5rem)] md:justify-end md:pr-6">
          {event.side === "left" ? card : <div className="hidden w-[calc(50%-1.5rem)] md:block" />}
        </div>
        <div className="flex shrink-0">
          <div className="h-6 w-6 rounded-full border-2 border-amber-600 bg-white shadow-sm dark:border-amber-500 dark:bg-stone-900 sm:h-7 sm:w-7" />
        </div>
        <div className="flex w-full justify-center md:w-[calc(50%-1.5rem)] md:justify-start md:pl-6">
          {event.side === "right" ? card : <div className="hidden w-[calc(50%-1.5rem)] md:block" />}
        </div>
      </div>
    </motion.div>
  );
}
