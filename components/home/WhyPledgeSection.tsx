"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal } from "@/lib/animation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export function WhyPledgeSection() {
  return (
    <section id="why-pledge" className="border-y border-stone-200/60 bg-amber-50/30 py-20 dark:border-stone-800/60 dark:bg-stone-900/50">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal variants={scrollReveal} className="space-y-6">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            Most life-saving donations happen after death
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            You do not have to donate a kidney while alive to change lives.
          </p>
          <p className="text-stone-600 dark:text-stone-400">
            A simple pledge today allows doctors to honor your decision in the future. One donor can save up to eight lives and help dozens more through tissue donation.
          </p>
          <p className="text-stone-600 dark:text-stone-400">
            This is one of the highest impact decisions an ordinary person can make.
          </p>
          <AnimatedButton href="/pledge" variant="primary" className="mt-6">
            Pledge to be an organ donor
          </AnimatedButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
