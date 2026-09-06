import Link from "next/link";
import Brand from "./_components/brand";
import SiteHeader from "./_components/site-header";
import { Arrow, FeatureModule, HeroArtwork, ToolIcon } from "./_components/release-showcase";

const preparation = [
  { title: "Artist application", copy: "Introduce your music and your release plans to the founding beta.", href: "/apply", action: "APPLY" },
  { title: "Release workspace", copy: "Bring artist names, credits and track details together on your device.", href: "/release", action: "OPEN WORKSPACE" },
  { title: "Human review", copy: "Share your details for a human fit and readiness review.", href: "/legal/beta", action: "BETA GUIDE" },
];
const resources = [
  { title: "RELEASE BRIEF", href: "/release", icon: 0 },
  { title: "ARTIST APPLICATION", href: "/apply", icon: 1 },
  { title: "BETA GUIDE", href: "/legal/beta", icon: 2 },
  { title: "PRIVACY NOTICE", href: "/legal/privacy", icon: 3 },
  { title: "WEBSITE TERMS", href: "/legal/terms", icon: 0 },
  { title: "REFUND POSITION", href: "/legal/refunds", icon: 2 },
  { title: "TARGET PRICING", href: "/#pricing", icon: 1 },
  { title: "EMAIL SUPPORT", href: "mailto:hello@navasound.com", icon: 3 },
];
const questions = [
  { question: "Can I release my music through NavaSound today?", answer: "You can apply for the Release Readiness beta and prepare a release brief today. Store delivery is not live yet. It will open after provider integration, secure workflow testing and final terms are complete. Applying does not guarantee acceptance or reserve a release date." },
  { question: "Do I keep ownership of my music?", answer: "Yes. Applying or preparing a brief does not transfer ownership or create a distribution agreement. The planned standard service does not take ownership of your masters. You must control the rights needed for any future delivery." },
  { question: "Do I need to pay or upload anything?", answer: "No payment is taken now, and the website does not accept audio or artwork. Your application and release brief are prepared on your device. You choose whether to copy, download or manually email the details. Nothing is automatically sent to NavaSound." },
  { question: "Does NavaSound take a royalty commission?", answer: "The target standard launch offer is 0% NavaSound commission on DSP royalties. Provider deductions, payout costs and optional services may apply. These will be disclosed before distribution launches." },
];
const footerGroups = [
  { label: "GET STARTED", links: [["APPLY FOR THE BETA", "/apply"], ["RELEASE WORKSPACE", "/release"], ["TARGET PRICING", "/#pricing"]] },
  { label: "RELEASE PREPARATION", links: [["ARTIST DETAILS", "/release#release-identity"], ["TRACK METADATA", "/release#track-metadata"], ["READINESS REVIEW", "/legal/beta"]] },
  { label: "RESOURCES", links: [["BETA GUIDE", "/legal/beta"], ["QUESTIONS", "/#questions"], ["CONTACT", "mailto:hello@navasound.com"]] },
  { label: "NAVASOUND", links: [["OUR APPROACH", "/#how-it-works"], ["TRUST CENTRE", "/legal"], ["GET IN TOUCH", "mailto:hello@navasound.com"]] },
  { label: "LEGAL", links: [["Privacy notice", "/legal/privacy"], ["Website terms", "/legal/terms"], ["Beta terms", "/legal/beta"], ["Refunds & cancellations", "/legal/refunds"]] },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="home-page">
        <div className="shell home-stack">
          <section className="centered-hero" id="top" aria-labelledby="hero-heading">
            <Link className="announcement-badge" href="/apply"><span>BETA</span><span className="announcement-desktop">Release Readiness: founding-artist applications are open.</span><span className="announcement-mobile">Founding-artist applications are open.</span></Link>
            <h1 id="hero-heading">Release prep for <em>artists.</em><br className="desktop-break" /> Built around <em>your music.</em></h1>
            <p className="hero-subtitle">Credits, rights &amp; metadata in one release brief.<br />Human readiness review. Your music stays yours.</p>
            <div className="hero-actions"><Link className="button button-outline" href="/release">BUILD A BRIEF</Link><Link className="button button-primary" href="/apply">APPLY FOR THE BETA</Link></div>
            <p className="hero-service-note">Release Readiness beta now. Distribution comes later.</p>
          </section>

          <section className="hero-band" aria-label="Explore the Release Readiness beta">
            <HeroArtwork />
            <div className="intro-grid launch-status-card-now" aria-label="Available now">{preparation.map(item => <article key={item.title}><div><h2>{item.title}</h2><p>{item.copy}</p></div><Link href={item.href}>{item.action}<Arrow diagonal /></Link></article>)}</div>
          </section>

          <section className="trust-strip" aria-label="Current service availability">
            <div className="fact-grid"><div><strong>Keep your files</strong><span>No masters or artwork requested</span></div><div><strong>No payment today</strong><span>Start with preparation</span></div><div><strong>Your rights</strong><span>Ownership stays with you</span></div><div><strong>Human review</strong><span>Fit and release readiness</span></div></div>
            <p className="trust-strapline">RELEASE READINESS NOW. DISTRIBUTION COMES LATER.</p>
            <div className="format-wordmarks" aria-label="For singles, EPs, albums and independent labels"><span>Singles<span aria-hidden="true">↗</span></span><span>EPs.</span><span>Albums</span><span>Independent <i>labels.</i></span></div>
          </section>

          <div className="feature-group">
            <FeatureModule id="how-it-works" number="01" label="RELEASE METADATA" title="Everything your release needs, in one brief." href="/release#release-identity" linkLabel="EXPLORE THE RELEASE WORKSPACE" items={[
              { title: "RELEASE IDENTITY", copy: "Keep the release title, artist names, format and genre consistent from the start.", icon: 0 },
              { title: "TRACK CREDITS", copy: "Bring performers, writers, producers and version details into a clear record.", icon: 1 },
              { title: "READINESS CHECKS", copy: "Spot the information you still need before asking for a human review.", icon: 2 },
              { title: "LOCAL EXPORT", copy: "Download or copy a text brief. You choose when and how to share it.", icon: 3 },
            ]} />
            <FeatureModule id="track-details" number="02" label="TRACKS & CREDITS" title="Every track, every credit. All in the right order." href="/release#track-metadata" linkLabel="BUILD YOUR RELEASE BRIEF" items={[
              { title: "SINGLES", copy: "One track, with space for every artist, writer, producer and version detail.", icon: 1 },
              { title: "EPS", copy: "Keep a short project organised, with individual credits for each track.", icon: 0 },
              { title: "ALBUMS", copy: "Bring the complete track list together in one structured release brief.", icon: 3 },
              { title: "TRACK ORDER", copy: "Review the sequence and details before you export your release metadata.", icon: 2 },
            ]} />
            <FeatureModule id="readiness" number="03" label="HUMAN READINESS REVIEW" title="Know what’s ready. And what needs a closer look." href="/apply" linkLabel="APPLY FOR HUMAN READINESS REVIEW" items={[
              { title: "RIGHTS & PERMISSIONS", copy: "Know which rights, samples and credits need confirmation before sharing your release.", icon: 2 },
              { title: "A HUMAN REVIEW", copy: "Email your details for a review of fit and readiness. Next steps are confirmed by email.", icon: 0 },
              { title: "A CLEAR RELEASE ROUTE", copy: "Preparation is open now. Provider delivery, secure uploads and payments come later.", icon: 3 },
            ]} />
          </div>

          <section className="pricing-module split-module" id="pricing" aria-labelledby="pricing-heading">
            <div className="split-copy">
              <p className="section-kicker">TARGET LAUNCH PRICING</p>
              <div><h2 id="pricing-heading">Planned pricing.<br />Per release.</h2><p>Target pricing for future distribution, in Australian dollars. No payment is taken now.</p></div>
            </div>
            <div className="pricing-details">
              <dl className="compact-prices"><div><dt>Single</dt><dd>A$10<span> target</span></dd></div><div><dt>EP / Album</dt><dd>A$20<span> target</span></dd></div></dl>
              <p className="pricing-qualification">Final inclusions, applicable tax and provider costs will be confirmed before payment opens.</p>
              <Link className="text-link" href="/legal/refunds">PRICING &amp; REFUND DETAILS <Arrow /></Link>
            </div>
          </section>

          <section className="resources-module split-module" aria-labelledby="resources-heading"><div className="split-copy"><p className="section-kicker">YOUR RELEASE TOOLKIT</p><div><h2 id="resources-heading">Made for<br />independent music.</h2><p>Preparation tools, clear terms and a direct line to a human.</p></div></div><div className="resource-grid">{resources.map(item => <Link href={item.href} key={item.title}><ToolIcon kind={item.icon} /><Arrow diagonal /><span>{item.title}</span></Link>)}</div></section>

          <section className="principle-grid" aria-label="NavaSound service principles">
            <article><p>Prepare a local release brief and apply for a human fit and readiness review. Nothing is automatically submitted.</p><div><strong>RELEASE READINESS</strong><span>Available now</span></div></article>
            <article><p>Applying never transfers your masters. The target future offer is 0% NavaSound commission on standard DSP royalties; provider deductions and payout costs may apply.</p><div><strong>ARTIST OWNERSHIP</strong><span>Your music stays yours</span></div></article>
            <article className="launch-status-card-later"><p>Secure audio and artwork uploads, payments, DSP delivery, royalty reporting and payouts come only after provider integration, workflow testing and final terms.</p><div><strong>DISTRIBUTION</strong><span>Coming later · no release date reserved</span></div></article>
          </section>

          <section className="help-module split-module" id="questions" aria-labelledby="questions-heading"><div className="help-copy"><h2 id="questions-heading">Still wondering?</h2><p>A few answers before you begin.<br />For everything else, there’s a human.</p><a className="text-link" href="mailto:hello@navasound.com">TALK TO A HUMAN <Arrow /></a></div><div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>
        </div>
      </main>

      <footer className="site-footer shell"><div className="footer-spacer" /><div className="footer-link-grid">{footerGroups.map(group => <div key={group.label}><p>{group.label}</p>{group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>)}</div><div className="footer-base"><div><Link className="brand" href="/" aria-label="NavaSound home"><Brand /></Link><p>© 2026 · MEHDI EMIR · ABN 62 351 619 456</p></div><span className="footer-status"><i /> RELEASE READINESS BETA OPEN</span><a className="footer-contact" href="mailto:hello@navasound.com">SAY HELLO <Arrow /></a></div><p className="footer-boundary">Queensland, Australia · Distribution, final pricing and store availability remain subject to provider integration and final service terms.</p></footer>
    </>
  );
}
