import Link from "next/link";

const Arrow = () => <span aria-hidden="true">→</span>;
const Check = () => <span className="check" aria-hidden="true">✓</span>;

const releaseSteps = [
  ["01", "Apply", "Share the artist, release type and target date."],
  ["02", "Prepare", "Build a clean metadata brief on your own device."],
  ["03", "Review", "Check credits, rights and readiness with a real person."],
  ["04", "Release", "Move forward only when the provider route is ready."],
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <div className="announcement-inner">
          <p>Founding-artist beta is open</p>
          <Link href="/apply">Learn more <Arrow /></Link>
        </div>
      </div>

      <header className="site-header">
        <Link className="brand" href="#top" aria-label="NavaSound home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>NavaSound</span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="#service">Service</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <Link href="/legal">Trust</Link>
          <Link className="nav-cta" href="/apply">Apply now</Link>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>Everything around your<br />release, handled.</h1>
          <p className="hero-lede">
            Prepare the details, understand the costs and keep control of your music.
            NavaSound is a clearer route to release day for independent artists.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/apply">Apply for early access</Link>
            <Link className="button button-secondary" href="/release">Prepare a release</Link>
          </div>
          <p className="hero-note"><Link href="/legal/beta">Read the beta terms</Link> · No payment or master upload required</p>
        </div>

        <div className="product-stage" aria-label="Preview of the planned NavaSound release workflow">
          <div className="stage-tabs" aria-hidden="true"><span className="active">Prepare</span><span>Review</span><span>Release</span></div>
          <div className="release-board">
            <div className="board-topbar">
              <div className="board-brand"><span className="brand-mark mini" aria-hidden="true"><i /><i /><i /></span><strong>Release overview</strong></div>
              <span className="preview-label">Example workflow</span>
              <div className="board-avatar" aria-hidden="true">YA</div>
            </div>
            <div className="board-content">
              <div className="release-summary">
                <div className="cover-art" aria-hidden="true"><span>N</span><i /></div>
                <div className="release-identity"><small>SINGLE</small><h2>Midnight Drive</h2><p>Your Artist</p></div>
                <span className="status-pill"><i /> In preparation</span>
              </div>
              <div className="route-progress" aria-label="Planned release stages">
                <div className="complete"><span>✓</span><strong>Brief</strong><small>Complete</small></div>
                <div className="current"><span>2</span><strong>Review</strong><small>In progress</small></div>
                <div><span>3</span><strong>Delivery</strong><small>Planned</small></div>
                <div><span>4</span><strong>Live</strong><small>Planned</small></div>
              </div>
              <div className="board-foot">
                <div><Check /><span><strong>Rights stay with you</strong><small>Your masters remain artist-owned.</small></span></div>
                <div><Check /><span><strong>Nothing uploaded yet</strong><small>This preview does not collect files.</small></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="platform-strip" aria-label="Planned distribution destinations">
        <p>Planned distribution to</p>
        <div><span>Spotify</span><span>Apple Music</span><span>YouTube Music</span><span>TikTok</span><span>Amazon Music</span></div>
        <small>Final availability depends on the selected provider.</small>
      </section>

      <section className="service section-shell" id="service">
        <div className="section-heading">
          <p className="section-kicker">THE NAVASOUND SERVICE</p>
          <h2>Less mystery.<br />More music.</h2>
          <p>A simple release process built around the things that matter: accurate details, clear rights and visible next steps.</p>
        </div>
        <div className="service-list">
          <article><span>01</span><h3>Prepare it properly.</h3><p>Catch missing credits, inconsistent artist names and store-readiness issues before delivery.</p></article>
          <article><span>02</span><h3>Keep what is yours.</h3><p>Your masters remain yours. The planned standard service takes no ownership and no standard DSP royalty commission.</p></article>
          <article><span>03</span><h3>See what happens next.</h3><p>Follow a clear release route with plain-English policies, practical checks and human review.</p></article>
        </div>
      </section>

      <section className="visible-route" id="how-it-works">
        <div className="visible-route-copy">
          <p className="section-kicker">HOW IT WORKS</p>
          <h2>Four clear steps.<br />One release.</h2>
          <p>Begin with information, not files. NavaSound only requests masters, artwork or payment after the provider route and final agreement are ready.</p>
          <div className="visible-route-links">
            <Link href="/release">Open the release workspace <Arrow /></Link>
            <Link href="/legal">Visit the legal and trust centre <Arrow /></Link>
          </div>
        </div>
        <ol className="steps">
          {releaseSteps.map(([number, title, copy]) => (
            <li key={title}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="pricing-detail section-shell" id="pricing">
        <div className="section-heading pricing-heading">
          <p className="section-kicker">PLANNED PRICING</p>
          <h2>Pay for the release.<br />Not the calendar.</h2>
          <p>Simple Australian-dollar launch pricing. Final inclusions and provider-dependent costs will be confirmed before payment opens.</p>
        </div>
        <div className="pricing-cards">
          <article>
            <div className="price-card-top"><span>Single</span><small>One track</small></div>
            <strong><sup>A$</sup>10</strong>
            <ul><li><Check /> Planned store delivery</li><li><Check /> Metadata readiness check</li><li><Check /> Royalty reporting</li><li><Check /> Standard support</li></ul>
            <Link className="button button-secondary" href="/apply">Apply with a single</Link>
          </article>
          <article className="pricing-featured">
            <div className="price-card-top"><span>EP or album</span><small>Multi-track</small></div>
            <strong><sup>A$</sup>20</strong>
            <ul><li><Check /> Planned store delivery</li><li><Check /> Multi-track metadata check</li><li><Check /> Royalty reporting</li><li><Check /> Standard support</li></ul>
            <Link className="button button-primary" href="/apply">Apply with a project</Link>
          </article>
        </div>
        <p className="pricing-note">No checkout is currently active. <Link href="/legal/refunds">Read the payment position →</Link></p>
      </section>

      <section className="proof section-shell">
        <div className="section-heading proof-heading">
          <p className="section-kicker">CLEAR FROM THE START</p>
          <h2>Trust before transaction.</h2>
        </div>
        <div className="proof-grid">
          <Link href="/legal/privacy"><span>Privacy</span><strong>Your form data stays local.</strong><p>Nothing reaches NavaSound until you choose to send an email.</p><b><Arrow /></b></Link>
          <Link href="/legal/beta"><span>Rights</span><strong>Your masters stay yours.</strong><p>A release brief does not transfer ownership or create an agreement.</p><b><Arrow /></b></Link>
          <Link href="/legal/refunds"><span>Payments</span><strong>No checkout before launch.</strong><p>Scope, provider costs and refund terms come before payment.</p><b><Arrow /></b></Link>
        </div>
      </section>

      <section className="faq section-shell">
        <div className="faq-grid">
          <div><p className="section-kicker">QUESTIONS</p><h2>Good to know.</h2><p>Email <a href="mailto:hello@navasound.com">hello@navasound.com</a> if you need anything else.</p></div>
          <div>
            <details open><summary>Is NavaSound accepting releases now?<span>+</span></summary><p>Applications and release briefs are open for a small founding-artist beta. Store delivery begins only after the backend contract and full release process pass testing.</p></details>
            <details><summary>Do I keep ownership of my music?<span>+</span></summary><p>Yes. The planned standard service does not take ownership of your masters. You must control all rights required for distribution.</p></details>
            <details><summary>Does NavaSound take a royalty cut?<span>+</span></summary><p>The planned standard offer is 0% commission on DSP royalties. Provider deductions, payout costs and optional services will be disclosed before launch.</p></details>
            <details><summary>Why are payments and uploads disabled?<span>+</span></summary><p>NavaSound will not collect masters or money before its provider route, security controls and final agreements are ready.</p></details>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <h2>Make the next release<br />feel simpler.</h2>
        <p>Join the private founding-artist beta.</p>
        <div className="final-actions"><Link className="button button-light" href="/apply">Apply for early access</Link><Link className="button button-ghost" href="/release">Prepare a release</Link></div>
      </section>

      <footer>
        <div className="footer-lead">
          <Link className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>NavaSound</span></Link>
          <h3>Independent music distribution,<br />made understandable.</h3>
        </div>
        <div><strong>START</strong><Link href="/apply">Apply</Link><Link href="/release">Release workspace</Link><a href="#pricing">Pricing</a></div>
        <div><strong>TRUST</strong><Link href="/legal">Legal centre</Link><Link href="/legal/privacy">Privacy</Link><Link href="/legal/beta">Beta terms</Link></div>
        <div><strong>CONTACT</strong><a href="mailto:hello@navasound.com">hello@navasound.com</a><span>Queensland, Australia</span></div>
        <small>© 2026 NavaSound · Operated by Mehdi Emir ABN 62 351 619 456 · Launch information subject to final service terms.</small>
      </footer>
    </main>
  );
}

