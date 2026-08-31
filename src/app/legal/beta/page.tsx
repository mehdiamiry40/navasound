import { createPageMetadata } from "../../_lib/metadata";
import LegalPage from "../_components/legal-page";

export const metadata = createPageMetadata({
  title: "Beta Submission Terms | NavaSound",
  description: "Terms for NavaSound founding-artist applications and release briefs.",
  path: "/legal/beta",
});

export default function BetaTermsPage() {
  return (
    <LegalPage title="Beta Submission Terms" eyebrow="Founding artists">
      <section>
        <h2>1. Expression of interest</h2>
        <p>
          A founding-artist application or release brief is an expression of interest
          only. NavaSound may accept, decline or request more information. No release
          is approved until NavaSound confirms acceptance in writing and both parties
          agree to the final distribution agreement.
        </p>
      </section>
      <section>
        <h2>2. Accurate information</h2>
        <p>
          You must provide complete and accurate identity, artist, contributor,
          ownership, metadata and release information. You must promptly correct any
          error and disclose samples, cover recordings, remixes, featured artists,
          explicit content and other third-party material.
        </p>
      </section>
      <section>
        <h2>3. Rights</h2>
        <p>
          You must control, or have written permission for, all rights needed to
          reproduce, distribute, monetize and promote the recordings, compositions,
          artwork, names and likenesses you propose to submit. Preparing a brief does
          not transfer ownership to NavaSound.
        </p>
      </section>
      <section>
        <h2>4. Prohibited conduct</h2>
        <ul>
          <li>Copyright infringement, impersonation or deceptive metadata.</li>
          <li>Unauthorized samples, artwork, names, images or performances.</li>
          <li>Bots, click farms, loop manipulation or artificial streaming.</li>
          <li>Paid services that guarantee streams or playlist placement.</li>
          <li>Material that is unlawful or rejected by the selected music services.</li>
        </ul>
      </section>
      <section>
        <h2>5. No files or payment yet</h2>
        <p>
          Do not send unreleased masters, high-resolution artwork, identity documents
          or payment details through the public website. NavaSound will provide an
          approved secure route and final terms before requesting them.
        </p>
      </section>
      <section>
        <h2>6. Provider and store review</h2>
        <p>
          A beta acceptance does not guarantee that a distribution provider or music
          service will accept, publish, retain or monetize a release. Store policies,
          fraud reviews and delivery requirements remain applicable.
        </p>
      </section>
      <section>
        <h2>7. Withdrawal</h2>
        <p>
          You may withdraw a pre-launch application by emailing hello@navasound.com.
          Once a paid service begins, cancellation and takedown rules will be set out
          in the final distribution agreement.
        </p>
      </section>
    </LegalPage>
  );
}
