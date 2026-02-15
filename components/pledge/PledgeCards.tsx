"use client";

import { useState, useEffect, useMemo } from "react";
import type { PledgeEntry } from "@/lib/pledges";

const MAX_PREVIEW = 100;

function getDisplayName(entry: PledgeEntry) {
  const initial = entry.lastName ? entry.lastName.charAt(0).toUpperCase() + "." : "";
  return initial ? `${entry.firstName} ${initial}` : entry.firstName;
}

function getDisplayLocation(entry: PledgeEntry) {
  if (entry.country === "India" && entry.state) {
    return `${entry.city}, ${entry.state}`;
  }
  if (entry.country) {
    return `${entry.city}, ${entry.country}`;
  }
  return entry.city;
}

function truncateMessage(msg: string, max: number) {
  const t = (msg ?? "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trim() + "…";
}

function matchesSearch(entry: PledgeEntry, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const firstName = (entry.firstName ?? "").toLowerCase();
  const lastName = (entry.lastName ?? "").toLowerCase();
  const location = getDisplayLocation(entry).toLowerCase();
  const message = (entry.message ?? "").toLowerCase();
  return (
    firstName.includes(q) ||
    lastName.includes(q) ||
    location.includes(q) ||
    message.includes(q)
  );
}

interface PledgeCardsProps {
  data: PledgeEntry[];
}

export function PledgeCards({ data }: PledgeCardsProps) {
  const [modalEntry, setModalEntry] = useState<PledgeEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((e) => matchesSearch(e, searchQuery));
  }, [data, searchQuery]);

  const displayData = filteredData.slice(0, 10);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalEntry(null);
    };
    if (modalEntry) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalEntry]);

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300/60 bg-stone-50/50 px-6 py-8 dark:border-stone-600/40 dark:bg-stone-900/30">
        <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
          Who&apos;s pledged, and why (most recent 10)
        </h3>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
          You could be the first. Your name and intent will appear here after review.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
          Who&apos;s pledged, and why (most recent 10)
        </h3>
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, location, or keyword…"
            aria-label="Search pledges by name, location, or keyword"
            className="w-full rounded-lg border border-stone-200/60 bg-white py-2.5 pl-4 pr-10 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 dark:border-stone-600/60 dark:bg-stone-900/50 dark:text-stone-100 dark:placeholder-stone-500"
          />
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {displayData.length === 0 ? (
          <p className="py-6 text-center text-sm text-stone-500 dark:text-stone-400">
            No pledges match your search.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {displayData.map((entry, i) => {
              const name = getDisplayName(entry);
              const location = getDisplayLocation(entry);
              const preview = truncateMessage(entry.message, MAX_PREVIEW);
              const hasMore = (entry.message ?? "").trim().length > MAX_PREVIEW;

              return (
                <button
                  key={`${entry.id}-${entry.firstName}-${entry.date}-${i}`}
                  type="button"
                  onClick={() => setModalEntry(entry)}
                  className="group rounded-xl border border-stone-200/60 bg-white p-4 text-left shadow-sm transition hover:border-amber-300/60 hover:shadow-md dark:border-stone-700/40 dark:bg-stone-900/50 dark:hover:border-amber-700/40"
                >
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    {name}
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500 dark:text-stone-400">
                    {location}
                  </span>
                  {preview && (
                    <p className="mt-2 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">
                      {preview}
                      {hasMore && (
                        <span className="ml-1 text-amber-600 dark:text-amber-400">Read more</span>
                      )}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalEntry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pledge-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setModalEntry(null)}
        >
          <div
            className="absolute inset-0 bg-stone-900/60 dark:bg-stone-950/80"
            aria-hidden="true"
          />
          <div
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-stone-200/60 bg-white p-6 shadow-xl dark:border-stone-700/40 dark:bg-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="pledge-modal-title" className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
                  {getDisplayName(modalEntry)}
                </h2>
                <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
                  {getDisplayLocation(modalEntry)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalEntry(null)}
                className="shrink-0 rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-300"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              {(modalEntry.message ?? "").trim() ? (
                <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {modalEntry.message.trim()}
                </p>
              ) : (
                <p className="text-sm italic text-stone-500 dark:text-stone-400">
                  No message shared.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
