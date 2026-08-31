import Link from "next/link";

const Arrow = () => <span aria-hidden="true">↗</span>;

const standards = [
  { number: "01", title: "Metadata that starts cleanly.", copy: "The local release brief and readiness review catch missing credits, inconsistent artist names and avoidable issues before any future delivery.", className: "standard-yellow", visual: "META" },
  { number: "02", title: "Rights stay with the artist.", copy: "Preparing a brief or applying does not transfer your masters. NavaSound’s planned standard distribution service takes no ownership and targets no standard DSP royalty commission.", className: "standard-blue", visual: "100%" },
  { number: "03", title: "A route you can actually see.", copy: "Applications and human readiness review are available now. Delivery status and royalty reporting follow only after provider integration and testing.", className: "standard-cream", visual: "LIVE" },
];

const steps = [
  { title: "Apply", phase: "AVAILABLE NOW", copy: "Tell us about the artist, planned release and target date." },
  { title: "Prepare", phase: "AVAILABLE NOW", copy: "Build a clean metadata brief locally—without uploading masters." },
  { title: "Review", phase: "AVAILABLE NOW", copy: "A human checks fit, rights, credits, metadata and release readiness." },
  { title: "Deliver", phase: "COMING LATER", copy: "Accepted releases can enter final agreement, secure upload and provider delivery after integration." },
  { title: "Report", phase: "COMING LATER", copy: "Delivery status, royalty statements and payouts begin only when the full service is live." },
];

