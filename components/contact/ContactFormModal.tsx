"use client";

import { useEffect, useRef } from "react";
import { ContactForm } from "./ContactForm";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-heading"
    >
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl border border-stone-200/60 bg-white shadow-xl dark:border-stone-700/60 dark:bg-stone-900 dark:shadow-stone-950/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-stone-200/60 px-6 py-4 dark:border-stone-700/60">
          <h2 id="contact-modal-heading" className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
            Contact Us
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">
          <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
            Share your donation story, submit an article for our blog, or get in touch.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
