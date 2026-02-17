"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal } from "@/lib/animation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { PLEDGE_CTA } from "@/lib/cta";

export function JoinMovementSection() {
  return (
    <section id="join-movement" className="border-y border-stone-200/60 bg-stone-50/50 py-20 dark:border-stone-800/60 dark:bg-stone-900/30">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal variants={scrollReveal} className="space-y-6">
          <h2 className="font-serif text-2xl font-medium text-stone-800 dark:text-stone-200 sm:text-3xl">
            A movement begins with one decision
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            Dr. Thankam showed what one person can do. Now the question is how many will follow. Add your pledge. Share her story. Leave a message of gratitude. Help normalize donation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <AnimatedButton href={PLEDGE_CTA.href} variant="primary">
              {PLEDGE_CTA.label}
            </AnimatedButton>
            <AnimatedButton href="/wall" variant="secondary">
              Leave a message
            </AnimatedButton>
            <AnimatedButton href="/one-donors-story" variant="secondary">
              Read the story
            </AnimatedButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
