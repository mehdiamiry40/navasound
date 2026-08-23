"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ApplicationForm() {
  const [prepared, setPrepared] = useState(false);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const artistName = String(form.get("artistName") || "").trim();
    const subject = `Founding artist application — ${artistName}`;
    const body = [
      "Hello NavaSound,",
      "",
      "I would like to apply for the founding-artist beta.",
      "",
      `Contact name: ${form.get("contactName")}`,
      `Artist or label name: ${artistName}`,
      `Contact email: ${form.get("email")}`,
      `Release type: ${form.get("releaseType")}`,
      `Target release date: ${form.get("targetDate") || "Not set"}`,
      `Music or artist link: ${form.get("musicLink") || "Not provided"}`,
      "",
      "Release notes:",
      String(form.get("notes") || "No additional notes."),
      "",
      "I confirm that I control, or will obtain, the rights needed to distribute the release.",
    ].join("\n");

    setPrepared(true);
    window.location.href = `mailto:hello@navasound.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="application-form" onSubmit={prepareEmail}>
      <div className="form-heading">
        <span>FOUNDING ARTIST APPLICATION</span>
        <p>No payment or file upload is required at this stage.</p>
      </div>

      <div className="field-grid">
        <label>
          <span>Contact name</span>
          <input name="contactName" autoComplete="name" required />
        </label>
        <label>
          <span>Artist or label name</span>
          <input name="artistName" required />
        </label>
        <label>
          <span>Contact email</span>
          <input name="email" type="email" autoComplete="email" required />
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
          <input name="musicLink" type="url" inputMode="url" placeholder="https://" />
        </label>
      </div>

      <label className="notes-field">
        <span>Tell us about the release</span>
        <textarea
          name="notes"
          rows={5}
          placeholder="Genre, track count, collaborators and anything else we should know."
        />
      </label>

      <label className="rights-check">
        <input name="rights" type="checkbox" required />
        <span>I control, or will obtain, all rights needed to distribute this release.</span>
      </label>

      <label className="rights-check legal-check">
        <input name="legal" type="checkbox" required />
        <span>
          I have read the <Link href="/legal/privacy">Privacy Notice</Link> and{" "}
          <Link href="/legal/beta">Beta Submission Terms</Link>.
        </span>
      </label>

      <div className="form-submit-row">
        <button className="button button-primary" type="submit">
          Prepare application email <span aria-hidden="true">↗</span>
        </button>
        <p aria-live="polite">
          {prepared
            ? "Your email app should now be open. Review the application and press send."
            : "Your answers stay on this device until you send the prepared email."}
        </p>
      </div>
    </form>
  );
}
