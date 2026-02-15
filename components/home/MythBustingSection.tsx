"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal, scrollRevealLeft, scrollRevealRight } from "@/lib/animation";

const myths = [
  {
    myth: "You have to know someone who needs a kidney.",
    truth: "Anonymous donors give to a stranger. You don't need a connection—just the desire to help.",
  },
  {
    myth: "Donating is risky and will shorten your life.",
    truth: "Living donors lead normal, healthy lives. The procedure is safe, and donors are carefully screened.",
  },
  {
    myth: "It's only for young, super-fit people.",
    truth: "Healthy adults of many ages can donate. Each donor is evaluated individually.",
  },
];

export function MythBustingSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal variants={scrollReveal} className="mb-16 text-center">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            Common myths. Honest answers.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-600 dark:text-stone-400">
            We want to normalize this act of generosity. Here&apos;s what people often get wrong.
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {myths.map((item, i) => (
            <ScrollReveal
              key={i}
              variants={i % 2 === 0 ? scrollRevealLeft : scrollRevealRight}
              className="rounded-2xl border border-stone-200/60 bg-white p-8 dark:border-stone-700/40 dark:bg-stone-900/30"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <p className="font-medium text-stone-500 dark:text-stone-400">
                    Myth
                  </p>
                  <p className="mt-1 text-stone-800 dark:text-stone-200">
                    {item.myth}
                  </p>
                </div>
                <div className="flex-1 border-l border-stone-200 pl-6 dark:border-stone-700">
                  <p className="font-medium text-amber-700 dark:text-amber-400">
                    Truth
                  </p>
                  <p className="mt-1 text-stone-700 dark:text-stone-300">
                    {item.truth}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
