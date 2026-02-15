"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactFormModal } from "@/components/contact/ContactFormModal";

const footerLinks = [
  { type: "button" as const, label: "Contact Us" },
  { type: "link" as const, href: "/wall", label: "Wall of Appreciation" },
  { type: "link" as const, href: "/gallery", label: "Gallery" },
  { type: "link" as const, href: "/blog", label: "Blog" },
  { type: "link" as const, href: "/press", label: "Press" },
  { type: "link" as const, href: "/pledge", label: "Pledge (Let generosity outlive us)" },
];

const linkClass =
  "text-sm font-medium text-stone-600 transition-colors hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400";

export function Footer() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <footer className="border-t-2 border-stone-300/80 bg-stone-100/80 py-14 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] dark:border-stone-600/60 dark:bg-stone-900/70 dark:shadow-[0_-2px_12px_rgba(0,0,0,0.2)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex shrink-0 items-center justify-center lg:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/onedonor-logo-clean.png"
                alt="One Donor Many Lives"
                className="h-52 w-52 object-contain sm:h-60 sm:w-60 lg:h-72 lg:w-72"
              />
            </Link>

            <nav className="flex flex-col items-center gap-2 lg:items-end" aria-label="Footer navigation">
              {footerLinks.map((item) =>
                item.type === "button" ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                    className={linkClass}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link key={item.href} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          <p className="mt-8 text-center text-sm text-stone-500 dark:text-stone-500">
            <span className="font-medium text-stone-600 dark:text-stone-400">OneDonorManyLives.com</span>
            {" · "}
            In memory and in hope. This site honors anonymous kidney donors everywhere.
          </p>
        </div>
      </footer>

      <ContactFormModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
}
