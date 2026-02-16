"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeIn } from "@/lib/animation";

const years = ["2014", "2016", "2018", "2020", "2022", "2024", "2026"];

export function TimelineBar() {
  return (
    <ScrollReveal variants={fadeIn} className="mt-12">
      <div className="rounded-xl border border-stone-200/60 bg-white/80 px-6 py-4 shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {years.map((year, i) => (
            <span
              key={year}
              className={`text-sm font-medium ${
                i === 0 || i === years.length - 1
                  ? "text-amber-700 dark:text-amber-400"
                  : "text-stone-500 dark:text-stone-400"
              }`}
            >
              {year}
            </span>
          ))}
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
          <div
            className="h-full bg-amber-600/60 dark:bg-amber-500/50"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </ScrollReveal>
  );
}
