import Link from "next/link";
import EditorialPage from "../_components/editorial-page";
import { Arrow } from "../_components/release-showcase";
import { createPageMetadata } from "../_lib/metadata";

export const metadata = createPageMetadata({
  title: "About NavaSound | NavaSound",
  description: "NavaSound’s approach to independent music: clear release preparation, artist ownership and human fit and readiness review.",
  path: "/about",
});

const principles = [
  { title: "Keep the artist in control.", copy: "Your music remains yours. Preparing a brief or applying to the beta does not transfer ownership or create a distribution agreement." },
  { title: "Make the details easier.", copy: "Names, credits, track order and rights notes belong together. A clear brief gives you a useful record to check, keep and share." },
  { title: "Leave room for a conversation.", copy: "The beta includes a human review of fit and readiness. Questions and next steps are handled by email as capacity allows." },
];

export default function AboutPage() {
  return (
    <EditorialPage eyebrow="About NavaSound" title="For the work behind the music." description="A considered approach to release preparation, built around independent artists and the details that deserve their attention.">
      <section className="about-statement" aria-labelledby="about-purpose"><h2 id="about-purpose">A little clarity goes a long way.</h2><div><p>Finishing the music is one part of a release. Getting the names, credits and permissions into a clear record is another.</p><p>NavaSound’s Release Readiness beta gives that work a place: a local workspace, an artist application and a route to human review.</p></div></section>
      <section className="about-principles" aria-labelledby="principles-heading"><p className="editorial-kicker">The way we work</p><h2 id="principles-heading">Three things we come back to.</h2><ol role="list">{principles.map((principle, index) => <li key={principle.title}><span aria-hidden="true">0{index + 1}</span><h3>{principle.title}</h3><p>{principle.copy}</p></li>)}</ol></section>
      <section className="about-now" aria-labelledby="about-now-heading"><h2 id="about-now-heading">Preparation, today.</h2><div><p>You can prepare a release brief, keep a copy and manually share it for review. No payment is taken, and the website does not accept audio or artwork.</p><p>Distribution, secure uploads, payments and royalty reporting remain future services, subject to provider integration, testing and final terms.</p><Link className="text-link" href="/legal/beta">What the beta includes <Arrow /></Link></div></section>
      <div className="editorial-next"><div><p className="editorial-kicker">Your next step</p><h2>Start with the details.</h2></div><Link className="button button-primary" href="/guide">Read the release guide <Arrow /></Link></div>
    </EditorialPage>
  );
}
