"use client";

import { useState, useRef } from "react";
import { COUNTRIES } from "@/lib/countries";

const FORMSPREE_PLEDGE_ENDPOINT = "https://formspree.io/f/mlgwbpyr";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  country?: string;
  message?: string;
  consent?: string;
  submit?: string;
}

function csvEscape(val: string): string {
  if (/[,"\n\r]/.test(val)) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export function PledgeForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const isIndia = country === "India";

  function validate(): boolean {
    const next: FormErrors = {};
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedCity = city.trim();
    const trimmedState = state.trim();
    const trimmedMessage = message.trim();

    if (!trimmedFirst) {
      next.firstName = "Please enter your first name.";
    } else if (trimmedFirst.length > 40) {
      next.firstName = "First name must be 40 characters or less.";
    }

    if (trimmedLast.length > 60) {
      next.lastName = "Last name must be 60 characters or less.";
    }

    if (!trimmedCity) {
      next.city = "Please enter your city.";
    } else if (trimmedCity.length > 60) {
      next.city = "City must be 60 characters or less.";
    }

    if (!country) {
      next.country = "Please select your country.";
    }

    if (isIndia && !trimmedState) {
      next.state = "State is required when country is India.";
    }

    if (trimmedMessage.length > 300) {
      next.message = "Message must be 300 characters or less.";
    }

    if (!consent) {
      next.consent = "Please confirm you understand the pledge may be displayed publicly.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      if (next.firstName) firstNameRef.current?.focus();
      else if (next.lastName) document.getElementById("pledge-last-name")?.focus();
      else if (next.city) cityRef.current?.focus();
      else if (next.state) document.getElementById("pledge-state")?.focus();
      else if (next.consent) document.getElementById("pledge-consent")?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot: if company is filled, pretend success
    if (company.trim()) {
      setIsSuccess(true);
      return;
    }

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedCity = city.trim();
    const trimmedState = state.trim();
    const trimmedMessage = message.trim();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const dateStr = new Date().toISOString().split("T")[0];

    const csvRow = [
      "",
      "",
      csvEscape(trimmedFirst),
      csvEscape(trimmedLast),
      csvEscape(trimmedCity),
      csvEscape(trimmedState),
      csvEscape(country),
      csvEscape(trimmedMessage),
      csvEscape(dateStr),
      "FALSE",
      "form",
      "pending",
    ].join(",");

    const payload = {
      first_name: trimmedFirst,
      last_name: trimmedLast,
      city: trimmedCity,
      state: trimmedState,
      country,
      message: trimmedMessage,
      consent: true,
      page: "/pledge",
      csv_row: csvRow,
      company, // honeypot, included but we don't submit if filled
      _replyto: "info@onedonormanylives.com",
    };

    try {
      const res = await fetch(FORMSPREE_PLEDGE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setIsSuccess(true);
    } catch {
      setErrors({
        submit: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-stone-200/60 bg-amber-50/50 px-5 py-8 text-center dark:border-stone-700/40 dark:bg-amber-950/20">
        <p className="font-serif text-lg text-stone-800 dark:text-stone-200">
          Thank you. Your pledge has been received.
        </p>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          Submissions are reviewed before appearing on the wall.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-stone-200/60 bg-white px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder-stone-500";
  const labelClass = "text-xs font-medium text-stone-700 dark:text-stone-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot - hidden from users */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <label htmlFor="pledge-company">Company</label>
        <input
          id="pledge-company"
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errors.submit && (
        <div
          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-200"
          role="alert"
        >
          {errors.submit}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pledge-first-name" className={labelClass}>
            First name <span className="text-amber-600 dark:text-amber-400">*</span>
          </label>
          <input
            ref={firstNameRef}
            id="pledge-first-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            maxLength={40}
            aria-required
            aria-invalid={!!errors.firstName}
            className={`mt-1 ${inputClass}`}
            placeholder="Your first name"
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="pledge-last-name" className={labelClass}>
            Last name
          </label>
          <input
            id="pledge-last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            maxLength={60}
            aria-invalid={!!errors.lastName}
            className={`mt-1 ${inputClass}`}
            placeholder="Your last name"
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="pledge-city" className={labelClass}>
            City <span className="text-amber-600 dark:text-amber-400">*</span>
          </label>
          <input
            ref={cityRef}
            id="pledge-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={60}
            aria-required
            aria-invalid={!!errors.city}
            className={`mt-1 ${inputClass}`}
            placeholder="e.g. Bangalore"
            disabled={isSubmitting}
          />
          {errors.city && (
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{errors.city}</p>
          )}
        </div>
        <div>
          <label htmlFor="pledge-country" className={labelClass}>
            Country <span className="text-amber-600 dark:text-amber-400">*</span>
          </label>
          <select
            id="pledge-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            aria-required
            aria-invalid={!!errors.country}
            className={`mt-1 ${inputClass}`}
            disabled={isSubmitting}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{errors.country}</p>
          )}
        </div>
        <div>
          <label htmlFor="pledge-state" className={labelClass}>
            State {isIndia && <span className="text-amber-600 dark:text-amber-400">*</span>}
          </label>
          <input
            id="pledge-state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            aria-required={isIndia}
            aria-invalid={!!errors.state}
            className={`mt-1 ${inputClass}`}
            placeholder={isIndia ? "e.g. Karnataka" : "Optional"}
            disabled={isSubmitting}
          />
          {errors.state && (
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{errors.state}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="pledge-message" className={labelClass}>
          Why are you pledging? <span className="text-stone-400">(optional, 300 chars)</span>
        </label>
        <textarea
          id="pledge-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={300}
          rows={2}
          aria-invalid={!!errors.message}
          className={`mt-1 resize-none ${inputClass}`}
          placeholder="Share your reason"
          disabled={isSubmitting}
        />
        <p className="mt-0.5 text-right text-xs text-stone-400">{message.length}/300</p>
        {errors.message && (
          <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">{errors.message}</p>
        )}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="pledge-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          aria-required
          aria-invalid={!!errors.consent}
          className="mt-0.5 h-3.5 w-3.5 rounded border-stone-300 text-amber-600 focus:ring-amber-500 dark:border-stone-600 dark:bg-stone-800"
          disabled={isSubmitting}
        />
        <label htmlFor="pledge-consent" className="text-xs text-stone-700 dark:text-stone-300">
          I understand this pledge may be displayed publicly with my name shortened for privacy.{" "}
          <span className="text-amber-600 dark:text-amber-400">*</span>
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs text-amber-700 dark:text-amber-400">{errors.consent}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting…
          </span>
        ) : (
          "Submit pledge"
        )}
      </button>
    </form>
  );
}
