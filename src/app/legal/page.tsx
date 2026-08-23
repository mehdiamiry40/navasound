import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "./_components/legal-page";

export const metadata: Metadata = {
  title: "Legal and trust centre | NavaSound",
  description: "NavaSound privacy, website, beta submission and refund information.",
};

const documents = [
  ["Privacy Notice", "/legal/privacy", "How enquiries and release information are handled."],
  ["Website Terms", "/legal/terms", "The rules for using NavaSound's public website."],
  ["Beta Submission Terms", "/legal/beta", "What an early-access application does—and does not—mean."],
  ["Refunds & Cancellations", "/legal/refunds", "Current payment status and the launch standard."],
];

export default function LegalOverviewPage() {
  return (
    <LegalPage title="Plain-English policies." eyebrow="Legal centre">
      <section>
        <h2>Clear before commercial.</h2>
        <p>
          NavaSound is preparing a private founding-artist beta. These documents
          cover the website and pre-launch application process. A separate final
          distribution agreement will be provided before NavaSound requests audio,
          artwork or payment.
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
        <strong>Current launch boundary</strong>
        <p>
          The website does not take payments, upload audio or artwork, create DSP
          deliveries, or store form responses on NavaSound servers.
        </p>
      </aside>
    </LegalPage>
  );
}
