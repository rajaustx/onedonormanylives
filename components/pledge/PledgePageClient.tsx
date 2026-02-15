"use client";

import { PledgeForm } from "@/components/PledgeForm";
import { PledgeCounter } from "@/components/PledgeCounter";
import { PledgeFAQs } from "@/components/pledge/PledgeFAQs";
import { PledgeCards } from "@/components/pledge/PledgeCards";
import { PLEDGE_REGISTRIES } from "@/lib/pledge-registries";
import type { PledgeEntry } from "@/lib/pledges";

interface PledgePageClientProps {
  pledgeData: PledgeEntry[];
  pledgeCount: number;
}

export function PledgePageClient({ pledgeData, pledgeCount }: PledgePageClientProps) {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50/50 to-stone-200/80 px-6 py-6 dark:from-stone-900 dark:via-amber-950/20 dark:to-stone-800">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-light tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl">
            Pledge Your Intent
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
            Share your intent to donate organs after life—posthumous donation, not living donation.
            Your pledge here motivates others and normalizes organ donation before they register officially.
          </p>
        </div>
      </section>

      {/* Two-column: Form + FAQs */}
      <section
        id="pledge-form"
        className="scroll-mt-24 bg-gradient-to-b from-stone-50/50 to-white px-6 py-12 dark:from-stone-950/50 dark:to-stone-900/30"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:grid-rows-1">
            {/* Left: Form card */}
            <div className="min-w-0">
              <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50 md:p-8">
                <h2 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
                  Make the pledge
                </h2>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                  We&apos;ll display only your first name and last initial for privacy.
                </p>
                <div className="mt-6">
                  <PledgeForm />
                </div>
              </div>
            </div>

            {/* Right: FAQs — equal width to form */}
            <div id="pledge-faqs" className="scroll-mt-24 min-w-0">
              <div className="sticky top-28 rounded-xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50 md:p-8">
                <h2 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
                  FAQs about posthumous organ donation
                </h2>
                <div className="mt-4">
                  <PledgeFAQs />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who's pledged / Why I pledged — cards */}
      <section
        id="pledge-wall"
        className="scroll-mt-24 border-t border-stone-200/60 bg-stone-50/50 px-6 py-12 dark:border-stone-700/40 dark:bg-stone-950/50"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <PledgeCounter count={pledgeCount} align="center" />
          </div>
          <PledgeCards data={pledgeData} />
        </div>
      </section>

      {/* Last: Official registration */}
      <section
        id="official-registration"
        className="scroll-mt-24 border-t border-stone-200/60 bg-white px-6 py-12 dark:border-stone-700/40 dark:bg-stone-900/30"
      >
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-amber-200/60 bg-amber-50/50 px-5 py-5 dark:border-amber-800/40 dark:bg-amber-950/20">
            <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
              Next: Complete your official registration
            </p>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              OneDonorManyLives is not an official registry. After pledging here, register through your
              country&apos;s official organ donor registry.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PLEDGE_REGISTRIES.map((r) => (
                <a
                  key={r.country}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-amber-300/60 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-50 dark:border-amber-700/40 dark:bg-stone-900/50 dark:text-amber-300 dark:hover:bg-amber-950/30"
                >
                  {r.country}
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
