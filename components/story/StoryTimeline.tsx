"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { scrollRevealLeft, scrollRevealRight } from "@/lib/animation";

const timelineEvents = [
  {
    year: "2014",
    title: "The spark",
    summary:
      "Dr. Thankam heard a speech about organ donation at her hospital in Bangalore. She signed up for posthumous donation—then discovered that few pledges ever become reality. She decided she wanted action, not chance.",
    side: "left" as const,
  },
  {
    year: "2016",
    title: "The decision",
    summary:
      "She made a decision that had never happened in Karnataka: donate a kidney while alive. Not to a friend. Not to a relative. To a stranger. Doctors were surprised. She was declared fit to donate.",
    side: "right" as const,
  },
  {
    year: "2017–2023",
    title: "Six years of \"no\"",
    summary:
      "The medical system was not built for a donor without a recipient. Committees refused. Meetings passed. Applications stalled. Her family worried. No one wanted to be the first to say yes.",
    side: "left" as const,
  },
  {
    year: "2023",
    title: "A boy she never met",
    summary:
      "A 24-year-old orphan was matched as a recipient. The committee rejected the transplant—they could not prove a relationship. Months later, she learned the boy had died. She carried that news heavily. And refused to stop.",
    side: "right" as const,
  },
  {
    year: "2025",
    title: "The High Court became her ally",
    summary:
      "She chose the final path: legal action. Hearings followed. Documents were reviewed. In December 2025, the High Court of Karnataka ruled in her favor. The committee was ordered to approve the donation.",
    side: "left" as const,
  },
  {
    year: "Feb 10, 2026",
    title: "The surgery",
    summary:
      "The authorization committee finally said yes. Twelve years after the spark, the donation happened. One act. One chain. Many lives.",
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
          {/* Vertical line - thicker for prominence */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
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
          <div className="h-5 w-5 rounded-full border-2 border-amber-600 bg-white shadow-sm dark:border-amber-500 dark:bg-stone-900" />
        </div>
        <div className="flex w-full justify-center md:w-[calc(50%-1.5rem)] md:justify-start md:pl-6">
          {event.side === "right" ? card : <div className="hidden w-[calc(50%-1.5rem)] md:block" />}
        </div>
      </div>
    </motion.div>
  );
}
