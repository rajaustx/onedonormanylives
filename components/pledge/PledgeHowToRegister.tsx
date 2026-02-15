"use client";

const NOTTO_URL = "https://www.notto.mohfw.gov.in/";

const STEPS = [
  "Visit the NOTTO website (link below).",
  "Create an account or log in if you already have one.",
  "Fill out the donor pledge form with your details.",
  "Submit the form. You will receive a confirmation.",
  "Discuss your decision with your family so they understand your wishes.",
];

export function PledgeHowToRegister() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-600 dark:text-stone-400">
        Registration typically takes a few minutes. You will need your name, contact details, and
        identification (e.g., Aadhaar or mobile number).
      </p>
      <ol className="list-inside list-decimal space-y-2 text-sm text-stone-700 dark:text-stone-300">
        {STEPS.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      <a
        href={NOTTO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 underline-offset-2 hover:underline dark:text-amber-400"
      >
        Go to NOTTO registration
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
