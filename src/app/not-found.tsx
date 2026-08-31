import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | NavaSound",
  description: "The requested NavaSound page could not be found.",
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="state-page">
      <section className="state-shell" aria-labelledby="state-title">
        <p className="state-code">404 / Off the set list</p>
        <h1 id="state-title">Page not found.</h1>
        <p>
          The address may have changed, or the page may no longer be available.
        </p>
        <div className="state-actions">
          <Link className="button button-primary" href="/">
            Return home <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link" href="/apply">Apply to the beta</Link>
        </div>
      </section>
    </main>
  );
}
