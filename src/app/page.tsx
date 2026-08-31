import Link from "next/link";

const Arrow = () => <span aria-hidden="true">↗</span>;

const standards = [
  { number: "01", title: "Metadata that lands cleanly.", copy: "A structured release brief catches missing credits, inconsistent artist names and avoidable store issues before delivery.", className: "standard-yellow", visual: "META" },
  { number: "02", title: "Rights stay with the artist.", copy: "Your masters remain yours. NavaSound’s planned standard service takes no ownership and no standard DSP royalty commission.", className: "standard-blue", visual: "100%" },
  { number: "03", title: "A route you can actually see.", copy: "Clear status, practical checks and plain-English policies replace mystery dashboards and vague promises.", className: "standard-cream", visual: "LIVE" },
];

const steps = [
  ["Apply", "Tell us about the artist, release and target date."],
  ["Prepare", "Build a clean metadata brief before sending files."],
  ["Review", "We check rights, credits, artwork and store readiness."],
  ["Deliver", "Approved releases follow the final provider route."],
  ["Report", "Track status and royalties once the service is live."],
];

export default function Home() {
  return (
    <main id="main-content">
      <div className="announcement">
        <p>Founding-artist beta · Applications now open</p>
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
          <p className="eyebrow"><span /> Independent music distribution · Australia</p>
          <h1>Your release.<br /><em>Clearly handled.</em></h1>
          <p className="hero-lede">A more transparent route from finished master to streaming platforms—with clear release fees, artist-owned rights and human review.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/apply">Apply for early access <Arrow /></Link>
            <Link className="text-link" href="/release">Prepare a release <Arrow /></Link>
          </div>
          <div className="hero-assurance" aria-label="Current beta boundaries">
            <span>No payment yet</span><span>No master uploads yet</span><span>Private beta</span>
          </div>
        </div>
        <aside className="hero-index" aria-label="NavaSound service index">
          <div className="hero-index-number" aria-hidden="true">01</div>
          <div className="hero-index-grid">
            <div><small>SERVICE</small><strong>Digital music distribution</strong></div>
            <div><small>MODEL</small><strong>Pay per release</strong></div>
            <div><small>BASE</small><strong>Queensland, Australia</strong></div>
            <div><small>STATUS</small><strong>Founding beta</strong></div>
          </div>
          <p>Independent release infrastructure / 2026</p>
        </aside>
      </section>

      <section className="metrics-band" aria-label="NavaSound launch principles">
        <div><strong>0%</strong><span>planned standard DSP royalty commission</span></div>
        <div><strong>A$10</strong><span>planned single release fee</span></div>
        <div><strong>A$20</strong><span>planned EP or album fee</span></div>
        <div><strong>100%</strong><span>artist ownership of masters</span></div>
      </section>

      <section className="standards section-shell" id="standards">
        <div className="section-heading-row">
          <div><p className="section-kicker">THE NAVASOUND STANDARD</p><h2>Distribution should<br />feel <em>understandable.</em></h2></div>
          <p>Most release problems are not creative problems. They are missing data, unclear rights, hidden fees and silence between submission and release day. NavaSound is being designed around removing those gaps.</p>
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
          <p>Prepare metadata locally, review the beta terms and understand the launch boundary before sharing unreleased audio or paying a fee.</p>
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
          <p className="section-kicker">PLANNED LAUNCH PRICING</p><h2>Pay for the release.<br /><em>Not the calendar.</em></h2>
          <p>Straightforward Australian-dollar launch pricing. Final inclusions and provider-dependent costs will be confirmed before payment opens.</p>
          <Link className="text-link" href="/legal/refunds">Refund and cancellation position <Arrow /></Link>
        </div>
        <div className="pricing-cards">
          <article><div className="price-card-top"><span>SINGLE</span><small>ONE TRACK</small></div><div className="price-orbit" aria-hidden="true"><span>1</span></div><strong><sup>A$</sup>10</strong><ul><li>Planned standard store delivery</li><li>Metadata readiness check</li><li>Royalty reporting</li><li>Standard support</li></ul><Link href="/apply">Apply with a single <Arrow /></Link></article>
          <article className="pricing-featured"><div className="price-card-top"><span>EP / ALBUM</span><small>MULTI-TRACK</small></div><div className="price-orbit" aria-hidden="true"><span>+</span></div><strong><sup>A$</sup>20</strong><ul><li>Planned standard store delivery</li><li>Multi-track metadata check</li><li>Royalty reporting</li><li>Standard support</li></ul><Link href="/apply">Apply with a project <Arrow /></Link></article>
        </div>
      </section>

      <section className="process" id="how-it-works">
        <div className="process-intro"><p className="section-kicker">HOW IT WORKS</p><h2>Five clear moves.<br />One <em>release day.</em></h2><p>The final delivery step activates only after NavaSound signs a provider and completes testing.</p></div>
        <ol className="steps">{steps.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
      </section>

      <section className="platforms" aria-label="Planned distribution destinations">
        <p className="section-kicker">PLANNED GLOBAL REACH</p>
        <div className="platform-list" aria-label="Spotify, Apple Music, YouTube Music, TikTok and Amazon Music"><span>Spotify</span><b>↗</b><span>Apple Music</span><b>↗</b><span>YouTube Music</span><b>↗</b><span>TikTok</span><b>↗</b><span>Amazon Music</span></div>
        <p className="platform-note">Final store availability depends on the selected distribution agreement.</p>
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
            <details open><summary>Is NavaSound accepting releases now?<span aria-hidden="true">+</span></summary><p>NavaSound is forming a small founding-artist beta. Applications and release briefs are open; store delivery begins only after the backend contract and full release process pass testing.</p></details>
            <details><summary>Do I keep ownership of my music?<span aria-hidden="true">+</span></summary><p>Yes. The planned standard service does not take ownership of your masters. You must control all rights required for distribution.</p></details>
            <details><summary>Does NavaSound take a royalty cut?<span aria-hidden="true">+</span></summary><p>The planned standard offer is 0% commission on DSP royalties. Final provider deductions, payout costs and optional services will be disclosed before launch.</p></details>
            <details><summary>Why are payments and uploads disabled?<span aria-hidden="true">+</span></summary><p>Because NavaSound will not collect masters or money before its provider route, security controls and final agreements are ready.</p></details>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-disc" aria-hidden="true"><span>N</span></div><p className="section-kicker">FOUNDING ARTISTS WANTED</p><h2>Build the release.<br /><em>Keep the rights.</em></h2><p>Join NavaSound’s private beta and help shape a clearer kind of music distribution.</p>
        <div className="final-actions"><Link className="button button-light" href="/apply">Apply for early access <Arrow /></Link><Link className="text-link" href="/release">Prepare a release brief <Arrow /></Link></div>
      </section>

      <footer>
        <div className="footer-lead"><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>NavaSound</span></a><h3>Independent music distribution,<br />made understandable.</h3></div>
        <div><strong>START</strong><Link href="/apply">Apply</Link><Link href="/release">Release workspace</Link><a href="#pricing">Pricing</a></div>
        <div><strong>TRUST</strong><Link href="/legal">Legal centre</Link><Link href="/legal/privacy">Privacy</Link><Link href="/legal/beta">Beta terms</Link></div>
        <div><strong>CONTACT</strong><a href="mailto:hello@navasound.com">hello@navasound.com</a><span>Queensland, Australia</span></div>
        <small>© 2026 NavaSound · Operated by Mehdi Emir ABN 62 351 619 456 · Launch information subject to final service terms.</small>
      </footer>
    </main>
  );
}
