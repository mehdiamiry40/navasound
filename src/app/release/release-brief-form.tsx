"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import {
  createReleaseDraft,
  MAX_RELEASE_DRAFT_BYTES,
  MAX_RELEASE_DRAFT_TRACKS,
  parseReleaseDraft,
  RELEASE_FIELD_NAMES,
  releaseDraftFilename,
  serializeReleaseDraft,
  type ReleaseDraft,
  type ReleaseIdentity,
  type ReleaseType,
  type TrackMetadata,
} from "./release-draft";

type Track = TrackMetadata & { id: string };

type RemovedTrack = { track: Track; index: number };

const NON_BLANK_PATTERN = ".*\\S.*";

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
    fieldValue(form, "metadataAccurate") === "on"
      ? "- Metadata is accurate to the best of the submitter's knowledge."
      : "- Metadata accuracy has not been confirmed.",
    fieldValue(form, "rightsCleared") === "on"
      ? "- Required recording, composition, artwork, name and likeness rights are controlled or will be cleared."
      : "- Required rights have not been confirmed.",
    fieldValue(form, "noArtificialStreams") === "on"
      ? "- No artificial streaming or guaranteed-stream promotion will be used."
      : "- The streaming and promotion declaration has not been confirmed.",
    "",
    "ACCEPTED POLICIES",
    ...(fieldValue(form, "policiesAccepted") === "on"
      ? POLICY_RECORD.map((policy) => `- ${policy}`)
      : ["No policies accepted."]),
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

