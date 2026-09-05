"use client";

import Link from "next/link";
import { FormEvent, MouseEvent, useEffect, useState } from "react";

const POLICY_RECORD = [
  "Privacy Notice — Version 1.0, effective 23 August 2026",
  "Beta Submission Terms — Version 1.0, effective 23 August 2026",
];

const NON_BLANK_PATTERN = ".*\\S.*";

function fieldValue(form: FormData, name: string) {
  return String(form.get(name) || "").trim();
}

function fileSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "artist";
}

function serializeApplication(formElement: HTMLFormElement) {
  const form = new FormData(formElement);
  const artistName = fieldValue(form, "artistName");
  const subject = `Founding artist application — ${artistName}`;
  const text = [
    "Hello NavaSound,",
    "",
    "I would like to apply for the founding-artist beta.",
    "",
    `Contact name: ${fieldValue(form, "contactName")}`,
    `Artist or label name: ${artistName}`,
    `Contact email: ${fieldValue(form, "email")}`,
    `Release type: ${fieldValue(form, "releaseType")}`,
    `Target release date: ${fieldValue(form, "targetDate") || "Not set"}`,
    `Music or artist link: ${fieldValue(form, "musicLink") || "Not provided"}`,
    "",
    "Release notes:",
    fieldValue(form, "notes") || "No additional notes.",
    "",
    "I confirm that I control, or will obtain, the rights needed to distribute the release.",
    "",
    "ACCEPTED POLICIES",
    ...POLICY_RECORD.map((policy) => `- ${policy}`),
    "",
    "This application is for beta consideration only. It is not a distribution agreement, delivery instruction or payment request.",
  ].join("\n");

  return {
    filename: `navasound-${fileSlug(artistName)}-application.txt`,
    subject,
    text,
  };
}

function downloadText(text: string, filename: string) {
  const file = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Try the contained legacy fallback before reporting a clipboard failure.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  const previousFocus =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  document.body.append(textarea);

  let copied = false;
  try {
    textarea.focus();
    textarea.select();
    copied = document.execCommand("copy");
  } finally {
    textarea.remove();
    previousFocus?.focus({ preventScroll: true });
  }

  if (!copied) {
    throw new Error("Clipboard access was unavailable.");
  }
}

export default function ApplicationForm() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [status, setStatus] = useState(
    "Your answers stay on this device until you choose an action.",
  );

  useEffect(() => {
    const hydrationReady = window.setTimeout(() => setIsHydrated(true), 0);
    return () => window.clearTimeout(hydrationReady);
  }, []);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isHydrated || !event.currentTarget.reportValidity()) return;

    const application = serializeApplication(event.currentTarget);
    setStatus(
      "Application prepared, not sent. If your email app responds, review the draft and choose Send; otherwise use a local fallback below.",
    );
    window.location.href = `mailto:hello@navasound.com?subject=${encodeURIComponent(application.subject)}&body=${encodeURIComponent(application.text)}`;
  }

  async function copyApplication(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!isHydrated || !form || !form.reportValidity()) return;

    const application = serializeApplication(form);
    try {
      await copyText(application.text);
      setStatus("Application copied to your clipboard. It has not been sent.");
    } catch {
      setStatus(
        "The application could not be copied. Nothing was sent; use Download application instead.",
      );
    }
  }

  function downloadApplication(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!isHydrated || !form || !form.reportValidity()) return;

    const application = serializeApplication(form);
    downloadText(application.text, application.filename);
    setStatus(`“${application.filename}” downloaded locally. It has not been sent.`);
  }

  return (
    <form className="application-form" onSubmit={prepareEmail}>
      <div className="form-heading">
        <span>FOUNDING ARTIST APPLICATION</span>
        <p>No payment or file upload is required at this stage.</p>
        <p className="local-save-note">Your answers are not saved automatically. Download a copy before closing this page.</p>
      </div>

      <noscript>
        <p className="form-noscript">
          This local tool needs JavaScript, and nothing has been sent. You may contact{" "}
          <a href="mailto:hello@navasound.com">hello@navasound.com</a>, but do not include
          audio masters or payment data.
        </p>
      </noscript>

      <div className="field-grid">
        <label>
          <span>Contact name</span>
          <input name="contactName" autoComplete="name" maxLength={120} pattern={NON_BLANK_PATTERN} title="Enter at least one non-space character." required />
        </label>
        <label>
          <span>Artist or label name</span>
          <input name="artistName" maxLength={160} pattern={NON_BLANK_PATTERN} title="Enter at least one non-space character." required />
        </label>
        <label>
          <span>Contact email</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label>
          <span>Release type</span>
          <select name="releaseType" defaultValue="Single" required>
            <option>Single</option>
            <option>EP</option>
            <option>Album</option>
          </select>
        </label>
        <label>
          <span>Target release date</span>
          <input name="targetDate" type="date" />
        </label>
        <label>
          <span>Music or artist link</span>
          <input
            name="musicLink"
            type="url"
            inputMode="url"
            maxLength={2048}
            placeholder="https://"
          />
        </label>
      </div>

      <label className="notes-field">
        <span>Tell us about the release</span>
        <textarea
          name="notes"
          rows={5}
          maxLength={4000}
          placeholder="Genre, track count, collaborators and anything else we should know."
        />
      </label>

      <label className="rights-check">
        <input name="rights" type="checkbox" required />
        <span>I control, or will obtain, all rights needed to distribute this release.</span>
      </label>

      <label className="rights-check legal-check">
        <input name="legal" type="checkbox" required />
        <span>I have read and accept the Privacy Notice and Beta Submission Terms listed below.</span>
      </label>
      <p className="policy-links">
        <Link href="/legal/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Notice (opens in a new tab)
        </Link>{" "}
        ·{" "}
        <Link href="/legal/beta" target="_blank" rel="noopener noreferrer">
          Beta Submission Terms (opens in a new tab)
        </Link>
      </p>

      <div className="form-submit-row">
        <div className="form-tools">
          <button className="button button-primary" type="submit" disabled={!isHydrated}>
            Prepare application email <span aria-hidden="true">↗</span>
          </button>
          <button
            className="button form-tool-secondary"
            type="button"
            onClick={copyApplication}
            disabled={!isHydrated}
          >
            Copy application
          </button>
          <button
            className="button form-tool-secondary"
            type="button"
            onClick={downloadApplication}
            disabled={!isHydrated}
          >
            Download application
          </button>
        </div>
        <p className="local-tool-status" aria-live="polite">
          {status}
        </p>
      </div>
    </form>
  );
}
