"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeIn } from "@/lib/animation";

export function CourtSeal() {
  return (
    <ScrollReveal variants={fadeIn} className="mt-12 flex justify-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-stone-300/80 bg-stone-50/80 dark:border-stone-600/60 dark:bg-stone-800/50">
        <svg
          className="h-10 w-10 text-stone-500 dark:text-stone-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 3v4m0 10v4M3 12h4m10 0h4" />
          <path d="M12 7v10M8 12h8" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      </div>
    </ScrollReveal>
  );
}
