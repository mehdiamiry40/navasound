import Link from "next/link";
import type { ReactNode } from "react";
import InnerHeader from "../../_components/inner-header";

export default function LegalPage({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <main className="legal-page">
      <InnerHeader />
      <section className="legal-shell">
        <aside className="legal-sidebar">
          <p className="section-kicker">LEGAL &amp; TRUST</p>
          <nav aria-label="Legal documents">
            <Link href="/legal">Overview</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Website terms</Link>
            <Link href="/legal/beta">Beta terms</Link>
            <Link href="/legal/refunds">Refunds</Link>
          </nav>
          <p>Operated by Mehdi Emir<br />ABN 62 351 619 456<br />Queensland, Australia</p>
        </aside>

        <article className="legal-document">
          <p className="eyebrow"><span /> {eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-updated">Effective 23 August 2026 · Version 1.0</p>
          <div className="legal-copy">{children}</div>
        </article>
      </section>
      <footer className="legal-footer">
        <p>Questions about these documents?</p>
        <a href="mailto:hello@navasound.com">hello@navasound.com</a>
        <Link href="/">navasound.com</Link>
      </footer>
    </main>
  );
}
