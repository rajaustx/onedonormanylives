"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal } from "@/lib/animation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export function OneDonorStorySection() {
  return (
    <section id="one-donor-story" className="border-y border-stone-200/60 bg-stone-50/50 py-20 dark:border-stone-800/60 dark:bg-stone-900/30">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal variants={scrollReveal} className="space-y-6">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            One donor&apos;s story
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            A single anonymous kidney donation became the first link in a life-saving chain.
          </p>
          <p className="text-stone-600 dark:text-stone-400">
            Dr. Thankam Subramonian chose to donate a kidney to someone she had never met. This act is called non-directed donation. It is legal, voluntary, and one of the most powerful forms of generosity in modern medicine.
          </p>
          <p className="text-stone-600 dark:text-stone-400">
            One decision can trigger a transplant chain that helps multiple families. Her story is not the end. It is the beginning.
          </p>
          <AnimatedButton href="/one-donors-story" variant="primary" className="mt-6">
            Read her journey →
          </AnimatedButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
