import Link from "next/link";
import InnerHeader from "../_components/inner-header";
import { createPageMetadata } from "../_lib/metadata";
import ReleaseBriefForm from "./release-brief-form";

export const metadata = createPageMetadata({
  title: "Release readiness workspace | NavaSound",
  description: "A local-only metadata brief for the NavaSound founding beta.",
  path: "/release",
});

export default async function ReleasePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const format = (await searchParams).format;
  const initialReleaseType = format === "EP" || format === "Album" ? format : "Single";

  return (
    <main id="main-content" className="release-page">
      <InnerHeader />
      <section className="release-hero">
        <p className="eyebrow"><span /> Release Readiness workspace</p>
        <h1>Your release brief.</h1>
        <div>
          <p>
            Bring your artist details, credits and track metadata together.
            Your answers stay in this browser. Download or copy the brief, then
            manually email it to NavaSound for readiness review. Do not attach
            masters or artwork.
          </p>
          <Link className="text-link" href="/legal/beta">Read beta submission terms ↗</Link>
        </div>
      </section>
      <div className="release-boundary">
        <span>NO UPLOAD</span><span>NO PAYMENT</span><span>NO SERVER STORAGE</span><span>LOCAL DOWNLOAD ONLY</span>
      </div>
      <ReleaseBriefForm initialReleaseType={initialReleaseType} />
      <footer className="apply-footer release-footer">
        <p>Need help preparing metadata?</p>
        <a href="mailto:hello@navasound.com">hello@navasound.com</a>
        <Link href="/legal">Legal &amp; trust centre</Link>
      </footer>
    </main>
  );
}
