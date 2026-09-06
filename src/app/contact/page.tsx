import Link from "next/link";
import EditorialPage from "../_components/editorial-page";
import { Arrow } from "../_components/release-showcase";
import { createPageMetadata } from "../_lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact | NavaSound",
  description: "Get in touch with NavaSound about the Release Readiness beta, your application or your release brief.",
  path: "/contact",
});

const topics = [
  { title: "A question about NavaSound", copy: "Tell us what you’d like to know about the beta or how preparation works.", subject: "NavaSound enquiry" },
  { title: "Your artist application", copy: "Include your artist name and the context of your application.", subject: "NavaSound artist application" },
  { title: "Help with a release brief", copy: "Tell us which detail you’re working on and where you need a hand.", subject: "NavaSound release brief question" },
];

export default function ContactPage() {
  return (
    <EditorialPage eyebrow="Contact" title="Start a conversation." description="Questions about the beta, an application or your release brief? There’s a direct way to get in touch.">
      <section className="contact-address" aria-label="Email NavaSound"><a href="mailto:hello@navasound.com">hello@navasound.com <Arrow /></a><p>Opens your email app. You write and send the message.</p></section>
      <section className="contact-topics" aria-labelledby="contact-topics-heading"><h2 id="contact-topics-heading">What’s on your mind?</h2><div>{topics.map(topic => <a key={topic.subject} href={`mailto:hello@navasound.com?subject=${encodeURIComponent(topic.subject)}`}><h3>{topic.title}</h3><p>{topic.copy}</p><span>Email about this <Arrow /></span></a>)}</div></section>
      <section className="contact-notes" aria-labelledby="before-email-heading"><div><h2 id="before-email-heading">Before you send.</h2><p>Keep your message to questions, release details or a text brief. Please leave out masters, artwork, identity documents and payment details.</p><p>For a review request, paste or attach your brief yourself. Opening an email link does not send it automatically. Review timing and next steps are confirmed by email.</p></div><div><p className="editorial-kicker">NavaSound</p><p>MEHDI EMIR<br />ABN 62 351 619 456<br />Queensland, Australia</p><Link className="text-link" href="/legal/privacy">How information is handled <Arrow /></Link></div></section>
      <div className="editorial-next"><div><p className="editorial-kicker">Still preparing?</p><h2>The guide is a good place to begin.</h2></div><Link className="text-link" href="/guide">Explore the release guide <Arrow /></Link></div>
    </EditorialPage>
  );
}
