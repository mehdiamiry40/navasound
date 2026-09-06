import Link from "next/link";
import Brand from "./_components/brand";
import SiteHeader from "./_components/site-header";
import { Arrow, HeroArtwork } from "./_components/release-showcase";

const preparation = [
  { title: "Artist application", copy: "Introduce your music and your plans for the next release.", href: "/apply", action: "Apply for the beta" },
  { title: "Release workspace", copy: "Bring names, credits and track details together on your device.", href: "/release", action: "Open the workspace" },
  { title: "Human review", copy: "Share your details for a human fit and readiness review.", href: "/legal/beta", action: "How review works" },
];
const questions = [
  { question: "Can I release my music through NavaSound today?", answer: "You can apply for the Release Readiness beta and prepare a release brief today. Store delivery is not live yet. It will open after provider integration, secure workflow testing and final terms are complete. Applying does not guarantee acceptance or reserve a release date." },
  { question: "Do I keep ownership of my music?", answer: "Yes. Applying or preparing a brief does not transfer ownership or create a distribution agreement. The planned standard service does not take ownership of your masters. You must control the rights needed for any future delivery." },
  { question: "Do I need to pay or upload anything?", answer: "No payment is taken now, and the website does not accept audio or artwork. Your application and release brief are prepared on your device. You choose whether to copy, download or manually email the details. Nothing is automatically sent to NavaSound." },
  { question: "Does NavaSound take a royalty commission?", answer: "The target standard launch offer is 0% NavaSound commission on DSP royalties. Provider deductions, payout costs and optional services may apply. These will be disclosed before distribution launches." },
];

const footerLinks = [
  ["Trust centre", "/legal"],
  ["Privacy notice", "/legal/privacy"],
  ["Website terms", "/legal/terms"],
  ["Beta guide", "/legal/beta"],
  ["Refunds", "/legal/refunds"],
  ["Contact", "mailto:hello@navasound.com"],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="home-page">
        <div className="shell home-stack">
          <section className="centered-hero" id="top" aria-labelledby="hero-heading">
            <p className="beta-status"><span aria-hidden="true" />Release Readiness beta</p>
            <h1 id="hero-heading">Release prep,<br /><em>made simple.</em></h1>
            <p className="hero-subtitle">Keep credits, rights and track details in one place.<br className="desktop-break" /> Prepare locally, then share for human review.</p>
            <div className="hero-actions"><Link className="button button-primary" href="/release">Build a release brief</Link><Link className="text-link" href="/apply">Apply for the beta <Arrow /></Link></div>
            <p className="hero-service-note">Preparation is open. Store delivery comes later.</p>
          </section>

          <HeroArtwork />

          <section className="beta-section" id="how-it-works" aria-labelledby="beta-heading">
            <div className="beta-intro"><h2 id="beta-heading">A clear place to start.</h2><p>For singles, EPs and albums. <br />Your music stays yours.</p></div>
            <div className="preparation-options launch-status-card-now" aria-label="Available now">
              {preparation.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p><Link className="text-link" href={item.href}>{item.action}<Arrow /></Link></article>)}
            </div>
            <p className="beta-note">Your details are shared manually by email. No payment or audio uploads are required.</p>
          </section>

          <section className="pricing-section" id="pricing" aria-labelledby="pricing-heading">
            <div className="pricing-heading"><p className="section-kicker">TARGET LAUNCH PRICING</p><h2 id="pricing-heading">Planned pricing.<br />Per release.</h2><p>Target pricing for future distribution, in Australian dollars. No payment is taken now.</p></div>
            <div className="price-ledger"><dl className="compact-prices"><div><dt>Single</dt><dd>A$10<span> target</span></dd></div><div><dt>EP / Album</dt><dd>A$20<span> target</span></dd></div></dl><p className="pricing-qualification">Final inclusions, applicable tax and provider costs will be confirmed before payment opens.</p><Link className="text-link" href="/legal/refunds">Pricing and refund details <Arrow /></Link></div>
          </section>
          <aside className="distribution-note launch-status-card-later" aria-label="Future distribution availability"><div><strong>DISTRIBUTION</strong><span>Coming later · no release date reserved</span></div><p>Secure audio and artwork uploads, payments, DSP delivery, royalty reporting and payouts come only after provider integration, workflow testing and final terms.</p></aside>

          <section className="questions-section" id="questions" aria-labelledby="questions-heading"><h2 id="questions-heading">A few questions, answered.</h2><div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div><p className="question-contact">Something else on your mind? <a href="mailto:hello@navasound.com">Get in touch <Arrow /></a></p></section>
        </div>
      </main>

      <footer className="site-footer shell"><div className="footer-main"><Link className="brand" href="/" aria-label="NavaSound home"><Brand /></Link><nav aria-label="Footer navigation">{footerLinks.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav></div><div className="footer-meta"><p>© 2026 NavaSound · MEHDI EMIR · ABN 62 351 619 456</p><span>Queensland, Australia</span></div></footer>
    </>
  );
}
