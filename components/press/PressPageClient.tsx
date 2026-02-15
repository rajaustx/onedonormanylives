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

          {entries.length > 0 && (
            <nav
              className="mt-6 flex flex-wrap gap-x-4 gap-y-1 border-t border-stone-200/60 pt-6 dark:border-stone-700/60"
              aria-label="Jump to article"
            >
              <span className="sr-only">In this page:</span>
              {entries.map((entry) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className="text-sm text-stone-500 underline-offset-2 hover:text-amber-700 hover:underline dark:text-stone-400 dark:hover:text-amber-400"
                >
                  {entry.publication}
                </a>
              ))}
            </nav>
          )}
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
