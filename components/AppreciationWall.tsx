"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { AppreciationEntry } from "@/lib/appreciation";
import { parseDateToTimestamp } from "@/lib/parse-date";

const CARD_COLORS = [
  "bg-amber-50/90 dark:bg-amber-950/30",
  "bg-amber-100/80 dark:bg-amber-900/25",
  "bg-stone-50 dark:bg-stone-900/50",
  "bg-stone-100/90 dark:bg-stone-800/40",
  "bg-amber-50/70 dark:bg-stone-900/60",
] as const;

type SortOption = "original" | "newest" | "oldest" | "featured" | "location";

interface AppreciationWallProps {
  data: AppreciationEntry[];
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function AppreciationWall({ data }: AppreciationWallProps) {
  const wallRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("original");

  const debouncedSearch = useDebounce(searchInput, 250);

  const filteredAndSortedData = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    let result = data;

    if (q) {
      result = data.filter(
        (entry) =>
          entry.message.toLowerCase().includes(q) ||
          entry.initials.toLowerCase().includes(q) ||
          entry.location.toLowerCase().includes(q) ||
          entry.relationship.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => {
          const timeA = parseDateToTimestamp(a.date);
          const timeB = parseDateToTimestamp(b.date);
          const hasDateA = timeA > 0;
          const hasDateB = timeB > 0;
          if (hasDateA && hasDateB) {
            const diff = timeB - timeA;
            return diff !== 0 ? diff : b.index - a.index;
          }
          if (!hasDateA && hasDateB) return -1;
          if (hasDateA && !hasDateB) return 1;
          return b.index - a.index;
        });
        break;
      case "oldest":
        sorted.sort((a, b) => {
          const timeA = parseDateToTimestamp(a.date);
          const timeB = parseDateToTimestamp(b.date);
          const hasDateA = timeA > 0;
          const hasDateB = timeB > 0;
          if (hasDateA && hasDateB) {
            const diff = timeA - timeB;
            return diff !== 0 ? diff : a.index - b.index;
          }
          if (!hasDateA && hasDateB) return 1;
          if (hasDateA && !hasDateB) return -1;
          return a.index - b.index;
        });
        break;
      case "featured":
        sorted.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
        break;
      case "location":
        sorted.sort((a, b) => a.location.localeCompare(b.location));
        break;
      default:
        sorted.sort((a, b) => a.index - b.index);
    }

    return sorted;
  }, [data, debouncedSearch, sortBy]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(1, scrollTop / docHeight));
      setShowBackToTop(scrollTop > 150);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, [filteredAndSortedData.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cardVariants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          },
        }),
      };

  return (
    <>
      <section
        ref={wallRef}
        className="relative px-6 py-12 pb-24"
        aria-labelledby="appreciation-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="appreciation-heading" className="sr-only">
            Wall of Appreciation
          </h2>

          {/* Search and Sort toolbar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <label htmlFor="wall-search" className="sr-only">
                Search messages
              </label>
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                id="wall-search"
                type="search"
                placeholder="Search messages, location..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-lg border border-stone-200/60 bg-white py-2.5 pl-10 pr-4 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder-stone-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="wall-sort" className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Sort by
              </label>
              <select
                id="wall-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-lg border border-stone-200/60 bg-white px-3 py-2.5 text-sm text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200"
              >
                <option value="original">Original order</option>
                <option value="featured">Featured first</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="location">Location A–Z</option>
              </select>
            </div>
          </div>

          {debouncedSearch && (
            <p className="mb-6 text-sm text-stone-500 dark:text-stone-400">
              Showing {filteredAndSortedData.length} of {data.length} messages
            </p>
          )}

          {filteredAndSortedData.length === 0 ? (
            <p className="py-16 text-center text-stone-500 dark:text-stone-400">
              No messages match your search. Try a different term.
            </p>
          ) : (
          <>
          {(() => {
            const total = filteredAndSortedData.length;
            const p1 = Math.max(1, Math.floor(total * 0.25));
            const p2 = Math.max(p1 + 1, Math.floor(total * 0.5));
            const p3 = Math.max(p2 + 1, Math.floor(total * 0.75));
            const batch1 = filteredAndSortedData.slice(0, p1);
            const batch2 = filteredAndSortedData.slice(p1, p2);
            const batch3 = filteredAndSortedData.slice(p2, p3);
            const batch4 = filteredAndSortedData.slice(p3);

            const videos = [
              {
                id: "tc4wqtM2jUs",
                title: "Dr. H. Sudarshan Ballal",
                subtitle: "Chairman, Medical Advisory Board, Manipal Hospitals — Nephrologist with 39+ years experience",
              },
              { id: "qC_jb3komEw", title: "A Corridor of Honor", subtitle: "Hospital tribute after anonymous kidney donation" },
              {
                id: "4inrBkkqmtI",
                title: "Dr. Rohan Augustine",
                subtitle: "Consultant Nephrologist, Manipal Hospital, Bangalore",
              },
            ];

            const renderCards = (batch: typeof filteredAndSortedData, offset: number) =>
              batch.map((entry, index) => (
                <motion.article
                  key={`${entry.index}-${offset + index}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={cardVariants}
                  custom={(offset + index) % 12}
                  className="group mb-6 break-inside-avoid"
                >
                  <motion.div
                    className={`rounded-xl border border-stone-200/60 p-6 transition-shadow focus-within:ring-2 focus-within:ring-amber-500/30 focus-within:ring-offset-2 ${CARD_COLORS[(offset + index) % CARD_COLORS.length]}`}
                    style={{
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.08), 0 12px 24px rgba(0,0,0,0.06), 3px 6px 0 rgba(0,0,0,0.04)",
                    }}
                    tabIndex={0}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -6,
                            scale: 1.02,
                            rotateY: 2,
                            rotateX: 1,
                            boxShadow:
                              "0 4px 8px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.08), 5px 10px 0 rgba(0,0,0,0.06)",
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            },
                          }
                    }
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            y: [0, -1.5, 0],
                            rotateY: [-0.5, 0.5, -0.5],
                            transition: {
                              duration: 4,
                              repeat: Infinity,
                              repeatDelay: 4 + ((offset + index) % 7),
                            },
                          }
                    }
                  >
                    <blockquote className="text-stone-700 dark:text-stone-300">
                      <p className="text-base leading-relaxed">
                        &ldquo;{entry.message}&rdquo;
                      </p>
                    </blockquote>
                    <footer className="mt-4 text-sm text-stone-500 dark:text-stone-400">
                      {entry.initials}
                      {entry.location && ` • ${entry.location}`}
                    </footer>
                  </motion.div>
                </motion.article>
              ));

            const scrollToVideo = (videoId: string) => {
              document.getElementById(`video-${videoId}`)?.scrollIntoView({ behavior: "smooth" });
            };

            const renderVideo = (video: (typeof videos)[0]) => (
              <motion.section
                key={video.id}
                id={`video-${video.id}`}
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={reduceMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="-mx-6 my-16 bg-stone-200/90 py-16 dark:bg-stone-900/80 md:my-20 md:py-20"
              >
                <div className="mx-auto max-w-4xl px-6 text-center">
                  {video.title && (
                    <h3 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100 sm:text-3xl md:text-4xl">
                      {video.title}
                    </h3>
                  )}
                  {video.subtitle && (
                    <p className="mt-3 text-base text-stone-600 dark:text-stone-400 sm:text-lg">
                      {video.subtitle}
                    </p>
                  )}
                  <div className={`mx-auto max-w-3xl ${video.title || video.subtitle ? "mt-10" : "mt-0"}`}>
                    <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                        title={video.title || "Video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  {video.id === "qC_jb3komEw" && (
                    <p className="mt-8 text-center text-sm italic leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
                      One act. Hundreds of voices.
                      <br />
                      This wall exists because of moments like this.
                    </p>
                  )}
                </div>
              </motion.section>
            );

            return (
              <>
                {/* Video testimonials - thumbnails at top for easy access */}
                <section
                  className="mb-12 rounded-2xl border border-stone-200/60 bg-stone-50/80 p-6 dark:border-stone-700/40 dark:bg-stone-900/50"
                  aria-labelledby="video-testimonials-heading"
                >
                  <h3
                    id="video-testimonials-heading"
                    className="mb-4 font-serif text-lg font-medium text-stone-800 dark:text-stone-200 sm:text-xl"
                  >
                    Video testimonials
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    {videos.map((video) => (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => scrollToVideo(video.id)}
                        className="group flex flex-col items-center gap-2 text-left transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-xl overflow-hidden"
                      >
                        <div className="relative aspect-video w-full min-w-[200px] max-w-[280px] overflow-hidden rounded-lg shadow-lg ring-1 ring-stone-200/60 dark:ring-stone-700/50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                            alt=""
                            className="h-full w-full object-cover transition-opacity group-hover:opacity-90"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                              <svg
                                className="ml-1 h-6 w-6 text-amber-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                          {video.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <div
                  className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:balance]"
                  style={{ perspective: "1200px" }}
                >
                  {renderCards(batch1, 0)}
                </div>
                {renderVideo(videos[0])}
                <div
                  className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:balance]"
                  style={{ perspective: "1200px" }}
                >
                  {renderCards(batch2, p1)}
                </div>
                {renderVideo(videos[1])}
                <div
                  className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:balance]"
                  style={{ perspective: "1200px" }}
                >
                  {renderCards(batch3, p2)}
                </div>
                {renderVideo(videos[2])}
                <div
                  className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:balance]"
                  style={{ perspective: "1200px" }}
                >
                  {renderCards(batch4, p3)}
                </div>
              </>
            );
          })()}
          </>
          )}
        </div>
      </section>

      {/* Desktop: vertical progress bar on right */}
      <div
        className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
        aria-hidden
      >
        <div className="flex h-48 flex-col items-center gap-1">
          <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400">
            to go
          </span>
          <div className="relative h-full w-1.5 overflow-hidden rounded-full bg-stone-200/80 dark:bg-stone-700/50">
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-full bg-amber-500/80 dark:bg-amber-500/70"
              style={{ height: `${(1 - scrollProgress) * 100}%` }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400">
            {Math.round((1 - scrollProgress) * 100)}%
          </span>
        </div>
      </div>
      {/* Mobile: horizontal progress bar at bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-stone-200/60 bg-white/95 px-4 py-3 backdrop-blur-sm dark:border-stone-800/60 dark:bg-stone-950/95 lg:hidden"
        aria-hidden
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            {Math.round((1 - scrollProgress) * 100)}% to go
          </span>
          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-stone-200/80 dark:bg-stone-700/50">
            <motion.div
              className="absolute left-0 top-0 bottom-0 rounded-full bg-amber-500/80 dark:bg-amber-500/70"
              style={{ width: `${(1 - scrollProgress) * 100}%` }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      </div>

      {/* Back to top button - bottom-right on desktop, bottom-left on mobile (above progress bar) */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-24 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white shadow-xl ring-2 ring-white/20 transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:ring-stone-900/30 lg:bottom-8 lg:left-auto lg:right-6"
        >
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
}
