"use client";

import Link from "next/link";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main id="main-content" className="state-page">
      <section className="state-shell" aria-labelledby="state-title">
        <p className="state-code">500 / Playback interrupted</p>
        <h1 id="state-title">Something went quiet.</h1>
        <p>
          We could not load this page. Try again, or return home and continue from
          there.
        </p>
        <div className="state-actions">
          <button className="button button-primary" type="button" onClick={retry}>
            Try again
          </button>
          <Link className="text-link" href="/">Return home</Link>
        </div>
      </section>
    </main>
  );
}
