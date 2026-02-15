"use client";

import { useState, useRef } from "react";

const INQUIRY_OPTIONS = [
  { value: "story", label: "Share My Donation Story" },
  { value: "article", label: "Article for Blog" },
  { value: "other", label: "Other" },
] as const;

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  files?: string;
  submit?: string;
}

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState("story");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function validate(): boolean {
    const next: FormErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      next.name = "Please enter your name.";
    } else if (trimmedName.length < 2) {
      next.name = "Name must be at least 2 characters.";
    }

    if (!trimmedEmail) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      next.email = "Please enter a valid email address.";
    }

    if (!trimmedMessage) {
      next.message = "Please share your message.";
    } else if (trimmedMessage.length < 10) {
      next.message = "Message must be at least 10 characters.";
    } else if (trimmedMessage.length > 2000) {
      next.message = "Message must be 2000 characters or less.";
    }

    const oversized = files.find((f) => f.size > MAX_FILE_BYTES);
    if (oversized) {
      next.files = `Files must be under ${MAX_FILE_SIZE_MB} MB each. "${oversized.name}" is too large.`;
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      if (next.name) nameRef.current?.focus();
      else if (next.email) emailRef.current?.focus();
      else if (next.message) messageRef.current?.focus();
      else if (next.files) document.getElementById("contact-files")?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const dateStr = new Date().toISOString().split("T")[0];
    const endpoint =
      process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT ||
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
      "https://formspree.io/f/placeholder";

    const fd = new FormData();
    fd.append("inquiry_type", inquiryType);
    fd.append("name", trimmedName);
    fd.append("email", trimmedEmail);
    fd.append("message", trimmedMessage);
    fd.append("source", "WEB");
    fd.append("date", dateStr);
    fd.append("_replyto", trimmedEmail);
    files.forEach((file) => fd.append("file", file));

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setIsSuccess(true);
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
      <div className="rounded-xl border border-stone-200/60 bg-amber-50/50 px-6 py-8 text-center dark:border-stone-700/40 dark:bg-amber-950/20">
        <p className="font-serif text-lg text-stone-800 dark:text-stone-200">
          Thank you. We&apos;ve received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div
          className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-200"
          role="alert"
        >
          {errors.submit}
        </div>
      )}

      <div>
        <label htmlFor="contact-inquiry" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
          I&apos;d like to…
        </label>
        <select
          id="contact-inquiry"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-stone-200/60 bg-white px-4 py-2.5 text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200"
          disabled={isSubmitting}
        >
          {INQUIRY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
            Name <span className="text-amber-600 dark:text-amber-400">*</span>
          </label>
          <input
            ref={nameRef}
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required
            aria-invalid={!!errors.name}
            className="mt-1.5 w-full rounded-lg border border-stone-200/60 bg-white px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder-stone-500"
            placeholder="Your name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
            Email <span className="text-amber-600 dark:text-amber-400">*</span>
          </label>
          <input
            ref={emailRef}
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required
            aria-invalid={!!errors.email}
            className="mt-1.5 w-full rounded-lg border border-stone-200/60 bg-white px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder-stone-500"
            placeholder="you@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
          Message <span className="text-amber-600 dark:text-amber-400">*</span>
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          maxLength={2000}
          aria-required
          aria-invalid={!!errors.message}
          className="mt-1.5 w-full resize-y rounded-lg border border-stone-200/60 bg-white px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder-stone-500"
          placeholder="Share your thoughts, story, or inquiry…"
          disabled={isSubmitting}
        />
        <div className="mt-1 flex justify-between">
          <span>
            {errors.message && (
              <span className="text-sm text-amber-700 dark:text-amber-400">{errors.message}</span>
            )}
          </span>
          <span className="text-sm text-stone-500 dark:text-stone-400">
            {message.trim().length}/2000
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="contact-files" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
          Attachments
        </label>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Optional. PDFs, images (JPG, PNG, GIF, WebP). Max 10 MB per file.
        </p>
        <input
          id="contact-files"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,application/pdf,image/jpeg,image/png,image/gif,image/webp"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="mt-1.5 w-full rounded-lg border border-stone-200/60 bg-white px-4 py-2.5 text-sm text-stone-600 file:mr-4 file:rounded-lg file:border-0 file:bg-amber-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-amber-800 file:hover:bg-amber-200 dark:border-stone-700/60 dark:bg-stone-900/50 dark:text-stone-400 dark:file:bg-amber-900/50 dark:file:text-amber-200 dark:file:hover:bg-amber-800/50"
          disabled={isSubmitting}
        />
        {files.length > 0 && (
          <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
            {files.length} file{files.length !== 1 ? "s" : ""} selected
          </p>
        )}
        {errors.files && (
          <p className="mt-1.5 text-sm text-amber-700 dark:text-amber-400">{errors.files}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
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
          "Send message"
        )}
      </button>
    </form>
  );
}
