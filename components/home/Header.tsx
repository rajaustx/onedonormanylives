"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/one-donors-story", label: "One Donor's Story" },
  { href: "/wall", label: "Wall of Appreciation" },
  { href: "/press", label: "Press" },
  { href: "/pledge", label: "Pledge" },
];

const drawerVariants = {
  open: { x: 0 },
  closed: { x: "100%" },
};

const backdropVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    if (reduceMotion) {
      setMobileMenuOpen(false);
      return;
    }
    setIsExiting(true);
  };

  const handleDrawerAnimationComplete = () => {
    if (isExiting) {
      setMobileMenuOpen(false);
      setIsExiting(false);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-stone-200/60 bg-white/95 backdrop-blur-md dark:border-stone-800/60 dark:bg-stone-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-serif text-lg font-medium text-stone-900 dark:text-stone-100 sm:text-xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tree-of-life-logo-nobg.png"
            alt="One Donor Many Lives"
            className="h-14 w-14 shrink-0 object-contain sm:h-20 sm:w-20"
          />
          One Donor Many Lives
        </Link>
        <nav className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 transition-colors hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.button
              type="button"
              onClick={closeMenu}
              className="absolute inset-0 bg-black/40"
              initial="closed"
              animate={isExiting ? "closed" : "open"}
              variants={backdropVariants}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 flex w-80 max-w-[85vw] flex-col bg-white shadow-xl dark:bg-stone-950"
              initial="closed"
              animate={isExiting ? "closed" : "open"}
              variants={reduceMotion ? { open: { x: 0 }, closed: { x: 0 } } : drawerVariants}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onAnimationComplete={handleDrawerAnimationComplete}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-stone-200 px-4 py-4 dark:border-stone-700">
                <span className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col overflow-y-auto px-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="border-b border-stone-200 py-4 text-lg font-semibold text-stone-900 transition-colors hover:text-amber-700 dark:border-stone-700 dark:text-stone-100 dark:hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </div>,
          document.body
        )}
    </header>
  );
}