function downloadText(text: string, filename: string, contentType = "text/plain;charset=utf-8") {
  const file = new Blob([text], { type: contentType });
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

export default function ReleaseBriefForm({ initialReleaseType = "Single" }: { initialReleaseType?: ReleaseType }) {
  const [tracks, setTracks] = useState<Track[]>([emptyTrack("track-1")]);
  const [removedTracks, setRemovedTracks] = useState<RemovedTrack[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [draftStatus, setDraftStatus] = useState("");
  const [draftBackupStatus, setDraftBackupStatus] = useState("");
  const [isReadingDraft, setIsReadingDraft] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<{ draft: ReleaseDraft; filename: string } | null>(null);
  const [status, setStatus] = useState(
    "Nothing is uploaded. The brief is created locally on this device.",
  );
  const [briefPreview, setBriefPreview] = useState<ReturnType<typeof serializeReleaseBrief> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const draftFileInput = useRef<HTMLInputElement>(null);
  const draftDialog = useRef<HTMLDialogElement>(null);
  const cancelDraftButton = useRef<HTMLButtonElement>(null);
  const importCompleted = useRef(false);
  const importSequence = useRef(0);
  const reviewDialog = useRef<HTMLDialogElement>(null);
  const reviewButton = useRef<HTMLButtonElement>(null);
  const closeReviewButton = useRef<HTMLButtonElement>(null);
  const trackTitleInputs = useRef(new Map<string, HTMLInputElement>());
  const trackMoveButtons = useRef(new Map<string, HTMLButtonElement>());
  const pendingTrackFocus = useRef<{ id: string; direction?: "up" | "down" } | null>(null);

  useEffect(() => {
    const hydrationReady = window.setTimeout(() => setIsHydrated(true), 0);
    return () => window.clearTimeout(hydrationReady);
  }, []);

  useEffect(() => {
    const pending = pendingTrackFocus.current;
    if (!pending) return;
    pendingTrackFocus.current = null;
    const moveButton = pending.direction
      ? trackMoveButtons.current.get(`${pending.id}-${pending.direction}`)
      : undefined;
    const target = moveButton && !moveButton.disabled
      ? moveButton
      : trackTitleInputs.current.get(pending.id);
    target?.focus();
  }, [tracks]);

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
    if (!isHydrated || tracks.length >= MAX_RELEASE_DRAFT_TRACKS) return;
    const id = crypto.randomUUID();
    pendingTrackFocus.current = { id };
    setTracks((current) => [...current, emptyTrack(id)]);
    setStatus(`Track ${tracks.length + 1} added. Enter its title and credits.`);
  }

  function removeTrack(id: string) {
    if (!isHydrated || tracks.length <= 1) return;
    const index = tracks.findIndex((track) => track.id === id);
    if (index < 0) return;
    const adjacent = tracks[index + 1] ?? tracks[index - 1];
    pendingTrackFocus.current = { id: adjacent.id };
    setRemovedTracks((current) => [...current, { track: tracks[index], index }]);
    setTracks((current) => current.length > 1 ? current.filter((track) => track.id !== id) : current);
    setStatus(`Track ${index + 1} removed. ${tracks.length - 1} ${tracks.length === 2 ? "track remains" : "tracks remain"}. Use Undo removal below the track list to restore its details.`);
  }

  function undoRemoval(id?: string) {
    if (!isHydrated || tracks.length >= MAX_RELEASE_DRAFT_TRACKS) return;
    const removedIndex = id ? removedTracks.findIndex(item => item.track.id === id) : removedTracks.length - 1;
    const removed = removedTracks[removedIndex];
    if (!removed) return;
    const restoredIndex = Math.min(removed.index, tracks.length);
    pendingTrackFocus.current = { id: removed.track.id };
    setTracks((current) => [
      ...current.slice(0, restoredIndex),
      removed.track,
      ...current.slice(restoredIndex),
    ]);
    setRemovedTracks((current) => current.filter((_, index) => index !== removedIndex));
    setStatus(`“${removed.track.title.trim() || `Track ${removed.index + 1}`}” restored as track ${restoredIndex + 1} of ${tracks.length + 1}, with all its details.`);
  }

  function moveTrack(id: string, direction: "up" | "down") {
    if (!isHydrated) return;
    const index = tracks.findIndex((track) => track.id === id);
    const nextIndex = index + (direction === "up" ? -1 : 1);
    if (index < 0 || nextIndex < 0 || nextIndex >= tracks.length) return;
    const reordered = [...tracks];
    [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];
    pendingTrackFocus.current = { id, direction };
    setTracks(reordered);
    setStatus(`“${tracks[index].title.trim() || `Track ${index + 1}`}” moved to track ${nextIndex + 1} of ${tracks.length}.`);
  }

  function reviewBrief(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!isHydrated || !form || !form.reportValidity()) return;
    setBriefPreview(serializeReleaseBrief(form, tracks));
    requestAnimationFrame(() => {
      reviewDialog.current?.showModal();
      closeReviewButton.current?.focus();
    });
  }

  function finishReview() {
    setBriefPreview(null);
    reviewButton.current?.focus();
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

  function saveEditableDraft() {
    const form = formRef.current;
    if (!isHydrated || !form) return;
    try {
      const values = new FormData(form);
      const release = Object.fromEntries(
        RELEASE_FIELD_NAMES.map(name => [name, String(values.get(name) ?? "")]),
      ) as ReleaseIdentity;
      const draft = createReleaseDraft(release, tracks);
      const filename = releaseDraftFilename(release.releaseTitle);
      downloadText(serializeReleaseDraft(draft), filename, "application/json;charset=utf-8");
      setDraftStatus(`“${filename}” downloaded. Reopen this file here to continue editing. Nothing was sent.`);
      if (draftDialog.current?.open) setDraftBackupStatus("A copy of your current work was downloaded.");
    } catch {
      setDraftStatus("The editable draft could not be saved. Check the field lengths and track limit, then try again. Your work is still here.");
      if (draftDialog.current?.open) setDraftBackupStatus("The current draft could not be saved. Cancel to check your details before replacing them.");
    }
  }

  async function selectSavedDraft(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!isHydrated || !file) return;
    const sequence = ++importSequence.current;
    const filename = file.name.slice(0, 120);
    setIsReadingDraft(true);
    setDraftStatus(`Reading “${filename}”…`);
    try {
      if (file.size > MAX_RELEASE_DRAFT_BYTES) {
        throw new Error("Choose a draft smaller than 1 MB.");
      }
      const draft = parseReleaseDraft(await file.text());
      if (sequence !== importSequence.current || !formRef.current) return;
      importCompleted.current = false;
      setDraftBackupStatus("");
      setPendingDraft({ draft, filename });
      setDraftStatus(`“${filename}” is ready to open. Confirm before replacing your current details.`);
      requestAnimationFrame(() => {
        draftDialog.current?.showModal();
        cancelDraftButton.current?.focus();
      });
    } catch {
      if (sequence !== importSequence.current || !formRef.current) return;
      setDraftStatus(`Could not open “${filename}”. Choose a NavaSound editable draft (.json) smaller than 1 MB. Your current work is unchanged.`);
    } finally {
      if (sequence === importSequence.current) setIsReadingDraft(false);
    }
  }

  function openDraft() {
    const form = formRef.current;
    if (!isHydrated || !pendingDraft || !form) return;
    for (const name of RELEASE_FIELD_NAMES) {
      const control = form.elements.namedItem(name);
      if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
        control.value = pendingDraft.draft.release[name];
      }
    }
    for (const name of ["metadataAccurate", "rightsCleared", "noArtificialStreams", "policiesAccepted"]) {
      const control = form.elements.namedItem(name);
      if (control instanceof HTMLInputElement) control.checked = false;
    }
    pendingTrackFocus.current = null;
    setTracks(pendingDraft.draft.tracks.map(track => ({ ...track, id: crypto.randomUUID() })));
    setRemovedTracks([]);
    setBriefPreview(null);
    setStatus("Draft reopened locally. Review the declarations again before exporting a release brief. Nothing was sent.");
    setDraftStatus(`“${pendingDraft.filename}” opened with ${pendingDraft.draft.tracks.length} ${pendingDraft.draft.tracks.length === 1 ? "track" : "tracks"}. Your declarations need a fresh review.`);
    importCompleted.current = true;
    draftDialog.current?.close();
  }

  function finishDraftImport() {
    setPendingDraft(null);
    if (importCompleted.current) {
      const title = formRef.current?.elements.namedItem("releaseTitle");
      if (title instanceof HTMLInputElement) title.focus();
    } else {
      setDraftStatus("Draft opening cancelled. Your current work is unchanged.");
      draftFileInput.current?.focus();
    }
  }

  return (
    <form ref={formRef} className="release-form" autoComplete="off" onSubmit={downloadBrief}>
      <section className="draft-tools" aria-labelledby="draft-tools-heading">
        <div><h2 id="draft-tools-heading">Pick up where you left off.</h2><p>Save an editable draft at any stage, then reopen it here to keep working.</p></div>
        <div className="draft-actions">
          <button className="button form-tool-secondary" type="button" onClick={saveEditableDraft} disabled={!isHydrated}>Save editable draft</button>
          <label className="draft-file-label"><span>Open saved draft</span><input ref={draftFileInput} type="file" accept=".json,application/json" onChange={selectSavedDraft} disabled={!isHydrated || isReadingDraft} aria-describedby="draft-local-note" /></label>
        </div>
        <p id="draft-local-note">Draft files contain your entered details and are opened only on this device. No file is uploaded. Use the text release brief below when you’re ready to share.</p>
        <p className="draft-status" role="status">{draftStatus}</p>
      </section>
      <section className="release-form-section" id="release-identity">
        <div className="release-section-heading"><span>01</span><h2>Release identity</h2></div>
        <p className="local-save-note">Your changes are not saved automatically. Save an editable draft before closing this page to continue later.</p>
        <noscript>
          <p className="form-noscript">
            This local tool needs JavaScript, and nothing has been sent. You may contact{" "}
            <a href="mailto:hello@navasound.com">hello@navasound.com</a>, but do not include
            audio masters or payment data.
          </p>
        </noscript>
        <div className="field-grid">
          <label><span>Release title</span><input name="releaseTitle" maxLength={200} pattern={NON_BLANK_PATTERN} title="Enter at least one non-space character." required /></label>
          <label><span>Primary artist</span><input name="primaryArtist" maxLength={160} pattern={NON_BLANK_PATTERN} title="Enter at least one non-space character." required /></label>
          <label><span>Contact email</span><input name="contactEmail" type="email" autoComplete="email" maxLength={254} required /></label>
          <label>
            <span>Release type</span>
            <select name="releaseType" defaultValue={initialReleaseType}>
              <option>Single</option><option>EP</option><option>Album</option>
            </select>
          </label>
          <label><span>Label name</span><input name="labelName" maxLength={160} placeholder="Independent" /></label>
          <label><span>Primary genre</span><input name="genre" maxLength={100} pattern={NON_BLANK_PATTERN} title="Enter at least one non-space character." required /></label>
          <label><span>Metadata language</span><input name="language" defaultValue="English" maxLength={100} pattern={NON_BLANK_PATTERN} title="Enter at least one non-space character." required /></label>
          <label><span>Target release date</span><input name="targetDate" type="date" /></label>
          <label><span>Existing UPC / EAN</span><input name="upc" inputMode="numeric" maxLength={14} /></label>
          <label><span>Artist profile or music link</span><input name="artistLink" type="url" maxLength={2048} placeholder="https://" /></label>
        </div>
      </section>

      <section className="release-form-section" id="track-metadata">
        <div className="release-section-heading"><span>02</span><h2>Track metadata</h2></div>
        <div className="track-list">
          {tracks.map((track, index) => (
            <fieldset className="track-card" key={track.id}>
              <legend>Track {index + 1}</legend>
              <div className="field-grid">
                <label><span>Track title</span><input ref={node => { if (node) trackTitleInputs.current.set(track.id, node); else trackTitleInputs.current.delete(track.id); }} value={track.title} onChange={(event) => updateTrack(track.id, "title", event.target.value)} maxLength={200} pattern={NON_BLANK_PATTERN} title="Enter at least one non-space character." required /></label>
                <label><span>Version / mix</span><input value={track.version} onChange={(event) => updateTrack(track.id, "version", event.target.value)} maxLength={120} placeholder="Original" /></label>
                <label><span>Primary and featured artists</span><input value={track.artists} onChange={(event) => updateTrack(track.id, "artists", event.target.value)} maxLength={500} pattern={NON_BLANK_PATTERN} title="Enter at least one non-space character." required /></label>
                <label><span>Songwriters / composers</span><input value={track.songwriters} onChange={(event) => updateTrack(track.id, "songwriters", event.target.value)} maxLength={1000} pattern={NON_BLANK_PATTERN} title="Enter at least one non-space character." required /></label>
                <label>
                  <span>Explicit content</span>
                  <select value={track.explicit} onChange={(event) => updateTrack(track.id, "explicit", event.target.value as Track["explicit"])}>
                    <option>No</option><option>Yes</option><option>Clean version</option>
                  </select>
                </label>
                <label><span>Existing ISRC</span><input value={track.isrc} onChange={(event) => updateTrack(track.id, "isrc", event.target.value)} maxLength={15} placeholder="Leave blank if none" /></label>
              </div>
              <div className="track-actions">
                <div className="track-reorder" role="group" aria-label={`Reorder track ${index + 1}`}>
                  <button ref={node => { if (node) trackMoveButtons.current.set(`${track.id}-up`, node); else trackMoveButtons.current.delete(`${track.id}-up`); }} className="move-track" type="button" onClick={() => moveTrack(track.id, "up")} disabled={!isHydrated || index === 0}>Move up <span aria-hidden="true">↑</span></button>
                  <button ref={node => { if (node) trackMoveButtons.current.set(`${track.id}-down`, node); else trackMoveButtons.current.delete(`${track.id}-down`); }} className="move-track" type="button" onClick={() => moveTrack(track.id, "down")} disabled={!isHydrated || index === tracks.length - 1}>Move down <span aria-hidden="true">↓</span></button>
                </div>
                <button className="remove-track" type="button" onClick={() => removeTrack(track.id)} disabled={!isHydrated || tracks.length === 1}>Remove track</button>
              </div>
            </fieldset>
          ))}
        </div>
        {removedTracks.length > 0 && (
          <div className="track-undo">
            <p>{removedTracks.length === 1 ? "Removed a track? Its details are still available." : `${removedTracks.length} removed tracks can still be restored, most recent first.`}</p>
            <button className="button form-tool-secondary" type="button" onClick={() => undoRemoval()} disabled={!isHydrated || tracks.length >= MAX_RELEASE_DRAFT_TRACKS}>Undo removal <span aria-hidden="true">↶</span></button>
            {removedTracks.length > 1 && <label className="restore-track-choice"><span>Restore a removed track</span><select value="" onChange={event => undoRemoval(event.target.value)} disabled={!isHydrated || tracks.length >= MAX_RELEASE_DRAFT_TRACKS}><option value="" disabled>Choose a track</option>{removedTracks.map(item => <option key={item.track.id} value={item.track.id}>{item.track.title || "Untitled track"}</option>)}</select></label>}
            {tracks.length >= MAX_RELEASE_DRAFT_TRACKS && <p className="track-limit-note">Remove a current track to make room, then choose which removal to restore.</p>}
          </div>
        )}
        <button className="add-track" type="button" onClick={addTrack} disabled={!isHydrated || tracks.length >= MAX_RELEASE_DRAFT_TRACKS}>+ Add another track</button>
        {tracks.length >= MAX_RELEASE_DRAFT_TRACKS && <p className="track-limit-note">The workspace supports up to {MAX_RELEASE_DRAFT_TRACKS} tracks per draft.</p>}
      </section>

      <section className="release-form-section" id="release-rights">
        <div className="release-section-heading"><span>03</span><h2>Readiness &amp; rights</h2></div>
        <label className="notes-field"><span>Release notes</span><textarea name="notes" rows={5} maxLength={4000} placeholder="Collaborators, samples, covers, territories, prior releases or anything requiring review." /></label>
        <div className="release-declarations">
          <label className="rights-check"><input name="metadataAccurate" type="checkbox" required /><span>The metadata is accurate to the best of my knowledge.</span></label>
          <label className="rights-check"><input name="rightsCleared" type="checkbox" required /><span>I control, or will clear, all recording, composition, artwork, name and likeness rights.</span></label>
          <label className="rights-check"><input name="noArtificialStreams" type="checkbox" required /><span>I will not use bots, guaranteed-stream services or paid playlist placement.</span></label>
          <label className="rights-check"><input name="policiesAccepted" type="checkbox" required /><span>I have read and accept the Beta Submission Terms and Privacy Notice listed below.</span></label>
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

      <div className="release-submit" id="export-brief">
        <div className="form-tools">
          <button ref={reviewButton} className="button form-tool-secondary" type="button" onClick={reviewBrief} disabled={!isHydrated}>Review brief</button>
          <button className="button button-primary" type="submit" disabled={!isHydrated}>Download release brief <span aria-hidden="true">↓</span></button>
          <button className="button form-tool-secondary" type="button" onClick={copyBrief} disabled={!isHydrated}>Copy brief</button>
        </div>
        <div>
          <p className="local-tool-status" aria-live="polite">{status}</p>
          <a href="mailto:hello@navasound.com?subject=NavaSound%20beta%20release%20brief">Email hello@navasound.com ↗</a>
        </div>
      </div>
      <dialog ref={draftDialog} className="draft-import-dialog" aria-labelledby="draft-import-title" aria-describedby="draft-import-description" onClose={finishDraftImport}>
        <h2 id="draft-import-title">Open this draft?</h2>
        <p id="draft-import-description">This replaces the release details and tracks currently on this page. Save your current work first if you want to keep it.</p>
        {pendingDraft && <dl className="draft-summary"><div><dt>Release</dt><dd>{pendingDraft.draft.release.releaseTitle || "Untitled release"}</dd></div><div><dt>Artist</dt><dd>{pendingDraft.draft.release.primaryArtist || "Not entered yet"}</dd></div><div><dt>Format</dt><dd>{pendingDraft.draft.release.releaseType} · {pendingDraft.draft.tracks.length} {pendingDraft.draft.tracks.length === 1 ? "track" : "tracks"}</dd></div></dl>}
        <p className="draft-import-note">Declarations and policy acceptance are not saved in draft files. You’ll review them again before exporting a brief.</p>
        <p className="draft-backup-status" role="status">{draftBackupStatus}</p>
        <div className="draft-dialog-actions"><button className="button form-tool-secondary" type="button" disabled={!isHydrated} onClick={saveEditableDraft}>Save current work first</button><button ref={cancelDraftButton} className="button form-tool-secondary" type="button" disabled={!isHydrated} onClick={() => draftDialog.current?.close()}>Cancel</button><button className="button button-primary" type="button" disabled={!isHydrated || !pendingDraft} onClick={openDraft}>Open draft</button></div>
      </dialog>
      <dialog ref={reviewDialog} className="release-review-dialog" aria-labelledby="release-review-title" aria-describedby="release-review-description" onClose={finishReview}>
        <div className="release-review-header">
          <div><p className="eyebrow">LOCAL PREVIEW</p><h2 id="release-review-title">Review your release brief.</h2></div>
          <button ref={closeReviewButton} type="button" className="button form-tool-secondary" disabled={!isHydrated} onClick={() => reviewDialog.current?.close()}>Close review <span aria-hidden="true">×</span></button>
        </div>
        <p id="release-review-description">Check the details before downloading. This preview stays on your device and has not been sent.</p>
        <pre className="release-review-content" tabIndex={0} aria-label="Complete release brief">{briefPreview?.text}</pre>
        <p className="release-review-hint">Close this preview to edit your details, download your brief or copy it.</p>
      </dialog>
    </form>
  );
}
