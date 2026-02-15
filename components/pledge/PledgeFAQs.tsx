"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is posthumous organ donation?",
    a: "Posthumous (or deceased) organ donation is when you donate your organs and tissues after your death. It is completely separate from living donation—no surgery or risk to you while you are alive. Your organs can save or improve many lives after you pass away.",
  },
  {
    q: "How is it different from living donation?",
    a: "Living donation (e.g., donating a kidney) happens while you are alive. Posthumous donation happens only after death. This pledge is about posthumous donation only—no surgery, no medical procedure during your lifetime.",
  },
  {
    q: "What organs and tissues can be donated?",
    a: "Organs include hearts, kidneys, liver, lungs, pancreas, and intestines. Tissues include corneas, skin, bone, heart valves, and tendons. One donor can save up to 8 lives and improve many more through tissue donation.",
  },
  {
    q: "Does it affect funeral arrangements?",
    a: "No. Organ and tissue donation does not prevent an open-casket funeral or delay burial or cremation. The donation process is carried out with respect and dignity, and your family can proceed with your chosen funeral arrangements.",
  },
  {
    q: "How do I register officially?",
    a: "Important links are given below. If you don't see a link relevant to you, use Contact Us. Either way, do make it a point to register your intent here and help this movement.",
  },
  {
    q: "Why share my intent here if I can register directly?",
    a: "Sharing your intent publicly helps normalize organ donation and encourages others to take the step. When others see that people like them have pledged, it can clarify doubts and motivate them to register officially. Your pledge can inspire someone else to act.",
  },
  {
    q: "Can I change my mind later?",
    a: "Yes. You can withdraw from the official registry at any time. If you pledged here, you can contact us to remove your pledge. Your decision is always yours to make.",
  },
  {
    q: "Will my family be asked for consent?",
    a: "In most countries, including India, the family is consulted before organ retrieval, even if you are registered. Discussing your wishes with your family in advance helps them honor your decision when the time comes.",
  },
];

export function PledgeFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="rounded-lg border border-stone-200/60 bg-white dark:border-stone-700/40 dark:bg-stone-900/50"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-stone-900 dark:text-stone-100"
          >
            {faq.q}
            <svg
              className={`h-5 w-5 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="border-t border-stone-200/60 px-4 py-3 text-sm text-stone-600 dark:border-stone-700/40 dark:text-stone-400">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
