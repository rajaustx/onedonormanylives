"use client";

import { StoryHero } from "./StoryHero";
import { StoryTimeline } from "./StoryTimeline";
import { WhatWeLearnedSection } from "./WhatWeLearnedSection";
import { PortraitBreak } from "./PortraitBreak";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { PLEDGE_CTA } from "@/lib/cta";
import { useContactModal } from "@/components/contact/ContactModalContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeIn } from "@/lib/animation";

export function OneDonorsStoryClient() {
  const { openContactModal } = useContactModal();

  return (
    <main className="min-h-screen bg-stone-50/80 dark:bg-stone-950/95">
      <StoryHero />

      <StoryTimeline />

      <WhatWeLearnedSection />

      <PortraitBreak />

      {/* Final CTA */}
      <section className="border-t border-stone-200/60 bg-stone-100/50 py-24 dark:border-stone-800/60 dark:bg-stone-900/30">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal variants={fadeIn} className="space-y-6">
            <h2 className="font-serif text-3xl font-medium text-stone-900 dark:text-stone-100 sm:text-4xl">
              A movement begins with one decision
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              Her story is not an ending. It is an invitation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
              <AnimatedButton href={PLEDGE_CTA.href} variant="primary">
                {PLEDGE_CTA.label}
              </AnimatedButton>
              <button
                type="button"
                onClick={openContactModal}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-amber-600 px-8 py-4 font-medium text-amber-700 transition-colors hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-950/30"
              >
                Leave a message of gratitude
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
