"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

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

export default function ReleaseBriefForm() {
  const [tracks, setTracks] = useState<Track[]>([emptyTrack("track-1")]);
  const [downloaded, setDownloaded] = useState(false);

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
    const form = new FormData(event.currentTarget);
    const releaseTitle = String(form.get("releaseTitle") || "Untitled release").trim();
    const lines = [
      "NAVASOUND BETA RELEASE BRIEF",
      `Generated: ${new Date().toISOString()}`,
      "",
      "RELEASE",
      `Title: ${releaseTitle}`,
      `Primary artist: ${form.get("primaryArtist")}`,
      `Contact email: ${form.get("contactEmail")}`,
      `Release type: ${form.get("releaseType")}`,
      `Label name: ${form.get("labelName") || "Independent / not set"}`,
      `Primary genre: ${form.get("genre")}`,
      `Metadata language: ${form.get("language")}`,
      `Target release date: ${form.get("targetDate") || "Not set"}`,
      `Existing UPC/EAN: ${form.get("upc") || "None"}`,
      `Existing artist link: ${form.get("artistLink") || "Not provided"}`,
      "",
      "TRACKS",
      ...tracks.flatMap((track, index) => [
        "",
        `${index + 1}. ${track.title || "Untitled track"}${track.version ? ` (${track.version})` : ""}`,
        `   Artists: ${track.artists || "Not set"}`,
        `   Songwriters/composers: ${track.songwriters || "Not set"}`,
        `   Explicit: ${track.explicit}`,
        `   Existing ISRC: ${track.isrc || "None"}`,
      ]),
      "",
      "NOTES",
      String(form.get("notes") || "No additional notes."),
      "",
      "DECLARATIONS",
      "- Metadata is accurate to the best of the submitter's knowledge.",
      "- Required recording, composition, artwork, name and likeness rights are controlled or will be cleared.",
      "- No artificial streaming or guaranteed-stream promotion will be used.",
      "",
      "This brief is preparation only. It is not a distribution agreement, delivery instruction or payment request.",
    ];

    const file = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    const slug = releaseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "release";
    anchor.href = url;
    anchor.download = `navasound-${slug}-brief.txt`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    setDownloaded(true);
  }

  return (
    <form className="release-form" onSubmit={downloadBrief}>
      <section className="release-form-section">
        <div className="release-section-heading"><span>01</span><h2>Release identity</h2></div>
        <div className="field-grid">
          <label><span>Release title</span><input name="releaseTitle" required /></label>
          <label><span>Primary artist</span><input name="primaryArtist" required /></label>
          <label><span>Contact email</span><input name="contactEmail" type="email" autoComplete="email" required /></label>
          <label>
            <span>Release type</span>
            <select name="releaseType" defaultValue="Single">
              <option>Single</option><option>EP</option><option>Album</option>
            </select>
          </label>
          <label><span>Label name</span><input name="labelName" placeholder="Independent" /></label>
          <label><span>Primary genre</span><input name="genre" required /></label>
          <label><span>Metadata language</span><input name="language" defaultValue="English" required /></label>
          <label><span>Target release date</span><input name="targetDate" type="date" /></label>
          <label><span>Existing UPC / EAN</span><input name="upc" inputMode="numeric" /></label>
          <label><span>Artist profile or music link</span><input name="artistLink" type="url" placeholder="https://" /></label>
        </div>
      </section>

      <section className="release-form-section">
        <div className="release-section-heading"><span>02</span><h2>Track metadata</h2></div>
        <div className="track-list">
          {tracks.map((track, index) => (
            <fieldset className="track-card" key={track.id}>
              <legend>Track {index + 1}</legend>
              <div className="field-grid">
                <label><span>Track title</span><input value={track.title} onChange={(event) => updateTrack(track.id, "title", event.target.value)} required /></label>
                <label><span>Version / mix</span><input value={track.version} onChange={(event) => updateTrack(track.id, "version", event.target.value)} placeholder="Original" /></label>
                <label><span>Primary and featured artists</span><input value={track.artists} onChange={(event) => updateTrack(track.id, "artists", event.target.value)} required /></label>
                <label><span>Songwriters / composers</span><input value={track.songwriters} onChange={(event) => updateTrack(track.id, "songwriters", event.target.value)} required /></label>
                <label>
                  <span>Explicit content</span>
                  <select value={track.explicit} onChange={(event) => updateTrack(track.id, "explicit", event.target.value as Track["explicit"])}>
                    <option>No</option><option>Yes</option><option>Clean version</option>
                  </select>
                </label>
                <label><span>Existing ISRC</span><input value={track.isrc} onChange={(event) => updateTrack(track.id, "isrc", event.target.value)} placeholder="Leave blank if none" /></label>
              </div>
              <button className="remove-track" type="button" onClick={() => removeTrack(track.id)} disabled={tracks.length === 1}>
                Remove track
              </button>
            </fieldset>
          ))}
        </div>
        <button className="add-track" type="button" onClick={addTrack}>+ Add another track</button>
      </section>

      <section className="release-form-section">
        <div className="release-section-heading"><span>03</span><h2>Readiness and rights</h2></div>
        <label className="notes-field"><span>Release notes</span><textarea name="notes" rows={5} placeholder="Collaborators, samples, covers, territories, prior releases or anything requiring review." /></label>
        <div className="release-declarations">
          <label className="rights-check"><input type="checkbox" required /><span>The metadata is accurate to the best of my knowledge.</span></label>
          <label className="rights-check"><input type="checkbox" required /><span>I control, or will clear, all recording, composition, artwork, name and likeness rights.</span></label>
          <label className="rights-check"><input type="checkbox" required /><span>I will not use bots, guaranteed-stream services or paid playlist placement.</span></label>
          <label className="rights-check"><input type="checkbox" required /><span>I have read the <Link href="/legal/beta">beta submission terms</Link> and <Link href="/legal/privacy">privacy notice</Link>.</span></label>
        </div>
      </section>

      <div className="release-submit">
        <button className="button button-primary" type="submit">Download release brief <span aria-hidden="true">↓</span></button>
        <div>
          <p aria-live="polite">{downloaded ? "Brief downloaded. Check it, then email it to NavaSound." : "Nothing is uploaded. Your browser creates the brief on this device."}</p>
          <a href="mailto:hello@navasound.com?subject=NavaSound%20beta%20release%20brief">Email hello@navasound.com ↗</a>
        </div>
      </div>
    </form>
  );
}