export default function Home() {
  return (
    <main id="main-content">
      <div className="announcement">
        <p>Release Readiness beta · Applications now open</p>
        <Link href="/apply">Apply for early access <Arrow /></Link>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="NavaSound home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>NavaSound</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#standards">Why NavaSound</a>
          <a href="#pricing">Pricing</a>
          <a href="#how-it-works">How it works</a>
          <Link href="/legal">Legal &amp; trust</Link>
          <Link className="nav-cta" href="/apply">Join the beta <Arrow /></Link>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Site navigation menu">
            <span>Menu</span>
            <span className="mobile-menu-icon" aria-hidden="true">+</span>
          </summary>
          <nav aria-label="Mobile navigation">
            <a href="#standards">Why NavaSound</a>
            <a href="#pricing">Pricing</a>
            <a href="#how-it-works">How it works</a>
            <Link href="/legal">Legal &amp; trust</Link>
            <Link className="nav-cta" href="/apply">Apply <Arrow /></Link>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Release Readiness for independent artists · Australia</p>
          <h1>Your release.<br /><em>Clearly handled.</em></h1>
          <p className="hero-lede">Applications, local metadata preparation and human readiness review are available now. Full distribution, secure uploads and payments come only after provider integration and testing.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/apply">Apply for early access <Arrow /></Link>
            <Link className="text-link" href="/release">Prepare metadata <Arrow /></Link>
          </div>
          <div className="hero-assurance" aria-label="Current beta boundaries">
            <span>Preparation now</span><span>Distribution later</span><span>No payment yet</span><span>No master uploads yet</span>
          </div>
        </div>
        <aside className="hero-index" aria-label="NavaSound service index">
          <div className="hero-index-number" aria-hidden="true">01</div>
          <div className="hero-index-grid">
            <div><small>SERVICE</small><strong>Release readiness beta</strong></div>
            <div><small>MODEL</small><strong>Application + human review</strong></div>
            <div><small>BASE</small><strong>Queensland, Australia</strong></div>
            <div><small>STATUS</small><strong>Applications open</strong></div>
          </div>
          <p>Independent release infrastructure / 2026</p>
        </aside>
      </section>

      <section className="launch-status section-shell" id="availability" aria-labelledby="availability-heading">
        <div className="launch-status-heading">
          <p className="section-kicker">SERVICE AVAILABILITY</p>
          <h2 id="availability-heading">Available now.<br /><em>Coming later.</em></h2>
          <p>Release Readiness helps artists organise the work before distribution. Provider-dependent delivery, money movement and file handling are not operating yet.</p>
        </div>
        <div className="launch-status-grid">
          <article className="launch-status-card launch-status-card-now">
            <p className="launch-status-label">AVAILABLE NOW</p>
            <h3>Prepare for a release.</h3>
            <ul className="launch-status-list">
              <li>Founding-artist application</li>
              <li>Local metadata release brief</li>
              <li>Human fit and readiness review</li>
            </ul>
          </article>
          <article className="launch-status-card launch-status-card-later">
            <p className="launch-status-label">COMING AFTER PROVIDER INTEGRATION</p>
            <h3>Distribute and get paid.</h3>
            <ul className="launch-status-list">
              <li>Final agreement and payment, followed by secure audio and artwork upload</li>
              <li>DSP delivery and release status</li>
              <li>Royalty statements and payouts</li>
            </ul>
          </article>
        </div>
        <p className="launch-status-note">Submitting an application or preparing a brief does not guarantee acceptance or reserve a release date.</p>
      </section>

      <section className="metrics-band" aria-label="NavaSound launch principles">
        <div><strong>0%</strong><span>target launch · NavaSound standard DSP royalty commission</span></div>
        <div><strong>A$10</strong><span>target launch · single fee</span></div>
        <div><strong>A$20</strong><span>target launch · EP / album fee</span></div>
        <div><strong>100%</strong><span>artist ownership unchanged</span></div>
      </section>

      <section className="standards section-shell" id="standards">
        <div className="section-heading-row">
          <div><p className="section-kicker">THE NAVASOUND STANDARD</p><h2>Release preparation should<br />feel <em>understandable.</em></h2></div>
          <p>Most release problems are not creative problems. Release Readiness starts with missing data, unclear rights and practical human review now, before NavaSound activates provider delivery, payments or reporting.</p>
        </div>
        <div className="standards-grid">
          {standards.map((item) => (
            <article className={`standard-card ${item.className}`} key={item.number}>
              <span className="standard-number">{item.number}</span><div className="standard-visual" aria-hidden="true">{item.visual}</div><h3>{item.title}</h3><p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="visible-route">
        <div className="visible-route-copy">
          <p className="section-kicker">A VISIBLE RELEASE ROUTE</p>
          <h2>Know what happens<br />before you press <em>send.</em></h2>
          <p>Apply, prepare metadata locally and receive a human readiness review now. Review the beta terms and understand the later launch boundary before sharing unreleased audio or paying a fee.</p>
          <div className="visible-route-links"><Link href="/release">Open the release workspace <Arrow /></Link><Link href="/legal">Read the legal and trust centre <Arrow /></Link></div>
        </div>
        <div className="release-stack" aria-label="NavaSound release preparation stack">
          <div className="release-sheet sheet-one"><small>STEP 01</small><strong>Artist application</strong><span>Fit · timing · contact</span></div>
          <div className="release-sheet sheet-two"><small>STEP 02</small><strong>Release brief</strong><span>Metadata · credits · rights</span></div>
          <div className="release-sheet sheet-three"><small>STEP 03</small><strong>Human review</strong><span>QC · readiness · route</span></div>
          <div className="stack-disc" aria-hidden="true"><i /><i /><i /></div>
        </div>
      </section>

      <section className="pricing-detail section-shell" id="pricing">
        <div className="pricing-heading">
          <p className="section-kicker">TARGET LAUNCH PRICING</p><h2>Pay for the release.<br /><em>Not the calendar.</em></h2>
          <p>Target Australian-dollar pricing for the future distribution service. Final inclusions, provider-dependent costs and terms will be confirmed before payment opens.</p>
          <Link className="text-link" href="/legal/refunds">Refund and cancellation position <Arrow /></Link>
        </div>
        <div className="pricing-cards">
          <article><div className="price-card-top"><span>SINGLE</span><small>ONE TRACK</small></div><div className="price-orbit" aria-hidden="true"><span>1</span></div><strong><sup>A$</sup>10</strong><ul><li>Target standard store delivery</li><li>Planned metadata readiness check</li><li>Planned royalty reporting</li><li>Planned standard support</li></ul><Link href="/apply">Apply with a single <Arrow /></Link></article>
          <article className="pricing-featured"><div className="price-card-top"><span>EP / ALBUM</span><small>MULTI-TRACK</small></div><div className="price-orbit" aria-hidden="true"><span>+</span></div><strong><sup>A$</sup>20</strong><ul><li>Target standard store delivery</li><li>Planned multi-track metadata check</li><li>Planned royalty reporting</li><li>Planned standard support</li></ul><Link href="/apply">Apply with a project <Arrow /></Link></article>
        </div>
      </section>

      <section className="process" id="how-it-works">
        <div className="process-intro"><p className="section-kicker">HOW IT WORKS</p><h2>Five clear moves.<br />Two <em>phases.</em></h2><p>Apply, Prepare and Review are available now. Deliver and Report activate only after provider integration, secure workflow testing and final terms.</p></div>
        <ol className="steps">{steps.map(({ title, phase, copy }, index) => <li key={title}><span>0{index + 1}</span><div><p className="step-phase">{phase}</p><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
      </section>

      <section className="platforms" aria-label="Potential future distribution destinations">
        <p className="section-kicker">POTENTIAL GLOBAL REACH</p>
        <div className="platform-list" aria-label="Spotify, Apple Music, YouTube Music, TikTok and Amazon Music"><span>Spotify</span><b>↗</b><span>Apple Music</span><b>↗</b><span>YouTube Music</span><b>↗</b><span>TikTok</span><b>↗</b><span>Amazon Music</span></div>
        <p className="platform-note">Illustrative destinations only. No store delivery is available yet; final DSP availability and eligibility depend on the selected provider agreement.</p>
      </section>

      <section className="proof section-shell">
        <div className="proof-heading"><p className="section-kicker">BUILT FOR SKEPTICS</p><h2>Plain terms.<br />Visible <em>boundaries.</em></h2></div>
        <div className="proof-grid">
          <Link href="/legal/privacy"><span>Privacy</span><strong>No hidden public form database.</strong><p>Current application and release tools stay on your device until you choose to send an email.</p><b>Read policy ↗</b></Link>
          <Link href="/legal/beta"><span>Rights</span><strong>Masters stay with the artist.</strong><p>Preparing a release brief does not transfer ownership or create a distribution agreement.</p><b>Read beta terms ↗</b></Link>
          <Link href="/legal/refunds"><span>Payments</span><strong>No checkout before the route is ready.</strong><p>Final service scope, provider costs and refund terms will be shown before paid launch.</p><b>Read position ↗</b></Link>
        </div>
      </section>

      <section className="faq section-shell">
        <div className="faq-grid">
          <div><p className="section-kicker">GOOD TO KNOW</p><h2>Questions,<br /><em>answered cleanly.</em></h2></div>
          <div>
            <details open><summary>Is NavaSound accepting releases now?<span aria-hidden="true">+</span></summary><p>NavaSound is accepting Release Readiness applications now. Artists can also prepare a local release brief and manually email it for readiness review without sending masters or artwork. This does not guarantee acceptance or reserve a release date. Store delivery starts only after provider integration is complete and the full release process passes testing.</p></details>
            <details><summary>Do I keep ownership of my music?<span aria-hidden="true">+</span></summary><p>Yes. Applying or preparing a brief does not transfer ownership. The planned standard distribution service does not take ownership of your masters, and you must control all rights required for any future delivery.</p></details>
            <details><summary>Does NavaSound take a royalty cut?<span aria-hidden="true">+</span></summary><p>The target standard launch offer is 0% NavaSound commission on DSP royalties. Final provider deductions, payout costs and optional services will be disclosed before distribution launches.</p></details>
            <details><summary>Why are payments and uploads disabled?<span aria-hidden="true">+</span></summary><p>NavaSound will not collect masters, artwork or money before provider integration, security controls and final agreements are ready and tested.</p></details>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-disc" aria-hidden="true"><span>N</span></div><p className="section-kicker">RELEASE READINESS BETA</p><h2>Prepare the release.<br /><em>Keep the rights.</em></h2><p>Apply for human readiness review and build your metadata brief locally now. Distribution, secure uploads and payments come later.</p>
        <div className="final-actions"><Link className="button button-light" href="/apply">Apply for early access <Arrow /></Link><Link className="text-link" href="/release">Prepare a release brief <Arrow /></Link></div>
      </section>

      <footer>
        <div className="footer-lead"><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>NavaSound</span></a><h3>Release readiness now.<br />Clearer distribution later.</h3></div>
        <div><strong>START</strong><Link href="/apply">Apply</Link><Link href="/release">Release workspace</Link><a href="#pricing">Pricing</a></div>
        <div><strong>TRUST</strong><Link href="/legal">Legal centre</Link><Link href="/legal/privacy">Privacy</Link><Link href="/legal/beta">Beta terms</Link></div>
        <div><strong>CONTACT</strong><a href="mailto:hello@navasound.com">hello@navasound.com</a><span>Queensland, Australia</span></div>
        <small>© 2026 NavaSound · Operated by Mehdi Emir ABN 62 351 619 456 · Release Readiness beta only; distribution, pricing and store availability remain subject to provider integration and final service terms.</small>
      </footer>
    </main>
  );
}
