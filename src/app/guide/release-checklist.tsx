"use client";

import { useState } from "react";

const items = [
  { id: "names", label: "Artist name, release title and track titles checked." },
  { id: "credits", label: "Track order and collaborator credits reviewed." },
  { id: "labels", label: "Version names and explicit-content labels checked." },
  { id: "questions", label: "Open questions and permission notes written down." },
  { id: "copy", label: "A copy of the brief saved on my device." },
];

export default function ReleaseChecklist() {
  const [checked, setChecked] = useState<string[]>([]);

  function toggleItem(id: string) {
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <section className="guide-checklist" aria-labelledby="checklist-heading">
      <div className="guide-checklist-header">
        <div>
          <p className="section-kicker">One last check</p>
          <h2 id="checklist-heading">Ready to close the notebook?</h2>
        </div>
        <div className="guide-checklist-progress">
          <progress aria-label="Checklist progress" max={items.length} value={checked.length} />
          <p role="status">{checked.length} of {items.length} checked</p>
        </div>
      </div>

      <fieldset className="guide-checklist-items" aria-describedby="checklist-note">
        <legend>Your personal release checklist</legend>
        {items.map((item) => (
          <label key={item.id} htmlFor={`checklist-${item.id}`}>
            <input
              id={`checklist-${item.id}`}
              type="checkbox"
              autoComplete="off"
              checked={checked.includes(item.id)}
              onChange={() => toggleItem(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="guide-checklist-actions">
        <p className="guide-note" id="checklist-note">
          Progress is temporary and resets on reload. Nothing is saved or
          sent. This is a personal checklist, not approval for distribution.
        </p>
        <button
          className="text-link"
          type="button"
          disabled={checked.length === 0}
          onClick={() => setChecked([])}
        >
          Reset checklist
        </button>
      </div>
      <noscript><p className="guide-note">Interactive checklist progress requires JavaScript.</p></noscript>
    </section>
  );
}
