"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal, scrollRevealLeft, scrollRevealRight } from "@/lib/animation";
const realityTiles = [
  {
    value: "25,000+",
    label: "Kidney transplants per year in the U.S.",
  },
  {
    value: "Majority = deceased donors",
    label: "Living donors are a minority",
  },
  {
    value: "Anonymous non-directed donors = rare",
    label: "But they can trigger transplant chains",
  },
  {
    value: "1 donor → multiple lives impacted",
    label: "Via paired exchange systems",
  },
];

export function MiniInfographicReality() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-stone-200/60 bg-white py-20 dark:border-stone-800/60 dark:bg-stone-950/50">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal variants={scrollReveal} className="mb-12 text-center">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            Kidney Transplant Reality Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-600 dark:text-stone-400">
            A single altruistic donor can unlock compatible matches that would otherwise never
            happen.
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={
            reduceMotion
              ? { hidden: {}, visible: {} }
              : {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
                  },
                }
          }
          className="grid gap-6 sm:grid-cols-2"
        >
          {realityTiles.map((tile, i) => (
            <motion.div
              key={i}
              variants={reduceMotion ? {} : scrollReveal}
              className="rounded-2xl border border-stone-200/60 bg-stone-50/50 p-6 dark:border-stone-700/40 dark:bg-stone-900/30"
            >
              <p className="font-serif text-xl font-semibold text-amber-700 dark:text-amber-400 sm:text-2xl">
                {tile.value}
              </p>
              <p className="mt-2 text-stone-600 dark:text-stone-400">{tile.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const usPoints = [
  "Opt-in system",
  "Most people register when getting a driver's license",
  "Donation requires explicit consent",
];

const singaporePoints = [
  "Presumed consent (opt-out) for certain organs",
  "Citizens are auto-enrolled unless they decline",
  "Donation is treated as a civic default",
];

const indiaPoints = [
  "Opt-in system (register via NOTTO)",
  "Family consent required for deceased donation",
  "Authorization committees evaluate living donors",
  "National registry coordinates allocation",
];

export function MiniInfographicCulture() {
  return (
    <section className="border-y border-stone-200/60 bg-stone-50/50 py-20 dark:border-stone-800/60 dark:bg-stone-900/30">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variants={scrollReveal} className="mb-12 text-center">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            Organ donation depends on culture
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal
            variants={scrollRevealLeft}
            className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50"
          >
            <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
              United States
            </h3>
            <ul className="mt-4 space-y-2">
              {usPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-600 dark:text-stone-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {point}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal
            variants={scrollReveal}
            className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50"
          >
            <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
              India
            </h3>
            <ul className="mt-4 space-y-2">
              {indiaPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-600 dark:text-stone-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {point}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal
            variants={scrollRevealRight}
            className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50"
          >
            <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
              Singapore
            </h3>
            <ul className="mt-4 space-y-2">
              {singaporePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-600 dark:text-stone-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {point}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal variants={scrollReveal} className="mt-8 text-center">
          <p className="text-sm italic text-stone-500 dark:text-stone-500">
            Policy reflects culture. Culture changes through stories.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function MiniInfographics() {
  return (
    <>
      <MiniInfographicReality />
      <MiniInfographicCulture />
    </>
  );
}
