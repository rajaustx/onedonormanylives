"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeIn } from "@/lib/animation";

export function PortraitBreak() {
  return (
    <section className="border-t border-stone-200/40 bg-stone-100/50 py-24 dark:border-stone-800/40 dark:bg-stone-900/30 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal variants={fadeIn} className="text-center">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-100 sm:text-3xl">
            Why this matters
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-stone-600 dark:text-stone-400">
            Anonymous donation is legal. Safe. Regulated. One donor can trigger a transplant chain
            that helps multiple families. Dr. Thankam did not donate to someone she knew. She donated
            to everyone she would never meet.
          </p>
        </ScrollReveal>

        {/* Large portrait placeholder */}
        <ScrollReveal variants={fadeIn} className="mt-16">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl bg-stone-200/60 shadow-xl ring-1 ring-stone-200/60 dark:bg-stone-700/40 dark:ring-stone-600/40">
            <img
              src="/hero/meena_postsurgery.png"
              alt="Dr. Thankam Subramonian"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal variants={fadeIn} className="mt-6 text-center">
          <p className="font-serif text-xl font-medium text-stone-800 dark:text-stone-100">
            Dr. Thankam Subramonian
          </p>
          <p className="mt-1 text-sm font-medium text-stone-600 dark:text-stone-400">
            MD, DGO, DNB, MRCOG
          </p>
          <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
            Consultant – Fetal Medicine
          </p>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-500">
            Manipal Hospital, Airport Rd, Bangalore
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
