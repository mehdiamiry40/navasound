import Link from "next/link";

const Arrow = () => <span aria-hidden="true">→</span>;
const Check = () => <span className="check" aria-hidden="true">✓</span>;

const steps = [
  ["01", "Apply", "Tell us about the artist, the release and your target date."],
  ["02", "Prepare", "Create a clean metadata brief before sharing any files."],
  ["03", "Review", "We check credits, rights and store readiness with you."],
  ["04", "Release", "Delivery begins only after the provider route is live and approved."],
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <div className="announcement-inner">
          <p><span aria-hidden="true" /> Founding-artist beta is now open</p>
          <Link href="/apply">Apply for early access <Arrow /></Link>
        </div>
      </div>

      <header className="site-header">
        <Link className="brand" href="#top" aria-label="NavaSound home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>NavaSound</span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="#why">Why NavaSound</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <Link href="/legal">Legal &amp; trust</Link>
          <Link className="nav-cta" href="/apply">Join the beta <Arrow /></Link>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="hero-pill"><span aria-hidden="true" /> Independent music distribution · Australia</p>
          <h1>Release your music.<br /><em>Keep what’s yours.</em></h1>
          <p className="hero-lede">
            A clearer route from finished master to streaming platforms—with simple
            release fees, artist-owned rights and a real person checking the details.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/apply">Join the founding beta <Arrow /></Link>
            <Link className="button button-secondary" href="/release">Prepare a release <Arrow /></Link>
          </div>
          <p className="hero-note">No payment or master upload is required to apply.</p>
        </div>

        <div className="product-stage" aria-label="Preview of the planned NavaSound release workflow">
          <div className="stage-orb stage-orb-one" aria-hidden="true" />
          <div className="stage-orb stage-orb-two" aria-hidden="true" />
          <div className="release-board">
            <div className="board-topbar">
              <div className="board-brand"><span className="brand-mark mini" aria-hidden="true"><i /><i /><i /></span><strong>NavaSound</strong></div>
              <span className="preview-label">Workflow preview</span>
              <div className="board-avatar" aria-hidden="true">YA</div>
            </div>
            <div className="board-body">
              <aside className="board-rail" aria-hidden="true">
                <span className="active">⌂</span><span>♪</span><span>✓</span><span>⋯</span>
              </aside>
              <div className="board-main">
                <div className="board-heading">
                  <div><small>RELEASE OVERVIEW</small><h2>Midnight Drive</h2><p>Your Artist · Single</p></div>
                  <span className="status-pill"><i /> In preparation</span>
                </div>
                <div className="release-summary">
                  <div className="cover-art" aria-hidden="true"><span>N</span><i /></div>
                  <div className="release-facts">
                    <div><small>Target date</small><strong>18 September</strong></div>
                    <div><small>Tracks</small><strong>1 track</strong></div>
                    <div><small>Ownership</small><strong>100% yours</strong></div>
                  </div>
                </div>
                <div className="route-progress" aria-label="Planned release stages">
                  <div className="complete"><span>1</span><strong>Brief</strong><small>Complete</small></div>
                  <div className="current"><span>2</span><strong>Review</strong><small>In progress</small></div>
                  <div><span>3</span><strong>Delivery</strong><small>Planned</small></div>
                  <div><span>4</span><strong>Live</strong><small>Planned</small></div>
                </div>
                <div className="board-cards">
                  <div className="readiness-card">
                    <div><strong>Release readiness</strong><span>3 of 4</span></div>
                    <p><Check /> Metadata complete</p><p><Check /> Rights confirmed</p><p><Check /> Artwork prepared</p><p className="pending"><span aria-hidden="true">○</span> Human review</p>
                  </div>
                  <div className="stores-card">
                    <div><strong>Planned destinations</strong><span>Provider dependent</span></div>
                    <div className="store-list"><b>Spotify</b><b>Apple Music</b><b>YouTube Music</b><b>+ more</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-band" aria-label="NavaSound launch principles">
        <div><strong>0%</strong><span>planned standard DSP royalty commission</span></div>
        <div><strong>A$10</strong><span>planned single release fee</span></div>
        <div><strong>A$20</strong><span>planned EP or album fee</span></div>
        <div><strong>100%</strong><span>artist ownership of masters</span></div>
      </section>

      <section className="standards section-shell" id="why">
        <div className="section-heading centered-heading">
          <p className="section-kicker">BUILT AROUND THE RELEASE</p>
          <h2>Less mystery. More music.</h2>
          <p>Everything is designed to make the work around release day easier to understand—from the first metadata check to final reporting.</p>
        </div>
        <div className="standards-grid">
          <article className="standard-card">
            <div className="feature-visual checklist-visual" aria-hidden="true">
              <div><span>Track title</span><b>Ready</b></div><div><span>Songwriters</span><b>Ready</b></div><div><span>Artist IDs</span><b>Check</b></div>
            </div>
            <p className="card-kicker">PREPARE</p><h3>Metadata that lands cleanly.</h3><p>A structured release brief catches missing credits, inconsistent artist names and avoidable store issues early.</p>
          </article>
          <article className="standard-card featured-card">
            <div className="feature-visual ownership-visual" aria-hidden="true"><strong>100%</strong><span>Your masters.<br />Your rights.</span></div>
            <p className="card-kicker">OWN</p><h3>Your music stays yours.</h3><p>NavaSound’s planned standard service takes no ownership and no standard commission from DSP royalties.</p>
          </article>
          <article className="standard-card">
            <div className="feature-visual status-visual" aria-hidden="true">
              <span className="done">Brief <b>✓</b></span><i /><span className="now">Review <b>2</b></span><i /><span>Release <b>3</b></span>
            </div>
            <p className="card-kicker">FOLLOW</p><h3>A route you can actually see.</h3><p>Clear stages, practical checks and plain-English policies replace mystery dashboards and vague promises.</p>
          </article>
        </div>
      </section>

      <section className="visible-route" id="how-it-works">
        <div className="visible-route-copy">
          <p className="section-kicker">A CLEAR RELEASE ROUTE</p>
          <h2>Know the next step.<br />Every step.</h2>
          <p>Start with a local release brief. We only ask for masters, artwork or payment after the provider route, security controls and final agreement are ready.</p>
          <div className="visible-route-links">
            <Link href="/release">Open the release workspace <Arrow /></Link>
            <Link href="/legal">Read the legal &amp; trust centre <Arrow /></Link>
          </div>
        </div>
        <ol className="steps">
          {steps.map(([number, title, copy], index) => (
            <li className={index === 0 ? "active" : ""} key={title}>
              <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><b aria-hidden="true">{index === 0 ? "✓" : "→"}</b>
            </li>
          ))}
        </ol>
      </section>

      <section className="pricing-detail section-shell" id="pricing">
        <div className="section-heading centered-heading pricing-heading">
          <p className="section-kicker">PLANNED LAUNCH PRICING</p>
          <h2>Pay per release.<br />Not per year.</h2>
          <p>Simple Australian-dollar launch pricing, with final inclusions and provider costs confirmed before payment opens.</p>
        </div>
        <div className="pricing-cards">
          <article>
            <div className="price-card-top"><span>Single</span><small>1 track</small></div>
            <strong><sup>A$</sup>10</strong><p>One straightforward release fee.</p>
            <ul><li><Check /> Planned standard store delivery</li><li><Check /> Metadata readiness check</li><li><Check /> Royalty reporting</li><li><Check /> Standard support</li></ul>
            <Link className="button button-secondary" href="/apply">Apply with a single <Arrow /></Link>
          </article>
          <article className="pricing-featured">
            <div className="price-card-top"><span>EP / Album</span><small>Multi-track</small></div>
            <strong><sup>A$</sup>20</strong><p>One fee for a larger project.</p>
            <ul><li><Check /> Planned standard store delivery</li><li><Check /> Multi-track metadata check</li><li><Check /> Royalty reporting</li><li><Check /> Standard support</li></ul>
            <Link className="button button-primary" href="/apply">Apply with a project <Arrow /></Link>
          </article>
        </div>
        <p className="pricing-note">Planned pricing is subject to the final distribution agreement. <Link href="/legal/refunds">Read the current payment position →</Link></p>
      </section>

      <section className="platforms" aria-label="Planned distribution destinations">
        <p className="section-kicker">DESIGNED FOR GLOBAL DELIVERY</p>
        <h2>Your sound, ready for the places people listen.</h2>
        <div className="platform-list" aria-label="Spotify, Apple Music, YouTube Music, TikTok and Amazon Music">
          <span>Spotify</span><span>Apple Music</span><span>YouTube Music</span><span>TikTok</span><span>Amazon Music</span>
        </div>
        <p className="platform-note">Final store availability depends on the selected distribution agreement.</p>
      </section>

      <section className="proof section-shell">
        <div className="section-heading centered-heading proof-heading">
          <p className="section-kicker">TRUST, BEFORE THE TRANSACTION</p>
          <h2>Clear boundaries from day one.</h2>
          <p>The founding beta is deliberately simple: understand the route, prepare your release and keep sensitive files on your device.</p>
        </div>
        <div className="proof-grid">
          <Link href="/legal/privacy"><span>Privacy</span><strong>Your form data stays local.</strong><p>Nothing is stored by NavaSound until you choose to send an email.</p><b><Arrow /></b></Link>
          <Link href="/legal/beta"><span>Rights</span><strong>Masters stay with the artist.</strong><p>A release brief does not transfer ownership or create an agreement.</p><b><Arrow /></b></Link>
          <Link href="/legal/refunds"><span>Payments</span><strong>No checkout before launch.</strong><p>Scope, provider costs and refund terms come before payment.</p><b><Arrow /></b></Link>
        </div>
      </section>

      <section className="faq section-shell">
        <div className="faq-grid">
          <div><p className="section-kicker">GOOD TO KNOW</p><h2>Questions,<br />answered simply.</h2><p>Still unsure? Email <a href="mailto:hello@navasound.com">hello@navasound.com</a>.</p></div>
          <div>
            <details open><summary>Is NavaSound accepting releases now?<span>+</span></summary><p>NavaSound is forming a small founding-artist beta. Applications and release briefs are open; store delivery begins only after the backend contract and full release process pass testing.</p></details>
            <details><summary>Do I keep ownership of my music?<span>+</span></summary><p>Yes. The planned standard service does not take ownership of your masters. You must control all rights required for distribution.</p></details>
            <details><summary>Does NavaSound take a royalty cut?<span>+</span></summary><p>The planned standard offer is 0% commission on DSP royalties. Final provider deductions, payout costs and optional services will be disclosed before launch.</p></details>
            <details><summary>Why are payments and uploads disabled?<span>+</span></summary><p>Because NavaSound will not collect masters or money before its provider route, security controls and final agreements are ready.</p></details>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <p className="section-kicker">FOUNDING ARTISTS WANTED</p>
        <h2>Your next release<br />can start clearer.</h2>
        <p>Join the private beta and help shape a more transparent kind of music distribution.</p>
        <div className="final-actions"><Link className="button button-light" href="/apply">Apply for early access <Arrow /></Link><Link className="button button-ghost" href="/release">Prepare a release brief <Arrow /></Link></div>
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

