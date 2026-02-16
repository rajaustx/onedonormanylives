"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PledgeCounterProps {
  count: number;
  align?: "left" | "center" | "right";
}

export function PledgeCounter({ count, align = "right" }: PledgeCounterProps) {
  const [displayCount, setDisplayCount] = useState(count);
  const [hasAnimated, setHasAnimated] = useState(count <= 10);

  useEffect(() => {
    if (count === 0 || hasAnimated) return;
    setHasAnimated(true);

    if (count <= 10) {
      setDisplayCount(count);
      return;
    }

    setDisplayCount(0);
    const duration = 800;
    const steps = 20;
    const stepDuration = duration / steps;
    const increment = count / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= count) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [count, hasAnimated]);

  const alignClass =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

  if (count === 0) {
    return (
      <div className={alignClass}>
        <p className="font-serif text-5xl font-light tabular-nums text-amber-700 dark:text-amber-400 sm:text-6xl md:text-7xl">
          0
        </p>
        <p className="mt-2 text-stone-600 dark:text-stone-400">who&apos;ve pledged</p>
      </div>
    );
  }

  return (
    <div className={alignClass}>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-serif text-5xl font-light tabular-nums text-amber-700 dark:text-amber-400 sm:text-6xl md:text-7xl"
      >
        {displayCount}
      </motion.span>
      <p className="mt-2 text-stone-600 dark:text-stone-400">who&apos;ve pledged</p>
    </div>
  );
}
