"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal } from "@/lib/animation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { PLEDGE_CTA } from "@/lib/cta";

export function PledgeCTABand() {
  return (
    <section className="border-y border-stone-200/60 bg-amber-50/40 py-20 dark:border-stone-800/60 dark:bg-amber-950/20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <ScrollReveal variants={scrollReveal} className="space-y-6">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            Ready for a lower-bar first step?
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            Pledging posthumous organ donation is one of the most meaningful commitments a person can
            make.
          </p>
          <p className="text-stone-600 dark:text-stone-400">
            It saves lives, supports transplant systems, and makes future &quot;firsts&quot; easier.
          </p>
          <AnimatedButton href={PLEDGE_CTA.href} variant="primary" className="mt-6">
            {PLEDGE_CTA.label}
          </AnimatedButton>
          <p className="mt-4 text-xs text-stone-500 dark:text-stone-500">
            This pledge is about posthumous organ donation, not living kidney donation.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
