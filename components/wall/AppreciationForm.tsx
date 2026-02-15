"use client";

import { useState, useRef } from "react";

const RELATIONSHIP_OPTIONS = [
  { value: "Friend", label: "Friend" },
  { value: "Family", label: "Family" },
  { value: "Colleague", label: "Colleague" },
  { value: "Other", label: "Other" },
] as const;

function ThankYouGraphic() {
  return (
    <svg
      className="mx-auto h-16 w-16 text-amber-500 dark:text-amber-400"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M32 54c-1.4 0-2.7-.4-3.9-1-3.6-1.9-14-8.5-14-21.5 0-6.2 5-11.2 11.2-11.2 3.5 0 6.7 1.7 8.8 4.4 2.1-2.7 5.3-4.4 8.8-4.4 6.2 0 11.2 5 11.2 11.2 0 13-10.4 19.6-14 21.5-1.2.6-2.5 1-3.9 1z"
        fill="currentColor"
      />
    </svg>
  );
}

interface FormErrors {
  fullName?: string;
  relationship?: string;
  location?: string;
  message?: string;
  submit?: string;
}

interface AppreciationFormProps {
  variant?: "standalone" | "modal";
}

export function AppreciationForm({ variant = "standalone" }: AppreciationFormProps) {
  const [fullName, setFullName] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const relationshipRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function validate(): boolean {
    const next: FormErrors = {};
    const trimmedName = fullName.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      next.fullName = "Please enter your name.";
    } else if (trimmedName.length < 2) {
      next.fullName = "Name must be at least 2 characters.";
    }

    if (location.length > 60) {
      next.location = "Location must be 60 characters or less.";
    }

    if (!trimmedMessage) {
      next.message = "Please share your message.";
    } else if (trimmedMessage.length < 10) {
      next.message = "Message must be at least 10 characters.";
    } else if (trimmedMessage.length > 1000) {
      next.message = "Message must be 1000 characters or less.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      if (next.message) messageRef.current?.focus();
      else if (next.fullName) fullNameRef.current?.focus();
      else if (next.location) document.getElementById("location")?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = fullName.trim();
    const trimmedMessage = message.trim();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const dateStr = new Date().toISOString().split("T")[0];
    const trimmedLocation = location.trim();

    // Parse full_name into first, middle, last
    const nameParts = trimmedName.split(/\s+/).filter(Boolean);
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] ?? "" : "";
    const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";

    // Compute initials (matches lib/appreciation.ts)
    const raw = firstName.slice(0, 3) || "???";
    const first3 = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "U";
    const initials = `${first3}...${lastInitial}`;

    // CSV escape: wrap in quotes if contains comma, newline, or quote; double internal quotes
    function csvEscape(val: string): string {
      if (/[,"\n\r]/.test(val)) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    }

    // Ready-to-paste CSV row (pvt_id and id left empty for you to fill)
    const csvRow = [
      "", // pvt_id
      "", // id
      csvEscape(firstName),
      csvEscape(middleName),
      csvEscape(lastName),
      csvEscape(initials),
      csvEscape(trimmedMessage),
      csvEscape(relationship),
      csvEscape(trimmedLocation),
      csvEscape(dateStr),
      "FALSE", // is_featured
      "WEB",
      "pending",
    ].join(",");

    const formData = {
      full_name: trimmedName,
      relationship,
      location: trimmedLocation,
      message: trimmedMessage,
      source: "WEB",
      status: "pending",
      date: dateStr,
      csv_row: csvRow,
      _replyto: "info@onedonormanylives.com",
    };

    const WALL_ENDPOINT =
      process.env.NEXT_PUBLIC_FORMSPREE_WALL_ENDPOINT || "https://formspree.io/f/mykdwvnv";

    try {
      const res = await fetch(WALL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrors({
          submit: "Something went wrong. Please try again, or email us at info@onedonormanylives.com.",
        });
      }
    } catch {
      setErrors({
        submit: "Something went wrong. Please try again, or email us at info@onedonormanylives.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-stone-200/60 bg-amber-50/50 px-6 py-10 text-center dark:border-stone-700/40 dark:bg-amber-950/20 sm:px-8 sm:py-12">
        <ThankYouGraphic />
        <p className="mt-4 font-serif text-xl text-stone-800 dark:text-stone-200">
          Thank you. Your message has been received.
        </p>
        <p className="mt-2 text-stone-600 dark:text-stone-400">
          Your message will be reviewed before being published.
        </p>
      </div>
    );
  }

  const content = (
    <>
      {variant === "standalone" && (
        <h2 id="form-heading" className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100 sm:text-3xl">
          Leave a thought on the Wall of Appreciation
        </h2>
      )}
      <p className={variant === "modal" ? "mt-2 text-stone-600 dark:text-stone-400" : "mt-3 text-stone-600 dark:text-stone-400"}>
        Thank you for helping us celebrate courage and generosity.
      </p>

        <form onSubmit={handleSubmit} className={variant === "modal" ? "mt-6 space-y-6" : "mt-10 space-y-6"}>
          {errors.submit && (
            <div
              className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-200"
              role="alert"
            >
              {errors.submit}
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              Your message <span className="text-amber-600 dark:text-amber-400">*</span>
            </label>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Share your thoughts, appreciation, or wishes.
            </p>
            <textarea
              ref={messageRef}
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              maxLength={1000}
              aria-required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : "message-count"}
              className="mt-2 w-full resize-y rounded-lg border border-stone-200/60 bg-white px-4 py-3 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder-stone-500"
              placeholder="Share your thoughts…"
              disabled={isSubmitting}
            />
            <div className="mt-1 flex justify-between">
              <span>
                {errors.message && (
                  <span id="message-error" className="text-sm text-amber-700 dark:text-amber-400">
                    {errors.message}
                  </span>
                )}
              </span>
              <span id="message-count" className="text-sm text-stone-500 dark:text-stone-400">
                {message.trim().length}/1000
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              Full name <span className="text-amber-600 dark:text-amber-400">*</span>
            </label>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              We will display only shortened initials publicly to protect your privacy.
            </p>
            <input
              ref={fullNameRef}
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-required
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className="mt-2 w-full rounded-lg border border-stone-200/60 bg-white px-4 py-3 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder-stone-500"
              placeholder="Your full name"
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p id="fullName-error" className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              City / Country
            </label>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Optional. Helps show how far messages are traveling.
            </p>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={60}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? "location-error" : undefined}
              className="mt-2 w-full rounded-lg border border-stone-200/60 bg-white px-4 py-3 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder-stone-500"
              placeholder="e.g. Bangalore, India"
              disabled={isSubmitting}
            />
            {errors.location && (
              <p id="location-error" className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                {errors.location}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
              How do you know her?
            </label>
            <select
              ref={relationshipRef}
              id="relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              aria-invalid={!!errors.relationship}
              aria-describedby={errors.relationship ? "relationship-error" : undefined}
              className="mt-2 w-full rounded-lg border border-stone-200/60 bg-white px-4 py-3 text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200"
              disabled={isSubmitting}
            >
              {RELATIONSHIP_OPTIONS.map((opt) => (
                <option key={opt.value || "empty"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.relationship && (
              <p id="relationship-error" className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                {errors.relationship}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-amber-600 px-8 py-4 font-medium text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
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
                Sending…
              </span>
            ) : (
              "Submit message"
            )}
          </button>
        </form>
    </>
  );

  if (variant === "modal") {
    return <div>{content}</div>;
  }

  return (
    <section
      className="border-t border-stone-200/60 bg-stone-50/50 px-6 py-16 dark:border-stone-800/60 dark:bg-stone-900/30"
      aria-labelledby="form-heading"
    >
      <div className="mx-auto max-w-xl">{content}</div>
    </section>
  );
}
