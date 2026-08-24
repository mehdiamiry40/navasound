import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "./_components/legal-page";

export const metadata: Metadata = {
  title: "Legal and trust centre | NavaSound",
  description: "NavaSound privacy, website, beta submission and refund information.",
  alternates: { canonical: "/legal" },
};

const documents = [
  ["Privacy notice", "/legal/privacy", "How enquiries and release information are handled."],
  ["Website terms", "/legal/terms", "The rules for using NavaSound's public website."],
  ["Beta submission terms", "/legal/beta", "What a founding artist application means."],
  ["Refunds and cancellations", "/legal/refunds", "Payment status and planned launch terms."],
];

export default function LegalOverviewPage() {
  return (
    <LegalPage title="Policies for the beta." eyebrow="Legal centre">
      <section>
        <h2>Before NavaSound takes files or payment.</h2>
        <p>
          NavaSound is preparing a small founding artist beta. These documents apply
          to the website and application process. They are not the distribution
          agreement. Accepted artists will receive that agreement before NavaSound
          asks for audio, artwork or payment.
        </p>
      </section>
      <div className="legal-card-grid">
        {documents.map(([title, href, description]) => (
          <Link href={href} key={href}>
            <span>{title}</span>
            <p>{description}</p>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>
      <aside className="legal-callout">
        <strong>What the site does not do</strong>
        <p>
          The website does not take payments, upload audio or artwork, create DSP
          deliveries, or store form responses on NavaSound servers.
        </p>
      </aside>
    </LegalPage>
  );
}
