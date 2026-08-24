import type { Metadata } from "next";
import Link from "next/link";
import InnerHeader from "../_components/inner-header";
import ReleaseBriefForm from "./release-brief-form";

export const metadata: Metadata = {
  title: "Prepare a release | NavaSound",
  description: "Create a release brief on your device for the NavaSound founding artist beta.",
  alternates: { canonical: "/release" },
};

export default function ReleasePage() {
  return (
    <main className="release-page">
      <InnerHeader />
      <section className="release-hero">
        <p className="eyebrow"><span /> Beta release workspace</p>
        <h1>Build the brief.<br /><em>Keep your files.</em></h1>
        <div>
          <p>
            Enter the release and track details. Your browser downloads them as a text
            file and sends nothing to NavaSound.
          </p>
          <Link className="text-link" href="/legal/beta">Read the beta terms ↗</Link>
        </div>
      </section>
      <p className="release-boundary">
        This workspace stores nothing on NavaSound servers. It accepts no uploads or payments.
      </p>
      <ReleaseBriefForm />
      <footer className="apply-footer release-footer">
        <p>Need help with the metadata?</p>
        <a href="mailto:hello@navasound.com">hello@navasound.com</a>
        <Link href="/legal">Legal and trust centre</Link>
      </footer>
    </main>
  );
}
