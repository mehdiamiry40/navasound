import Link from "next/link";

const Arrow = () => <span aria-hidden="true">→</span>;
const Check = () => <span className="check" aria-hidden="true">✓</span>;

const releaseSteps = [
  ["01", "Apply", "Send the artist name, release type and target date."],
  ["02", "Prepare", "Download a metadata brief. It stays on your device."],
  ["03", "Review", "A person checks the credits, rights and store requirements."],
  ["04", "Agree", "Confirm the provider, timing and terms before any upload."],
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <div className="announcement-inner">
          <p>Founding artist beta is open</p>
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
          <h1>Prepare your release.<br />Keep your masters.</h1>
          <p className="hero-lede">
            NavaSound is building an Australian distribution service for independent
            artists. Apply with the release details. We ask for audio and payment only
            after we confirm the delivery route and terms.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/apply">Apply to the beta</Link>
            <Link className="button button-secondary" href="/release">Build a release brief</Link>
          </div>
          <p className="hero-note"><Link href="/legal/beta">Read the beta terms</Link> · Keep your masters on your device for now</p>
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
          <p className="section-kicker">WHAT NAVASOUND DOES</p>
          <h2>Check the release<br />before delivery.</h2>
          <p>NavaSound reviews the details that can hold up a release: artist names, credits, rights and store metadata.</p>
        </div>
        <div className="service-list">
          <article><span>01</span><h3>Fix the metadata.</h3><p>We flag missing credits, naming mismatches and store fields before delivery.</p></article>
          <article><span>02</span><h3>Keep your masters.</h3><p>You keep ownership. The planned standard service takes 0% commission on DSP royalties.</p></article>
          <article><span>03</span><h3>Know the next step.</h3><p>Each release gets a human review. NavaSound confirms the provider and terms before asking for files or payment.</p></article>
        </div>
      </section>

      <section className="visible-route" id="how-it-works">
        <div className="visible-route-copy">
          <p className="section-kicker">HOW THE BETA WORKS</p>
          <h2>Apply first.<br />Send files later.</h2>
          <p>Start with the release details. NavaSound asks for masters, artwork and payment only after it confirms the provider and final terms.</p>
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
          <p className="section-kicker">PLANNED LAUNCH PRICES</p>
          <h2>A$10 for a single.<br />A$20 for an EP or album.</h2>
          <p>Checkout is not open. NavaSound will confirm the final service and any provider costs before you pay.</p>
        </div>
        <div className="pricing-cards">
          <article>
            <div className="price-card-top"><span>Single</span><small>One track</small></div>
            <strong><sup>A$</sup>10</strong>
            <ul><li><Check /> Planned store delivery</li><li><Check /> Metadata check</li><li><Check /> Royalty reports</li><li><Check /> Email support</li></ul>
            <Link className="button button-secondary" href="/apply">Apply with a single</Link>
          </article>
          <article className="pricing-featured">
            <div className="price-card-top"><span>EP or album</span><small>Multi-track</small></div>
            <strong><sup>A$</sup>20</strong>
            <ul><li><Check /> Planned store delivery</li><li><Check /> Multi-track metadata check</li><li><Check /> Royalty reports</li><li><Check /> Email support</li></ul>
            <Link className="button button-primary" href="/apply">Apply with an EP or album</Link>
          </article>
        </div>
        <p className="pricing-note">Checkout is closed. <Link href="/legal/refunds">Read the payment terms →</Link></p>
      </section>

      <section className="proof section-shell">
        <div className="section-heading proof-heading">
          <p className="section-kicker">BEFORE YOU APPLY</p>
          <h2>What happens to your data and music.</h2>
        </div>
        <div className="proof-grid">
          <Link href="/legal/privacy"><span>Privacy</span><strong>The forms run on your device.</strong><p>NavaSound receives application data only when you send the prepared email.</p><b><Arrow /></b></Link>
          <Link href="/legal/beta"><span>Rights</span><strong>You keep your masters.</strong><p>Creating a release brief does not transfer ownership or create a contract.</p><b><Arrow /></b></Link>
          <Link href="/legal/refunds"><span>Payments</span><strong>Checkout is closed.</strong><p>NavaSound will publish the service, fees and refund terms before taking payment.</p><b><Arrow /></b></Link>
        </div>
      </section>

      <section className="faq section-shell">
        <div className="faq-grid">
          <div><p className="section-kicker">QUESTIONS</p><h2>What artists ask us.</h2><p>Email <a href="mailto:hello@navasound.com">hello@navasound.com</a> if your question is not here.</p></div>
          <div>
            <details open><summary>Is NavaSound accepting releases now?<span>+</span></summary><p>We are accepting applications and release briefs for a small founding artist beta. Store delivery will start only after the distribution agreement and release process are tested.</p></details>
            <details><summary>Do I keep ownership of my music?<span>+</span></summary><p>Yes. The planned standard service does not take ownership of your masters. You must control all rights required for distribution.</p></details>
            <details><summary>Does NavaSound take a royalty cut?<span>+</span></summary><p>The planned standard service takes 0% commission on DSP royalties. We will show provider deductions, payout costs and optional service fees before you agree.</p></details>
            <details><summary>Why are payments and uploads disabled?<span>+</span></summary><p>The provider route, security controls and agreements are still being finalised. NavaSound will not collect masters or money before they are ready.</p></details>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <h2>Have a release<br />in mind?</h2>
        <p>Apply with the basic details. Keep the files for now.</p>
        <div className="final-actions"><Link className="button button-light" href="/apply">Apply to the beta</Link><Link className="button button-ghost" href="/release">Build a release brief</Link></div>
      </section>

      <footer>
        <div className="footer-lead">
          <Link className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>NavaSound</span></Link>
          <h3>Music distribution for<br />independent artists in Australia.</h3>
        </div>
        <div><strong>START</strong><Link href="/apply">Apply</Link><Link href="/release">Release workspace</Link><a href="#pricing">Pricing</a></div>
        <div><strong>TRUST</strong><Link href="/legal">Legal centre</Link><Link href="/legal/privacy">Privacy</Link><Link href="/legal/beta">Beta terms</Link></div>
        <div><strong>CONTACT</strong><a href="mailto:hello@navasound.com">hello@navasound.com</a><span>Queensland, Australia</span></div>
        <small>© 2026 NavaSound · Operated by Mehdi Emir ABN 62 351 619 456 · Launch information subject to final service terms.</small>
      </footer>
    </main>
  );
}
