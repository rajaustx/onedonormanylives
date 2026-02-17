"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal } from "@/lib/animation";

const accordionItems = [
  {
    question: "Can you live comfortably with one kidney?",
    inOurWords:
      "It was very difficult to emotionally accept that a person can live a full life with one kidney. We all learn this in biology class, but putting it into practice feels different. When it affects your own family, fear overrides memory. What helped us was hearing the same reassurance from multiple doctors, repeatedly, over time.",
    evidence:
      "Research shows that most healthy kidney donors go on to live normal lives with no significant decrease in life expectancy. Studies suggest only a small increase in long-term kidney risk in a minority of donors. For the vast majority, quality of life and longevity remain comparable to non-donors.",
    citations: [
      { authors: "Muzaale AD, et al.", journal: "New England Journal of Medicine, 2014", title: "Long-Term Risk of End-Stage Renal Disease in Living Kidney Donors", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1308717" },
      { authors: "Mjoen G, et al.", journal: "Annals of Internal Medicine, 2014", title: "Long-Term Risks for Kidney Donors", url: null },
    ],
  },
  {
    question: "How risky is the surgery for the donor?",
    inOurWords:
      "Even after doctors explained the numbers, surgery still felt frightening. Statistics feel abstract when it's your loved one. Comparing the procedure to other common surgeries helped us understand that while no surgery is risk-free, this is not an experimental or reckless act. It is a highly standardized procedure done thousands of times every year.",
    evidence:
      "Modern living donor nephrectomy is considered a low-risk surgery. Reported donor mortality is less than 0.03%, and major complication rates are comparable to other routine abdominal surgeries. Outcomes vary by hospital and patient health, but the procedure is widely regarded as safe in experienced centers.",
    citations: [
      { authors: "Gill IS, et al.", journal: "Journal of Urology", title: "Laparoscopic Living Donor Nephrectomy Outcomes", url: null },
      { authors: "American College of Obstetricians and Gynecologists (ACOG)", journal: "Practice Bulletin", title: "Hysterectomy procedural risk comparisons", url: null },
    ],
  },
  {
    question: "Does transplant really improve survival compared to dialysis?",
    inOurWords:
      "We kept asking: does this actually change someone's life, or is it symbolic? The answer is stark. For many patients, a transplant is not just a quality-of-life upgrade — it is a survival advantage. Dialysis can keep a person alive, but a successful transplant gives them a future that dialysis alone often cannot.",
    evidence:
      "Registry data from transplant systems show that kidney transplant recipients have excellent long-term survival, with roughly 85–95% of recipients alive 5 years after transplant. These outcomes are significantly better than long-term dialysis survival in comparable populations.",
    citations: [
      { authors: "United Network for Organ Sharing (UNOS)", journal: "Annual Data Reports", title: null, url: "https://unos.org/data/" },
      { authors: "NHS Blood & Transplant", journal: "Kidney transplant outcome reports", title: null, url: "https://www.nhsbt.nhs.uk" },
    ],
  },
  {
    question: "Can one donation really help more than one person?",
    inOurWords:
      "This surprised us the most. A donation is not always a one-to-one exchange. In many systems, a single altruistic donor can unlock a chain of compatible matches. One act can ripple outward and save multiple lives indirectly. That idea changed how we thought about the impact of a single decision.",
    evidence:
      "Non-directed donors often initiate paired exchange chains, allowing incompatible donor-recipient pairs to swap matches. These chains can enable multiple transplants from a single altruistic donation, amplifying the impact far beyond one surgery.",
    citations: [
      { authors: "Segev DL, et al.", journal: "Transplantation Journal", title: "Kidney Paired Donation Chain Outcomes", url: null },
      { authors: "Massie AB, et al.", journal: "American Journal of Transplantation", title: "Paired Exchange System Analysis", url: null },
    ],
  },
];

function CitationBlock({ c }: { c: (typeof accordionItems)[0]["citations"][0] }) {
  const display = [c.authors, c.journal, c.title].filter(Boolean).join(". ");
  return <li className="text-sm italic text-stone-600 dark:text-stone-400">{display}</li>;
}

export function WhatWeLearnedSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-stone-200/60 bg-stone-50/50 py-24 dark:border-stone-800/60 dark:bg-stone-950/50">
      <div className="mx-auto max-w-2xl px-6">
        <ScrollReveal variants={scrollReveal} className="mb-14 text-center">
          <h2 className="font-serif text-3xl font-medium text-stone-900 dark:text-stone-100 sm:text-4xl">
            What we learned (and what surprised us)
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-stone-600 dark:text-stone-400">
            When it&apos;s personal, even science feels emotional. These are the questions we
            struggled with too.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {accordionItems.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm dark:border-stone-700/40 dark:bg-stone-900/50"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-stone-50/50 dark:hover:bg-stone-800/30"
              >
                <span className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 sm:text-xl">
                  {item.question}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-amber-600 transition-transform dark:text-amber-400 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="border-t border-stone-200/60 px-6 py-5 dark:border-stone-700/40">
                  <div className="space-y-6">
                    <p className="text-stone-600 dark:text-stone-400">{item.inOurWords}</p>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                        Evidence Summary
                      </h4>
                      <p className="text-stone-600 dark:text-stone-400">{item.evidence}</p>
                    </div>
                    <ul className="space-y-1.5">
                      {item.citations.map((c, j) => (
                        <CitationBlock key={j} c={c} />
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <ScrollReveal variants={scrollReveal} className="mt-14 text-center">
          <p className="font-serif text-xl font-medium italic text-stone-700 dark:text-stone-300">
            When it affects you personally, rationality doesn&apos;t always lead.
          </p>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Sometimes reassurance comes one honest conversation at a time.
          </p>
        </ScrollReveal>

        <ScrollReveal variants={scrollReveal} className="mt-10 text-center">
          <p className="text-xs text-stone-500 dark:text-stone-500">
            This section is for awareness only and is not medical advice. Outcomes vary. Anyone
            considering living donation should consult a qualified transplant team.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
