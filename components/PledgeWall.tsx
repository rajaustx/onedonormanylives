"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { PledgeEntry } from "@/lib/pledges";

interface PledgeWallProps {
  data: PledgeEntry[];
  variant?: "full" | "sidebar";
}

function PledgeNameItem({ entry, index, reduceMotion }: { entry: PledgeEntry; index: number; reduceMotion: boolean }) {
  const lastInitial = entry.lastName ? entry.lastName.charAt(0).toUpperCase() + "." : "";
  const displayName = lastInitial ? `${entry.firstName} ${lastInitial}` : entry.firstName;

  const displayLocation =
    entry.country === "India" && entry.state
      ? `${entry.city}, ${entry.state}`
      : entry.country
        ? `${entry.city}, ${entry.country}`
        : entry.city;

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            delay: i * 0.02,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          },
        }),
      };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      custom={index}
      className="flex flex-col gap-0.5 py-1.5"
    >
      <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
        {displayName}
      </span>
      <span className="text-xs text-stone-500 dark:text-stone-400">{displayLocation}</span>
    </motion.div>
  );
}

export function PledgeWall({ data, variant = "full" }: PledgeWallProps) {
  const reduceMotion = useReducedMotion();
  const isSidebar = variant === "sidebar";

  if (data.length === 0) {
    return (
      <div className={isSidebar ? "" : "px-6 py-12"} aria-label="Pledge wall">
        <p
          className={
            isSidebar
              ? "text-sm text-stone-500 dark:text-stone-400"
              : "text-center text-stone-500 dark:text-stone-400"
          }
        >
          You could be the first. Your name will appear here after review.
        </p>
      </div>
    );
  }

  if (isSidebar) {
    const displayData = data.slice(0, 12);
    return (
      <div className="space-y-1" aria-label="Pledge wall">
        {displayData.map((entry, i) => (
          <PledgeNameItem
            key={`${entry.id}-${entry.firstName}-${entry.date}-${i}`}
            entry={entry}
            index={i}
            reduceMotion={!!reduceMotion}
          />
        ))}
        {data.length > 12 && (
          <p className="pt-2 text-xs text-stone-500 dark:text-stone-400">
            +{data.length - 12} more
          </p>
        )}
      </div>
    );
  }

  // Full layout: two columns, 25 per column max
  const mid = Math.min(25, Math.ceil(data.length / 2));
  const col1 = data.slice(0, mid);
  const col2 = data.slice(mid, 50);

  return (
    <section className="px-6 py-12" aria-label="Pledge wall">
      <div className="mx-auto max-w-4xl">
        <h2 className="sr-only">Pledges</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-0">
          <div>
            {col1.map((entry, i) => (
              <PledgeNameItem
                key={`${entry.id}-${entry.firstName}-${entry.date}-${i}`}
                entry={entry}
                index={i}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
          <div>
            {col2.map((entry, i) => (
              <PledgeNameItem
                key={`${entry.id}-${entry.firstName}-${entry.date}-${i}`}
                entry={entry}
                index={mid + i}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
