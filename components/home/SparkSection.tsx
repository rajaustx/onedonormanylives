"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal } from "@/lib/animation";

export function SparkSection() {
  return (
    <section className="border-y border-stone-200/60 bg-stone-50/50 py-16 dark:border-stone-800/60 dark:bg-stone-900/30">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <ScrollReveal variants={scrollReveal} className="space-y-4">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            A single act. A lasting ripple.
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            On February 10, 2026, Dr. Thankam became Karnataka&apos;s first anonymous, non-directed living
            kidney donor.
          </p>
          <p className="text-stone-600 dark:text-stone-400">
            This site exists for two reasons: to honor her courage, and to help more people discover
            a simpler first step that saves lives too: pledging posthumous organ donation.
          </p>
          <p className="text-sm italic text-stone-500 dark:text-stone-500">
            You do not need to donate a kidney to be part of this movement.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
