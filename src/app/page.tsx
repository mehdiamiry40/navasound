import Link from "next/link";
import Brand from "./_components/brand";
import SiteHeader from "./_components/site-header";
import { Arrow, HeroArtwork, RecordMotif } from "./_components/release-showcase";

const preparation = [
  { title: "Artist application", copy: "Introduce your music and your release plans to the founding beta.", href: "/apply", action: "APPLY" },
  { title: "Release workspace", copy: "Bring artist names, credits and track details together on your device.", href: "/release", action: "OPEN WORKSPACE" },
  { title: "Human review", copy: "Share your details for a human fit and readiness review.", href: "/legal/beta", action: "BETA GUIDE" },
];
const briefDetails = [
  { title: "Give it an identity.", copy: "Release title, artist names, format and genre. Start with the details that make the music yours." },
  { title: "Credit every contribution.", copy: "Performers, writers, producers and versions. Keep the people behind each track in the picture." },
  { title: "Find the missing pieces.", copy: "Check your rights, permissions and release details before asking for a human review." },
  { title: "Keep a copy.", copy: "Copy or download your brief. It stays on your device until you choose to share it." },
];
const resources = [
  { title: "The workspace", subtitle: "Put your release in order", href: "/release" },
  { title: "Artist application", subtitle: "Introduce your music", href: "/apply" },
  { title: "The beta guide", subtitle: "Know what to expect", href: "/legal/beta" },
  { title: "Say hello", subtitle: "hello@navasound.com", href: "mailto:hello@navasound.com" },
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
            <div className="studio-caption"><span>FOR THE MUSIC YOU’RE MAKING.</span><span>AND EVERYTHING THAT COMES WITH IT.</span></div>
            <div className="intro-path launch-status-card-now" aria-label="Available now">
              {preparation.map((item, index) => <article key={item.title}><span className="path-number" aria-hidden="true">0{index + 1}</span><div><h2>{item.title}</h2><p>{item.copy}</p><Link className="text-link" href={item.href}>{item.action}<Arrow /></Link></div></article>)}
            </div>
          </section>

          <section className="brief-editorial" id="how-it-works" aria-labelledby="brief-heading">
            <div className="brief-heading">
              <p className="section-kicker">01 / THE RELEASE BRIEF</p>
              <h2 className="display-heading" id="brief-heading">Good music.<br /><em>Clear details.</em></h2>
              <p className="editorial-intro">There’s a lot behind a finished track. Give the names, credits and decisions a place of their own.</p>
              <Link className="text-link" href="/release#release-identity">EXPLORE THE WORKSPACE <Arrow /></Link>
            </div>
            <ol className="brief-details">{briefDetails.map((item, index) => <li key={item.title}><span aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></li>)}</ol>
          </section>

          <section className="record-section" id="track-details" aria-labelledby="record-heading">
            <RecordMotif />
            <div className="record-heading"><p className="section-kicker">02 / TRACKS &amp; CREDITS</p><h2 className="display-heading" id="record-heading">One song.<br />Or a <em>whole world.</em></h2><p>A first single, a short project, a complete album.<br />Every track deserves the same care.</p></div>
            <div className="record-formats">
              <div><span className="format-index">01</span><h3>Single</h3><p>One track. Space for every artist, writer, producer and version.</p></div>
              <div><span className="format-index">02</span><h3>EP</h3><p>A short project, with the credits for each track kept together.</p></div>
              <div><span className="format-index">03</span><h3>Album</h3><p>The full picture, from the opening track to the final credit.</p></div>
            </div>
            <div className="record-bottom"><p>Set the order. Check the credits. Keep your copy.</p><Link className="text-link" href="/release#track-metadata">BUILD YOUR RELEASE BRIEF <Arrow /></Link></div>
          </section>

          <section className="human-section" id="readiness" aria-labelledby="human-heading">
            <p className="section-kicker">03 / A HUMAN IN THE LOOP</p>
            <div className="human-heading"><h2 className="display-heading" id="human-heading">A fresh perspective.<br /><em>A real conversation.</em></h2><p>Before the next step, a useful conversation. Share your plans, credits and rights information for a human review of fit and readiness.</p></div>
            <ol className="review-route">
              <li><span className="route-number" aria-hidden="true">1</span><h3>Tell us about it.</h3><p>Prepare your artist application or release brief. A little context helps us understand the project.</p></li>
              <li><span className="route-number" aria-hidden="true">2</span><h3>Share when you’re ready.</h3><p>Manually email your details. Nothing is sent automatically, and no audio or artwork is requested.</p></li>
              <li><span className="route-number" aria-hidden="true">3</span><h3>Talk through what’s next.</h3><p>A person reviews fit and readiness. Next steps are confirmed by email; a place isn’t guaranteed.</p></li>
            </ol>
            <Link className="human-link" href="/apply">Let’s start with your music <span><Arrow diagonal /></span></Link>
          </section>

          <section className="ownership-note" aria-labelledby="ownership-heading">
            <p className="section-kicker">INDEPENDENT, BY NATURE</p>
            <h2 className="display-heading" id="ownership-heading">Yours, from<br />the <em>first note.</em></h2>
            <p>Preparing a brief or applying never transfers ownership of your masters or creates a distribution agreement.</p>
            <span>No payment today. No masters to upload.</span>
          </section>

          <section className="pricing-section" id="pricing" aria-labelledby="pricing-heading">
            <div className="pricing-heading"><p className="section-kicker">TARGET LAUNCH PRICING</p><h2 className="display-heading" id="pricing-heading">Planned pricing.<br />Per release.</h2><p>Target pricing for future distribution, in Australian dollars. No payment is taken now.</p></div>
            <div className="price-ledger"><dl className="compact-prices"><div><dt>Single</dt><dd>A$10<span> target</span></dd></div><div><dt>EP / Album</dt><dd>A$20<span> target</span></dd></div></dl><p className="pricing-qualification">Final inclusions, applicable tax and provider costs will be confirmed before payment opens.</p><Link className="text-link" href="/legal/refunds">PRICING &amp; REFUND DETAILS <Arrow /></Link></div>
          </section>
          <aside className="distribution-note launch-status-card-later" aria-label="Future distribution availability"><div><strong>DISTRIBUTION</strong><span>Coming later · no release date reserved</span></div><p>Secure audio and artwork uploads, payments, DSP delivery, royalty reporting and payouts come only after provider integration, workflow testing and final terms.</p></aside>

          <section className="resource-section" aria-labelledby="resources-heading"><div className="resource-heading"><p className="section-kicker">A FEW USEFUL PLACES</p><h2 id="resources-heading">Pick up from here.</h2></div><div className="resource-links">{resources.map((item, index) => <Link href={item.href} key={item.title}><span className="resource-number">0{index + 1}</span><span className="resource-name">{item.title}<small>{item.subtitle}</small></span><Arrow diagonal /></Link>)}</div></section>

          <section className="questions-section" id="questions" aria-labelledby="questions-heading"><div className="questions-heading"><p className="section-kicker">BEFORE YOU BEGIN</p><h2 className="display-heading" id="questions-heading">A few good questions.</h2></div><div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div><p className="question-contact">Still wondering? <a href="mailto:hello@navasound.com">Talk to a human <Arrow diagonal /></a></p></section>
        </div>
      </main>

      <footer className="site-footer shell"><div className="footer-link-grid">{footerGroups.map(group => <div key={group.label}><p>{group.label}</p>{group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>)}</div><div className="footer-signoff" aria-hidden="true">NAVA<span>SOUND</span><i>↗</i></div><div className="footer-base"><div><Link className="brand" href="/" aria-label="NavaSound home"><Brand /></Link><p>© 2026 · MEHDI EMIR · ABN 62 351 619 456</p></div><span className="footer-status"><i /> RELEASE READINESS BETA OPEN</span><a className="footer-contact" href="mailto:hello@navasound.com">SAY HELLO <Arrow /></a></div><p className="footer-boundary">Queensland, Australia · Distribution, final pricing and store availability remain subject to provider integration and final service terms.</p></footer>
    </>
  );
}
