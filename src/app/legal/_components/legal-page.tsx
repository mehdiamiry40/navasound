import Link from "next/link";
import type { ReactNode } from "react";
import InnerHeader from "../../_components/inner-header";

const legalNavigation = [
  { href: "/legal", label: "Overview", title: "Plain-English policies." },
  { href: "/legal/privacy", label: "Privacy", title: "Privacy Notice" },
  { href: "/legal/terms", label: "Website terms", title: "Website Terms" },
  { href: "/legal/beta", label: "Beta terms", title: "Beta Submission Terms" },
  { href: "/legal/refunds", label: "Refunds", title: "Refunds & Cancellations" },
];

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
    <main id="main-content" className="legal-page">
      <InnerHeader />
      <section className="legal-shell">
        <aside className="legal-sidebar">
          <p className="section-kicker">LEGAL &amp; TRUST</p>
          <nav aria-label="Legal documents">
            {legalNavigation.map((item) => (
              <Link href={item.href} key={item.href} aria-current={title === item.title ? "page" : undefined}>
                {item.label}<span aria-hidden="true">↗</span>
              </Link>
            ))}
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
