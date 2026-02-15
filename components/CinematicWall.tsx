"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { AppreciationEntry } from "@/lib/appreciation";

type Pace = "crawl" | "walk" | "run";
type Phase = "entering" | "holding" | "piling" | "ready";

const HOLD_MS: Record<Pace, number> = {
  crawl: 4000,
  walk: 2500,
  run: 1500,
};

const PILE_DURATION_MS = 1200;

interface PiledCard {
  entry: AppreciationEntry;
  pileIndex: number;
}

interface CinematicWallProps {
  data: AppreciationEntry[];
}

function CardContent({ entry }: { entry: AppreciationEntry }) {
  return (
    <>
      <blockquote className="text-stone-700 dark:text-stone-300">
        <p className="text-base leading-relaxed">&ldquo;{entry.message}&rdquo;</p>
      </blockquote>
      <footer className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        {entry.initials}
        {entry.location && ` • ${entry.location}`}
      </footer>
    </>
  );
}

export function CinematicWall({ data }: CinematicWallProps) {
  const reduceMotion = useReducedMotion();
  const dataIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [phase, setPhase] = useState<Phase>("ready");
  const [activeCards, setActiveCards] = useState<AppreciationEntry[]>([]);
  const [piledCards, setPiledCards] = useState<PiledCard[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [pace, setPace] = useState<Pace>("walk");

  const getNextBatch = useCallback(() => {
    if (data.length === 0) return [];
    const batchSize = Math.random() > 0.5 ? 3 : 2;
    const batch: AppreciationEntry[] = [];
    for (let i = 0; i < batchSize; i++) {
      const idx = dataIndexRef.current % data.length;
      batch.push(data[idx]);
      dataIndexRef.current += 1;
    }
    return batch;
  }, [data]);

  const advanceCycle = useCallback(() => {
    if (isPaused) return;

    if (phase === "ready") {
      const batch = getNextBatch();
      if (batch.length === 0) return;
      setActiveCards(batch);
      setPhase("entering");
    }
  }, [phase, isPaused, getNextBatch]);

  useEffect(() => {
    if (reduceMotion) return;
    if (phase === "ready") {
      advanceCycle();
    }
  }, [phase, reduceMotion, advanceCycle]);

  useEffect(() => {
    if (reduceMotion || isPaused) return;

    if (phase === "entering") {
      timeoutRef.current = setTimeout(() => setPhase("holding"), 800);
    } else if (phase === "holding") {
      timeoutRef.current = setTimeout(() => setPhase("piling"), HOLD_MS[pace]);
    } else if (phase === "piling") {
      timeoutRef.current = setTimeout(() => {
        setPiledCards((prev) => [
          ...prev,
          ...activeCards.map((entry, i) => ({
            entry,
            pileIndex: prev.length + i,
          })),
        ]);
        setActiveCards([]);
        setPhase("ready");
      }, PILE_DURATION_MS);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phase, isPaused, pace, activeCards, reduceMotion]);

  const handleRewind = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    dataIndexRef.current = 0;
    setActiveCards([]);
    setPiledCards([]);
    setPhase("ready");
  }, []);

  if (reduceMotion) {
    return (
      <section className="overflow-auto px-6 py-12" aria-labelledby="cinematic-wall-heading">
        <h2 id="cinematic-wall-heading" className="sr-only">
          Wall of Appreciation
        </h2>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.map((entry, i) => (
              <article key={`${entry.index}-${i}`} className="rounded-xl border border-stone-200/60 bg-amber-50/90 p-5 dark:border-stone-700/40 dark:bg-stone-900/60">
                <CardContent entry={entry} />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-[calc(100vh-10rem)] overflow-hidden"
      aria-labelledby="cinematic-wall-heading"
    >
      <h2 id="cinematic-wall-heading" className="sr-only">
        Wall of Appreciation
      </h2>

      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-stone-50 to-amber-50/40 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      {/* Controls */}
      <div className="absolute right-4 top-4 z-30 flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="rounded-lg border border-stone-200/80 bg-white/90 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-stone-50 dark:border-stone-600/60 dark:bg-stone-900/90 dark:text-stone-300 dark:hover:bg-stone-800"
            aria-label={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? "Play" : "Pause"}
          </button>
          <button
            type="button"
            onClick={handleRewind}
            className="rounded-lg border border-stone-200/80 bg-white/90 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-stone-50 dark:border-stone-600/60 dark:bg-stone-900/90 dark:text-stone-300 dark:hover:bg-stone-800"
            aria-label="Rewind to start"
          >
            Rewind
          </button>
        </div>
        <div className="rounded-lg border border-stone-200/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm dark:border-stone-600/60 dark:bg-stone-900/90">
          <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400">
            Pace
          </label>
          <div className="flex gap-1">
            {(["crawl", "walk", "run"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPace(p)}
                className={`flex-1 rounded px-2 py-1.5 text-xs font-medium capitalize transition-colors ${
                  pace === p
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
                    : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
                }`}
                aria-pressed={pace === p}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active cards - center stage */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <AnimatePresence mode="popLayout">
            {activeCards.map((entry, i) => (
              <motion.article
                key={`active-${entry.index}-${i}`}
                initial={{ opacity: 0, scale: 0.5, y: 40, rotate: -5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [40, -8, 4, 0],
                  rotate: [-5, 2, -1, 0],
                  transition: {
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: i * 0.12,
                  },
                }}
                exit={{
                  opacity: 0.8,
                  scale: 0.35,
                  x: 320,
                  y: 280,
                  rotate: 15,
                  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="origin-center"
                style={{
                  width: phase === "piling" ? undefined : 280,
                }}
              >
                <motion.div
                  layout
                  className="rounded-xl border border-stone-200/60 bg-amber-50/90 p-5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] dark:border-stone-700/40 dark:bg-stone-900/60 dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.2)]"
                animate={
                  phase === "holding"
                    ? {
                        y: [0, -6, 3, 0],
                        rotate: [0, 2, -2, 0],
                        scale: [1, 1.01, 1],
                        transition: {
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 0.3,
                        },
                      }
                    : undefined
                }
                >
                  <CardContent entry={entry} />
                </motion.div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Pile - bottom-right corner */}
      <div className="absolute bottom-8 right-8 z-20 h-48 w-64 md:h-56 md:w-72">
        {piledCards.map(({ entry, pileIndex }, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const offsetX = col * 12 + row * 4;
          const offsetY = col * 6 + row * 16;
          const rot = -8 + (i % 3) * 4;
          const scale = 1 - i * 0.03;
          const z = piledCards.length - i;

          return (
            <motion.article
              key={`pile-${entry.index}-${pileIndex}`}
              initial={{ opacity: 0, scale: 0.5, x: 200, y: 180 }}
              animate={{
                opacity: 1,
                scale: Math.max(0.35, scale),
                x: offsetX,
                y: offsetY,
                rotate: rot,
                zIndex: z,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              className="absolute right-0 bottom-0 origin-bottom-right"
              style={{
                width: 200,
                transformOrigin: "bottom right",
              }}
            >
              <div
                className="rounded-lg border border-stone-200/60 bg-amber-50/95 p-3 shadow-lg dark:border-stone-700/40 dark:bg-stone-900/70"
                style={{
                  transform: `perspective(400px) rotateX(5deg) rotateY(${rot}deg)`,
                }}
              >
                <p className="line-clamp-3 text-sm leading-snug text-stone-700 dark:text-stone-300">
                  &ldquo;{entry.message}&rdquo;
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  {entry.initials}
                  {entry.location && ` • ${entry.location}`}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
