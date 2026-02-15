"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal } from "@/lib/animation";

const stats = [
  {
    value: "~90,000",
    label: "People waiting for a kidney in the U.S.",
    source: "UNOS",
  },
  {
    value: "~6,000",
    label: "Living donor kidney transplants each year in the U.S.",
    source: "OPTN/HRSA",
  },
  {
    value: "1",
    label: "Non-directed donor can start a chain of 10+ transplants",
    source: "National Kidney Registry",
  },
];

export function StatsSection() {
  return (
    <section className="border-y border-stone-200/60 bg-stone-50/50 py-20 dark:border-stone-800/60 dark:bg-stone-900/30">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal variants={scrollReveal} className="mb-16 text-center">
          <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            The need in the United States
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-600 dark:text-stone-400">
            Every day, thousands wait. One anonymous donor can change everything.
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
          className="grid gap-8 sm:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={scrollReveal}
              className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-stone-200/60 dark:bg-stone-900/50 dark:ring-stone-700/40"
            >
              <p className="text-3xl font-semibold text-amber-700 dark:text-amber-400 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-stone-600 dark:text-stone-400">{stat.label}</p>
              <p className="mt-2 text-xs text-stone-400 dark:text-stone-500">
                Source: {stat.source}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
