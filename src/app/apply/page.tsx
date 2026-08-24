import type { Metadata } from "next";
import InnerHeader from "../_components/inner-header";
import ApplicationForm from "./application-form";

export const metadata: Metadata = {
  title: "Apply to the founding artist beta | NavaSound",
  description:
    "Apply to NavaSound's founding artist music distribution beta in Australia.",
};

export default function ApplyPage() {
  return (
    <main className="apply-page">
      <InnerHeader />

      <section className="apply-shell">
        <div className="apply-intro">
          <p className="eyebrow"><span /> Founding artist beta</p>
          <h1>Tell us about<br /><em>the release.</em></h1>
          <p>
            Send the artist name, release type and target date. We review the
            application before asking for audio, artwork or payment. Accepted artists
            receive the distribution route and final terms in writing.
          </p>
          <div className="apply-pricing" aria-label="Planned launch pricing">
            <div><small>SINGLE</small><strong>A$10</strong></div>
            <div><small>EP / ALBUM</small><strong>A$20</strong></div>
          </div>
          <p className="apply-note">
            These prices are planned. We will confirm the final price and terms before
            taking payment.
          </p>
        </div>

        <ApplicationForm />
      </section>

      <footer className="apply-footer">
        <p>Questions before applying?</p>
        <a href="mailto:hello@navasound.com">hello@navasound.com</a>
        <small>© 2026 NavaSound · Mehdi Emir ABN 62 351 619 456</small>
      </footer>
    </main>
  );
}
