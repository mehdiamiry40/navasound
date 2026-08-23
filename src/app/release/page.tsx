import type { Metadata } from "next";
import Link from "next/link";
import InnerHeader from "../_components/inner-header";
import ReleaseBriefForm from "./release-brief-form";

export const metadata: Metadata = {
  title: "Prepare a release | NavaSound",
  description: "Create a structured, local-only release brief for the NavaSound founding-artist beta.",
};

export default function ReleasePage() {
  return (
    <main className="release-page">
      <InnerHeader />
      <section className="release-hero">
        <p className="eyebrow"><span /> Beta release workspace</p>
        <h1>Metadata first.<br /><em>Masters later.</em></h1>
        <div>
          <p>
            Build a clean release brief before sending audio or artwork. Your answers
            stay in this browser and download as a text file on your device.
          </p>
          <Link className="text-link" href="/legal/beta">Read beta submission terms ↗</Link>
        </div>
      </section>
      <div className="release-boundary">
        <span>NO UPLOAD</span><span>NO PAYMENT</span><span>NO SERVER STORAGE</span><span>LOCAL DOWNLOAD ONLY</span>
      </div>
      <ReleaseBriefForm />
      <footer className="apply-footer release-footer">
        <p>Need help preparing metadata?</p>
        <a href="mailto:hello@navasound.com">hello@navasound.com</a>
        <Link href="/legal">Legal &amp; trust centre</Link>
      </footer>
    </main>
  );
}
