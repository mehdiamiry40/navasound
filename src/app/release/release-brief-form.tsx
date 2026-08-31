"use client";

import Link from "next/link";
import { FormEvent, MouseEvent, useEffect, useState } from "react";

type Track = {
  id: string;
  title: string;
  version: string;
  artists: string;
  songwriters: string;
  explicit: "No" | "Yes" | "Clean version";
  isrc: string;
};

const emptyTrack = (id: string): Track => ({
  id,
  title: "",
  version: "",
  artists: "",
  songwriters: "",
  explicit: "No",
  isrc: "",
});

const POLICY_RECORD = [
  "Privacy Notice — Version 1.0, effective 23 August 2026",
  "Beta Submission Terms — Version 1.0, effective 23 August 2026",
];

function fieldValue(form: FormData, name: string) {
  return String(form.get(name) || "").trim();
}

function serializeReleaseBrief(formElement: HTMLFormElement, tracks: Track[]) {
  const form = new FormData(formElement);
  const releaseTitle = fieldValue(form, "releaseTitle") || "Untitled release";
  const lines = [
    "NAVASOUND — BETA RELEASE BRIEF",
    `Generated: ${new Date().toISOString()}`,
    "",
    "RELEASE",
    `Title: ${releaseTitle}`,
    `Primary artist: ${fieldValue(form, "primaryArtist")}`,
    `Contact email: ${fieldValue(form, "contactEmail")}`,
    `Release type: ${fieldValue(form, "releaseType")}`,
    `Label name: ${fieldValue(form, "labelName") || "Independent / not set"}`,
    `Primary genre: ${fieldValue(form, "genre")}`,
    `Metadata language: ${fieldValue(form, "language")}`,
    `Target release date: ${fieldValue(form, "targetDate") || "Not set"}`,
    `Existing UPC/EAN: ${fieldValue(form, "upc") || "None"}`,
    `Existing artist link: ${fieldValue(form, "artistLink") || "Not provided"}`,
    "",
    "TRACKS",
    ...tracks.flatMap((track, index) => [
      "",
      `${index + 1}. ${track.title.trim() || "Untitled track"}${track.version.trim() ? ` (${track.version.trim()})` : ""}`,
      `   Artists: ${track.artists.trim() || "Not set"}`,
      `   Songwriters/composers: ${track.songwriters.trim() || "Not set"}`,
      `   Explicit: ${track.explicit}`,
      `   Existing ISRC: ${track.isrc.trim() || "None"}`,
    ]),
    "",
    "NOTES",
    fieldValue(form, "notes") || "No additional notes.",
    "",
    "DECLARATIONS",
    "- Metadata is accurate to the best of the submitter's knowledge.",
    "- Required recording, composition, artwork, name and likeness rights are controlled or will be cleared.",
    "- No artificial streaming or guaranteed-stream promotion will be used.",
    "",
    "ACCEPTED POLICIES",
    ...POLICY_RECORD.map((policy) => `- ${policy}`),
    "",
    "This brief is preparation only. It is not a distribution agreement, delivery instruction or payment request.",
  ];
  const slug =
    releaseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
    "release";

  return {
    filename: `navasound-${slug}-brief.txt`,
    text: lines.join("\n"),
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

export default function ReleaseBriefForm() {
  const [tracks, setTracks] = useState<Track[]>([emptyTrack("track-1")]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [status, setStatus] = useState(
    "Nothing is uploaded. The brief is created locally on this device.",
  );

  useEffect(() => {
    const hydrationReady = window.setTimeout(() => setIsHydrated(true), 0);
    return () => window.clearTimeout(hydrationReady);
  }, []);

  function updateTrack<Field extends keyof Omit<Track, "id">>(
    id: string,
    field: Field,
    value: Track[Field],
  ) {
    setTracks((current) =>
      current.map((track) => (track.id === id ? { ...track, [field]: value } : track)),
    );
  }

  function addTrack() {
    setTracks((current) => [...current, emptyTrack(crypto.randomUUID())]);
  }

  function removeTrack(id: string) {
    setTracks((current) => current.filter((track) => track.id !== id));
  }

  function downloadBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isHydrated || !event.currentTarget.reportValidity()) return;

    const brief = serializeReleaseBrief(event.currentTarget, tracks);
    downloadText(brief.text, brief.filename);
    setStatus(`“${brief.filename}” downloaded locally. It has not been sent.`);
  }

  async function copyBrief(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!isHydrated || !form || !form.reportValidity()) return;

    const brief = serializeReleaseBrief(form, tracks);
    try {
      await copyText(brief.text);
      setStatus(
        `Release brief copied to your clipboard. Suggested filename: “${brief.filename}”. It has not been sent.`,
      );
    } catch {
      setStatus(
        `The release brief could not be copied. Suggested filename: “${brief.filename}”. Nothing was sent; use Download brief instead.`,
      );
    }
  }

  return (
    <form className="release-form" onSubmit={downloadBrief}>
      <section className="release-form-section">
        <div className="release-section-heading"><span>01</span><h2>Release identity</h2></div>
        <noscript>
          <p className="form-noscript">
            This local tool needs JavaScript, and nothing has been sent. You may contact{" "}
            <a href="mailto:hello@navasound.com">hello@navasound.com</a>, but do not include
            audio masters or payment data.
          </p>
        </noscript>
        <div className="field-grid">
          <label><span>Release title</span><input name="releaseTitle" maxLength={200} required /></label>
          <label><span>Primary artist</span><input name="primaryArtist" maxLength={160} required /></label>
          <label><span>Contact email</span><input name="contactEmail" type="email" autoComplete="email" maxLength={254} required /></label>
          <label>
            <span>Release type</span>
            <select name="releaseType" defaultValue="Single">
              <option>Single</option><option>EP</option><option>Album</option>
            </select>
          </label>
          <label><span>Label name</span><input name="labelName" maxLength={160} placeholder="Independent" /></label>
          <label><span>Primary genre</span><input name="genre" maxLength={100} required /></label>
          <label><span>Metadata language</span><input name="language" defaultValue="English" maxLength={100} required /></label>
          <label><span>Target release date</span><input name="targetDate" type="date" /></label>
          <label><span>Existing UPC / EAN</span><input name="upc" inputMode="numeric" maxLength={14} /></label>
          <label><span>Artist profile or music link</span><input name="artistLink" type="url" maxLength={2048} placeholder="https://" /></label>
        </div>
      </section>

      <section className="release-form-section">
        <div className="release-section-heading"><span>02</span><h2>Track metadata</h2></div>
        <div className="track-list">
          {tracks.map((track, index) => (
            <fieldset className="track-card" key={track.id}>
              <legend>Track {index + 1}</legend>
              <div className="field-grid">
                <label><span>Track title</span><input value={track.title} onChange={(event) => updateTrack(track.id, "title", event.target.value)} maxLength={200} required /></label>
                <label><span>Version / mix</span><input value={track.version} onChange={(event) => updateTrack(track.id, "version", event.target.value)} maxLength={120} placeholder="Original" /></label>
                <label><span>Primary and featured artists</span><input value={track.artists} onChange={(event) => updateTrack(track.id, "artists", event.target.value)} maxLength={500} required /></label>
                <label><span>Songwriters / composers</span><input value={track.songwriters} onChange={(event) => updateTrack(track.id, "songwriters", event.target.value)} maxLength={1000} required /></label>
                <label>
                  <span>Explicit content</span>
                  <select value={track.explicit} onChange={(event) => updateTrack(track.id, "explicit", event.target.value as Track["explicit"])}>
                    <option>No</option><option>Yes</option><option>Clean version</option>
                  </select>
                </label>
                <label><span>Existing ISRC</span><input value={track.isrc} onChange={(event) => updateTrack(track.id, "isrc", event.target.value)} maxLength={15} placeholder="Leave blank if none" /></label>
              </div>
              <button className="remove-track" type="button" onClick={() => removeTrack(track.id)} disabled={!isHydrated || tracks.length === 1}>
                Remove track
              </button>
            </fieldset>
          ))}
        </div>
        <button className="add-track" type="button" onClick={addTrack} disabled={!isHydrated}>+ Add another track</button>
      </section>

      <section className="release-form-section">
        <div className="release-section-heading"><span>03</span><h2>Readiness &amp; rights</h2></div>
        <label className="notes-field"><span>Release notes</span><textarea name="notes" rows={5} maxLength={4000} placeholder="Collaborators, samples, covers, territories, prior releases or anything requiring review." /></label>
        <div className="release-declarations">
          <label className="rights-check"><input type="checkbox" required /><span>The metadata is accurate to the best of my knowledge.</span></label>
          <label className="rights-check"><input type="checkbox" required /><span>I control, or will clear, all recording, composition, artwork, name and likeness rights.</span></label>
          <label className="rights-check"><input type="checkbox" required /><span>I will not use bots, guaranteed-stream services or paid playlist placement.</span></label>
          <label className="rights-check"><input type="checkbox" required /><span>I have read and accept the Beta Submission Terms and Privacy Notice listed below.</span></label>
        </div>
        <p className="policy-links">
          <Link href="/legal/beta" target="_blank" rel="noopener noreferrer">
            Beta Submission Terms (opens in a new tab)
          </Link>{" "}
          ·{" "}
          <Link href="/legal/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Notice (opens in a new tab)
          </Link>
        </p>
      </section>

      <div className="release-submit">
        <div className="form-tools">
          <button className="button button-primary" type="submit" disabled={!isHydrated}>Download release brief <span aria-hidden="true">↓</span></button>
          <button className="button form-tool-secondary" type="button" onClick={copyBrief} disabled={!isHydrated}>Copy brief</button>
        </div>
        <div>
          <p className="local-tool-status" aria-live="polite">{status}</p>
          <a href="mailto:hello@navasound.com?subject=NavaSound%20beta%20release%20brief">Email hello@navasound.com ↗</a>
        </div>
      </div>
    </form>
  );
}
