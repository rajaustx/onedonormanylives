"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal, scrollRevealLeft, scrollRevealRight } from "@/lib/animation";

const movementStages = [
  {
    title: "Fringe",
    subhead: "A few people act before society understands",
    body: "At the beginning, only a handful of people step forward. The act feels radical because the system around it does not yet exist.",
    side: "left" as const,
  },
  {
    title: "Rare",
    subhead: "Legal, possible, but unfamiliar",
    body: "Even in mature healthcare systems, anonymous living donation remains uncommon. Rare does not mean insignificant. Rare often means early.",
    side: "right" as const,
  },
  {
    title: "Symbolic",
    subhead: "Stories shift what society believes is possible",
    body: "Early cases become stories. Stories build trust. Trust changes culture.",
    side: "left" as const,
  },
  {
    title: "Regulated",
    subhead: "Systems evolve to support ethical donation",
    body: "Oversight grows to protect donors and recipients, reduce exploitation risk, and make the act safe and repeatable.",
    side: "right" as const,
  },
  {
    title: "Normalized",
    subhead: "Understood, respected, part of civic life",
    body: "Donation becomes a civic virtue: not necessarily common, but widely understood and respected.",
    side: "left" as const,
  },
  {
    title: "Celebrated",
    subhead: "Honored as an act of civic virtue",
    body: "Donors are celebrated and honored. The act moves from exceptional to exemplary—a model for what society values.",
    side: "right" as const,
  },
];

export function HowChangeBeginsSection() {
  return (
    <section className="border-y border-stone-200/60 bg-stone-50/50 py-20 dark:border-stone-800/60 dark:bg-stone-900/30">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal variants={scrollReveal} className="mb-12 text-center">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            How change begins
          </h2>
          <p className="mx-auto mt-2 font-medium text-stone-600 dark:text-stone-400">
            Every life-saving system follows a pattern.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-stone-600 dark:text-stone-400">
            Every life-saving movement starts at the margins. What feels rare today can become normal
            tomorrow.
          </p>
        </ScrollReveal>

        <ScrollReveal variants={scrollReveal} className="mb-12 text-center">
          <p className="text-sm text-stone-500 dark:text-stone-500">
            Anonymous donation is still early in this arc.
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {movementStages.map((stage, index) => (
            <ScrollReveal
              key={stage.title}
              variants={stage.side === "left" ? scrollRevealLeft : scrollRevealRight}
              className="flex gap-6 rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20">
                <span className="font-serif text-4xl font-light tabular-nums text-amber-700 dark:text-amber-400 sm:text-5xl">
                  {index + 1}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-xl font-medium text-amber-700 dark:text-amber-400 sm:text-2xl">
                  {stage.title}
                </p>
                <p className="mt-1 font-medium text-stone-800 dark:text-stone-200">
                  {stage.subhead}
                </p>
                <p className="mt-3 text-stone-600 dark:text-stone-400">{stage.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variants={scrollReveal} className="mt-12 space-y-4 text-center">
          <p className="font-medium italic text-stone-600 dark:text-stone-400">
            Movements begin when a few people act before the world is ready.
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-500">
            Today&apos;s exception can become tomorrow&apos;s norm.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
