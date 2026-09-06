import Link from "next/link";
import EditorialPage from "../_components/editorial-page";
import { createPageMetadata } from "../_lib/metadata";
import ReleaseChecklist from "./release-checklist";

export const metadata = createPageMetadata({
  title: "Release guide | NavaSound",
  description:
    "A practical guide to preparing artist details, track credits and a release brief for NavaSound’s Release Readiness beta.",
  path: "/guide",
});

const chapters = [
  { number: "01", id: "identity", title: "Start with the names." },
  { number: "02", id: "credits", title: "Put every credit in place." },
  { number: "03", id: "rights-notes", title: "Make room for the unknowns." },
  { number: "04", id: "review", title: "Read it once. Keep a copy." },
];

export default function ReleaseGuidePage() {
  return (
    <EditorialPage
      eyebrow="The release guide"
      title="Good preparation. Fewer loose ends."
      description="A short guide to the details behind your music. Work through it at your own pace, then bring everything together in your release brief."
    >
      <nav className="guide-index" aria-label="Guide chapters">
        {chapters.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`}>
            <span aria-hidden="true">{chapter.number}</span>
            {chapter.title}
          </a>
        ))}
      </nav>

      <div className="guide-chapters">
        <section className="guide-chapter" id="identity" aria-labelledby="identity-heading">
          <span className="guide-chapter-number" aria-hidden="true">01</span>
          <div className="guide-chapter-copy">
            <h2 id="identity-heading">Start with the names.</h2>
            <p>
              Decide exactly how your artist name, release title and track titles
              should appear. Check spelling, punctuation and capitalisation
              together so the brief reads consistently.
            </p>
            <ul>
              <li>Choose the release format: single, EP or album.</li>
              <li>Add an existing artist profile link if you have one.</li>
              <li>Include a target date if useful. It is a planning note, not a booking.</li>
            </ul>
            <Link className="text-link" href="/release#release-identity">
              Add your release details <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="guide-chapter" id="credits" aria-labelledby="credits-heading">
          <span className="guide-chapter-number" aria-hidden="true">02</span>
          <div className="guide-chapter-copy">
            <h2 id="credits-heading">Put every credit in place.</h2>
            <p>
              Work through the track list in release order. Confirm names with
              your collaborators instead of filling gaps from memory.
            </p>
            <ul>
              <li>List the artists and songwriters for each track.</li>
              <li>Check version names and explicit or clean-version labels.</li>
              <li>Add an existing ISRC for a track or UPC for a release only if you have it; don’t guess.</li>
            </ul>
            <p className="guide-note">
              The workspace gathers these details. It does not issue identifiers
              or deliver music to stores.
            </p>
          </div>
        </section>

        <section className="guide-chapter" id="rights-notes" aria-labelledby="rights-notes-heading">
          <span className="guide-chapter-number" aria-hidden="true">03</span>
          <div className="guide-chapter-copy">
            <h2 id="rights-notes-heading">Make room for the unknowns.</h2>
            <p>
              Use the notes field for permissions, credits or other details that
              still need checking. Name the open question and who you need to
              speak with before treating it as settled.
            </p>
            <p>
              Review the declarations carefully. Preparing a brief does not
              clear rights, transfer ownership or create a distribution agreement.
            </p>
            <Link className="text-link" href="/legal/beta">
              Read the beta submission terms <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="guide-chapter" id="review" aria-labelledby="review-heading">
          <span className="guide-chapter-number" aria-hidden="true">04</span>
          <div className="guide-chapter-copy">
            <h2 id="review-heading">Read it once. Keep a copy.</h2>
            <p>
              Preview the brief and check it against your own release notes.
              Download or copy the text before closing the workspace: your
              answers are not saved automatically.
            </p>
            <p>
              Still working on the details? Use Save editable draft in the workspace,
              then Open saved draft when you return. The file is read locally and
              keeps your track order and credits. Review the declarations again
              before exporting the finished brief.
            </p>
            <p>
              To request human review, manually email your details to NavaSound.
              Opening an email link does not send the brief. Add the text yourself
              and leave out masters, artwork and payment details.
            </p>
            <p className="guide-note">
              The Release Readiness beta is preparation only. Review depends on
              capacity; submitting details does not reserve a release date.
            </p>
          </div>
        </section>
      </div>

      <ReleaseChecklist />

      <div className="guide-checklist-actions">
        <Link className="button button-primary" href="/release">Open the workspace</Link>
        <Link className="text-link" href="/apply">
          New to NavaSound? Apply for the beta <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </EditorialPage>
  );
}
