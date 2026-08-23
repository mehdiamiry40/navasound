import type { Metadata } from "next";
import Link from "next/link";
import ApplicationForm from "./application-form";

export const metadata: Metadata = {
  title: "Apply for the founding-artist beta | NavaSound",
  description:
    "Apply for NavaSound's private founding-artist music distribution beta in Australia.",
};

export default function ApplyPage() {
  return (
    <main className="apply-page">
      <header className="site-header apply-header">
        <Link className="brand" href="/" aria-label="NavaSound home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>NavaSound</span>
        </Link>
        <Link className="text-link" href="/">Back to the website</Link>
      </header>

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
        <small>© 2026 NavaSound · Built in Australia</small>
      </footer>
    </main>
  );
}
