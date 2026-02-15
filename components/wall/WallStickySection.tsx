"use client";

import { useState } from "react";
import { AppreciationFormModal } from "./AppreciationFormModal";

export function WallStickySection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="sticky top-16 z-20 border-b border-stone-200/60 bg-stone-50/95 px-6 py-6 text-center backdrop-blur-sm dark:border-stone-800/60 dark:bg-stone-950/95">
        <h1 className="font-serif text-4xl font-light text-stone-900 dark:text-stone-100 sm:text-5xl">
          Wall of Appreciation
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
          These messages came from friends, family, and strangers across the world.
          Each one is a reminder that courage multiplies.
          Compassion travels farther than we think.
        </p>
        <p className="mt-5">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-50 dark:focus:ring-offset-stone-950"
          >
            Leave a thought
          </button>
        </p>
      </section>
      <AppreciationFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
