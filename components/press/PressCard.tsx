"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { truncateToWords } from "@/lib/press";
import type { PressEntry } from "@/lib/press";

const EXCERPT_MAX_WORDS = 100;

interface PressCardProps {
  entry: PressEntry;
  index: number;
  reduceMotion: boolean;
}

function getShareUrl(entry: PressEntry): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/press#${entry.id}`;
}

function getMailtoLink(entry: PressEntry): string {
  const url = getShareUrl(entry);
  const subject = encodeURIComponent(entry.headline);
  const body = encodeURIComponent(
    `I thought you might find this interesting:\n\n${entry.headline}\n${entry.publication}, ${entry.date}\n\n${url}`
  );
  return `mailto:?subject=${subject}&body=${body}`;
}

export function PressCard({ entry, index, reduceMotion }: PressCardProps) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState<"idle" | "copied" | "error">("idle");

  const displayExcerpt = entry.excerpt
    ? truncateToWords(entry.excerpt, EXCERPT_MAX_WORDS)
    : entry.fullText
      ? truncateToWords(entry.fullText, EXCERPT_MAX_WORDS)
      : null;

  const hasFullArticle = !!entry.fullText;

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: entry.headline,
          text: `${entry.publication}, ${entry.date}`,
          url: getShareUrl(entry),
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setShareMessage("error");
        }
      }
    } else {
      try {
        window.location.href = getMailtoLink(entry);
      } catch {
        setShareMessage("error");
      }
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(getShareUrl(entry));
      setShareMessage("copied");
      setTimeout(() => setShareMessage("idle"), 2000);
    } catch {
      setShareMessage("error");
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      <motion.article
        id={entry.id}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="scroll-mt-24 rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50 md:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row">
          {entry.image && (
            <button
              type="button"
              onClick={() => setImageModalOpen(true)}
              className="group w-full shrink-0 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800/50 sm:w-48"
            >
              <span className="block aspect-[4/3] w-full sm:aspect-square sm:h-48 sm:w-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.image}
                  alt=""
                  className="h-full w-full object-cover object-top transition-transform group-hover:scale-[1.02]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </span>
            </button>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100 sm:text-2xl">
              {entry.headline}
            </h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {entry.date} · {entry.publication}
            </p>

            {displayExcerpt && (
              <p className="mt-4 text-stone-600 dark:text-stone-400">
                {displayExcerpt}
                {hasFullArticle && (
                  <button
                    type="button"
                    onClick={() => setArticleModalOpen(true)}
                    className="ml-1 font-medium text-amber-700 hover:underline dark:text-amber-400"
                  >
                    Read more
                  </button>
                )}
              </p>
            )}

            {entry.url && (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
              >
                {entry.url.includes("youtube") || entry.url.includes("youtu.be")
                  ? "Watch video →"
                  : "Read article online →"}
              </a>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400"
                aria-label="Share via email"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400"
                aria-label="Copy link"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy link
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400"
                aria-label="Print"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print
              </button>

              {shareMessage === "error" && (
                <span className="text-sm text-amber-700 dark:text-amber-400">
                  Email client may not be available. Use Copy link above.
                </span>
              )}
              {shareMessage === "copied" && (
                <span className="text-sm text-stone-500 dark:text-stone-400">
                  Link copied
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.article>

      {/* Image modal */}
      {imageModalOpen && entry.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Article image"
          onClick={() => setImageModalOpen(false)}
        >
          <button
            type="button"
            onClick={() => setImageModalOpen(false)}
            className="absolute right-4 top-4 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-h-[90vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.image}
              alt=""
              className="max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Full article modal - complete transcript/translation */}
      {articleModalOpen && entry.fullText && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Complete article transcript"
          onClick={() => setArticleModalOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-stone-200/60 bg-white p-6 dark:border-stone-700/40 dark:bg-stone-900 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setArticleModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-300"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="text-xs font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Complete transcript
            </p>
            <h3 className="mt-1 font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
              {entry.headline}
            </h3>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {entry.publication} · {entry.date}
            </p>
            <div className="mt-6 whitespace-pre-wrap text-stone-600 dark:text-stone-400 leading-relaxed">
              {entry.fullText}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
