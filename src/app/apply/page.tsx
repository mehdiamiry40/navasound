import InnerHeader from "../_components/inner-header";
import { createPageMetadata } from "../_lib/metadata";
import ApplicationForm from "./application-form";

export const metadata = createPageMetadata({
  title: "Apply for the founding-artist beta | NavaSound",
  description:
    "Apply for NavaSound's private founding-artist music distribution beta in Australia.",
  path: "/apply",
});

export default function ApplyPage() {
  return (
    <main id="main-content" className="apply-page">
      <InnerHeader />

      <section className="apply-shell">
        <div className="apply-intro">
          <p className="eyebrow"><span /> Private founding-artist beta</p>
          <h1>Start with the<br /><em>right release.</em></h1>
          <p>
            Tell us what you are preparing. We will review the fit, confirm the
            distribution route and provide final service terms before requesting
            audio, artwork or payment.
          </p>
          <div className="apply-pricing" aria-label="Planned launch pricing">
            <div><small>SINGLE</small><strong>A$10</strong></div>
            <div><small>EP / ALBUM</small><strong>A$20</strong></div>
          </div>
          <p className="apply-note">
            Launch pricing remains subject to the final distribution agreement and
            published service terms.
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
