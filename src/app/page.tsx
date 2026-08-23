const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NavaSound home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>NavaSound</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#pricing">Pricing</a>
          <a href="#how-it-works">How it works</a>
          <a className="nav-cta" href="mailto:hello@navasound.com?subject=NavaSound%20founding%20artist">
            Join the beta <Arrow />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Independent by design · Australia</p>
          <h1>Your music.<br />Everywhere it<br /><em>should be.</em></h1>
          <p className="hero-lede">
            Straightforward music distribution for independent artists. No annual
            plan. No royalty commission. Just one clear fee per release.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:hello@navasound.com?subject=NavaSound%20founding%20artist">
              Apply for early access <Arrow />
            </a>
            <a className="text-link" href="#pricing">See launch pricing <span aria-hidden="true">↓</span></a>
          </div>
          <p className="microcopy">Founding-artist beta · Limited places · Launching soon</p>
        </div>

        <div className="hero-art" aria-label="Abstract record and soundwave artwork">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="record">
            <div className="record-label"><span>NAVA</span><small>001</small></div>
          </div>
          <div className="sound-bars" aria-hidden="true">
            {[42, 76, 55, 90, 64, 34, 70, 48, 83, 58, 30].map((height, index) => (
              <i key={index} style={{ height }} />
            ))}
          </div>
          <div className="now-playing">
            <span className="play-dot">▶</span>
            <span><small>NOW BUILDING</small><strong>The future of independent</strong></span>
          </div>
        </div>
      </section>

      <section className="price-strip" id="pricing" aria-label="Launch pricing">
        <div><small>SINGLE</small><strong><sup>A$</sup>10</strong><span>one track</span></div>
        <div className="price-divider" />
        <div><small>EP / ALBUM</small><strong><sup>A$</sup>20</strong><span>multi-track</span></div>
        <p><b>0%</b> royalty commission<br /><span>You keep what your music earns.</span></p>
      </section>

      <section className="manifesto section-shell">
        <p className="section-kicker">01 · WHY NAVASOUND</p>
        <div>
          <h2>Distribution should feel<br />less like a <em>deal</em>.</h2>
          <p className="large-copy">
            NavaSound is being built for independent artists who want clear costs,
            ownership of their work and human help when it matters.
          </p>
        </div>
        <aside className="manifesto-note">
          <span>OUR PROMISE</span>
          <p>No confusing tiers. No annual renewal just to keep releasing. No share of your standard streaming royalties.</p>
        </aside>
      </section>

      <section className="feature-grid section-shell" aria-label="NavaSound benefits">
        <article className="feature-card feature-purple">
          <span className="feature-number">01</span>
          <div className="feature-icon" aria-hidden="true">◎</div>
          <h3>Release once.<br />Reach worldwide.</h3>
          <p>Prepare one release for delivery to leading music and social platforms through NavaSound&apos;s launch distribution network.</p>
        </article>
        <article className="feature-card feature-lime">
          <span className="feature-number">02</span>
          <div className="feature-icon" aria-hidden="true">↗</div>
          <h3>Keep your rights.<br />Keep your royalties.</h3>
          <p>You keep ownership of your masters and 100% of standard DSP royalties. NavaSound charges the release fee upfront.</p>
        </article>
        <article className="feature-card feature-paper">
          <span className="feature-number">03</span>
          <div className="feature-icon equalizer-icon" aria-hidden="true"><i /><i /><i /><i /></div>
          <h3>See what&apos;s<br />really happening.</h3>
          <p>Clear reporting and release status, with practical support from people who understand independent music.</p>
        </article>
      </section>

      <section className="process section-shell" id="how-it-works">
        <div className="process-heading">
          <p className="section-kicker">02 · HOW IT WORKS</p>
          <h2>From finished track<br />to <em>release day.</em></h2>
        </div>
        <ol className="steps">
          <li><span>1</span><div><h3>Send your release</h3><p>Upload final audio, artwork and metadata through the NavaSound release workflow.</p></div></li>
          <li><span>2</span><div><h3>We check the details</h3><p>Every submission is checked for common metadata, artwork and rights issues before delivery.</p></div></li>
          <li><span>3</span><div><h3>Choose your date</h3><p>Set a release date with enough lead time for store delivery, review and pitching preparation.</p></div></li>
          <li><span>4</span><div><h3>Track your results</h3><p>Follow release status and royalties through clear reporting once the launch service is live.</p></div></li>
        </ol>
      </section>

      <section className="platforms" aria-label="Planned distribution destinations">
        <p className="section-kicker">BUILT TO REACH LISTENERS ON</p>
        <div className="platform-list" aria-label="Spotify, Apple Music, YouTube Music, TikTok, Amazon Music and more">
          <span>Spotify</span><b>·</b><span>Apple Music</span><b>·</b><span>YouTube Music</span><b>·</b><span>TikTok</span><b>·</b><span>Amazon Music</span><b>·</b><span>and more</span>
        </div>
        <p className="platform-note">Final store availability will be confirmed before the public launch.</p>
      </section>

      <section className="pricing-detail section-shell">
        <div className="pricing-heading">
          <p className="section-kicker">03 · LAUNCH PRICING</p>
          <h2>Pay for the release.<br /><em>Not the calendar.</em></h2>
          <p>Simple Australian-dollar pricing for standard releases. No annual distribution subscription.</p>
        </div>
        <div className="pricing-cards">
          <article>
            <div><span>SINGLE</span><small>ONE TRACK</small></div>
            <strong><sup>A$</sup>10</strong>
            <ul><li>Standard store delivery</li><li>Metadata check</li><li>Royalty reporting</li><li>Standard support</li></ul>
            <a href="mailto:hello@navasound.com?subject=NavaSound%20single%20release">Join the beta <Arrow /></a>
          </article>
          <article className="pricing-featured">
            <div><span>EP / ALBUM</span><small>MULTI-TRACK</small></div>
            <strong><sup>A$</sup>20</strong>
            <ul><li>Standard store delivery</li><li>Metadata check</li><li>Royalty reporting</li><li>Standard support</li></ul>
            <a href="mailto:hello@navasound.com?subject=NavaSound%20album%20release">Join the beta <Arrow /></a>
          </article>
        </div>
        <p className="pricing-fineprint">Prices are launch pricing in AUD. GST treatment and any optional add-on services will be clearly stated before payment.</p>
      </section>

      <section className="faq section-shell">
        <p className="section-kicker">04 · GOOD TO KNOW</p>
        <div className="faq-grid">
          <h2>Small print,<br /><em>plain English.</em></h2>
          <div>
            <details open><summary>Is NavaSound accepting releases now?<span>+</span></summary><p>NavaSound is currently forming a small founding-artist beta. Store delivery will begin only after the distribution backend, terms and release process have passed testing.</p></details>
            <details><summary>Do I keep ownership of my music?<span>+</span></summary><p>Yes. NavaSound&apos;s standard distribution service will not take ownership of your masters. You must control the rights needed to distribute every release you submit.</p></details>
            <details><summary>Does NavaSound take a royalty cut?<span>+</span></summary><p>The planned standard launch offer is 0% commission on DSP royalties. Optional services, if introduced, will be priced separately and agreed before use.</p></details>
            <details><summary>How early should I submit?<span>+</span></summary><p>A final lead-time policy will be published before launch. Plan for at least several weeks so there is time for review, delivery and any corrections.</p></details>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-disc" aria-hidden="true"><span>N</span></div>
        <p className="section-kicker">FOUNDING ARTISTS WANTED</p>
        <h2>Bring the music.<br /><em>We&apos;ll build the route.</em></h2>
        <p>Join NavaSound&apos;s private beta and help shape a clearer kind of distribution.</p>
        <a className="button button-light" href="mailto:hello@navasound.com?subject=NavaSound%20founding%20artist">Apply for early access <Arrow /></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>NavaSound</span></a>
        <p>Independent music distribution.<br />Built in Australia.</p>
        <div><a href="mailto:hello@navasound.com">hello@navasound.com</a><a href="#pricing">Pricing</a><a href="#how-it-works">How it works</a></div>
        <small>© 2026 NavaSound. Launch information subject to final service terms.</small>
      </footer>
    </main>
  );
}
