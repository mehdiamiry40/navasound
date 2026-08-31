import Link from "next/link";
import InnerHeader from "../_components/inner-header";
import { createPageMetadata } from "../_lib/metadata";
import ApplicationForm from "./application-form";

export const metadata = createPageMetadata({
  title: "Apply for the Release Readiness beta | NavaSound",
  description:
    "Apply for NavaSound's founding Release Readiness beta for independent artists and labels preparing a release.",
  path: "/apply",
});

export default function ApplyPage() {
  return (
    <main id="main-content" className="apply-page">
      <InnerHeader />

      <section className="apply-shell">
        <div className="apply-intro">
          <p className="eyebrow"><span /> Release Readiness founding beta</p>
          <h1>Start with the<br /><em>right release.</em></h1>
          <p>
            Tell us what you are preparing. NavaSound reviews each application
            for fit and release readiness. The provider route, final terms,
            secure file delivery and payment come later if the release is suitable.
          </p>
          <div className="apply-pricing" aria-label="Target launch pricing">
            <div><small>TARGET SINGLE</small><strong>A$10</strong></div>
            <div><small>TARGET EP / ALBUM</small><strong>A$20</strong></div>
          </div>
          <p className="apply-note">
            These are target prices only, subject to the provider route, final
            agreement, applicable tax and published service terms. No payment is
            taken now.
          </p>
        </div>

        <ApplicationForm />
      </section>

      <section className="beta-clarity" aria-labelledby="beta-clarity-heading">
        <h2 id="beta-clarity-heading" className="beta-clarity-heading">
          Know the beta before you apply.
        </h2>

        <div className="beta-clarity-grid">
          <article className="beta-clarity-card">
            <h3>Who the beta is for</h3>
            <ul className="beta-clarity-list">
              <li>
                Independent artists and labels preparing an original or fully
                cleared release.
              </li>
              <li>
                Applicants who can provide accurate credits and release metadata.
              </li>
              <li>
                Artists and labels willing to avoid artificial-streaming and
                guaranteed-placement services.
              </li>
              <li>
                People ready to participate in a small, capacity-limited founding
                cohort.
              </li>
            </ul>
            <p>Submitting an application does not guarantee a place in the beta.</p>
          </article>

          <article className="beta-clarity-card">
            <h3>What happens after applying</h3>
            <ol className="beta-clarity-list">
              <li>Complete the local application form on this page.</li>
              <li>
                Choose email, copy or download, then manually send your application
                to NavaSound.
              </li>
              <li>
                NavaSound reviews fit and readiness as founding-beta capacity allows
                and replies by email.
              </li>
              <li>
                If the release is suitable, NavaSound provides the provider route
                and final terms before requesting audio, artwork or payment.
              </li>
            </ol>
            <p>
              Applying does not reserve a release date. Review timing is confirmed
              by email rather than promised in advance.
            </p>
          </article>
        </div>

        <p className="beta-clarity-note">
          Do not provide masters, artwork, identity documents or payment details at
          the application stage. Read the <Link href="/legal/beta">Beta Submission Terms</Link>{" "}
          and <Link href="/legal/privacy">Privacy Notice</Link>.
        </p>
      </section>

      <footer className="apply-footer">
        <p>Questions before applying?</p>
        <a href="mailto:hello@navasound.com">hello@navasound.com</a>
        <small>© 2026 NavaSound · Mehdi Emir ABN 62 351 619 456</small>
      </footer>
    </main>
  );
}
