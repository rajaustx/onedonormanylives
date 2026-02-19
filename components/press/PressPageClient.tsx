"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { PressCard } from "@/components/press/PressCard";
import type { PressEntry } from "@/lib/press";

interface PressPageClientProps {
  entries: PressEntry[];
}

export function PressPageClient({ entries }: PressPageClientProps) {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen pt-20">
      <section className="border-b border-stone-200/60 bg-stone-50/95 px-6 py-8 dark:border-stone-800/60 dark:bg-stone-950/95">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-3xl font-light text-stone-900 dark:text-stone-100 sm:text-4xl">
            Press
          </h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Media coverage of anonymous kidney donation and related stories.
          </p>

          {entries.length > 0 && (() => {
            const englishEntries = entries
              .filter((e) => (e.language ?? "en") === "en")
              .sort((a, b) => a.publication.localeCompare(b.publication));
            const otherEntries = entries
              .filter((e) => (e.language ?? "en") === "other")
              .sort((a, b) => a.publication.localeCompare(b.publication));
            return (
              <nav
                className="mt-8 border-t border-stone-200/60 pt-6 dark:border-stone-700/60"
                aria-label="Jump to article"
              >
                <span className="font-serif text-sm font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                  In this page
                </span>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2 rounded-xl border border-amber-200/60 bg-amber-50/50 px-4 py-3 dark:border-amber-800/40 dark:bg-amber-950/20">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      English
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {englishEntries.map((entry) => (
                        <a
                          key={entry.id}
                          href={`#${entry.id}`}
                          className="text-base font-medium text-amber-900 underline-offset-2 hover:text-amber-700 hover:underline dark:text-amber-100 dark:hover:text-amber-300"
                        >
                          {entry.publication}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 rounded-xl border border-stone-300/60 bg-stone-100/80 px-4 py-3 dark:border-stone-600/40 dark:bg-stone-800/30">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                      Kannada, Malayalam, Tamil & others
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {otherEntries.map((entry) => (
                        <a
                          key={entry.id}
                          href={`#${entry.id}`}
                          className="text-base font-medium text-stone-700 underline-offset-2 hover:text-amber-700 hover:underline dark:text-stone-300 dark:hover:text-amber-400"
                        >
                          {entry.publication}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>
            );
          })()}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-16">
          {entries.map((entry, i) => (
            <PressCard
              key={entry.id}
              entry={entry}
              index={i}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
