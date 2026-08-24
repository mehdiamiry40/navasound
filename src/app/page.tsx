import type { Metadata } from "next";
import Link from "next/link";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "NavaSound | Music distribution for independent artists",
  description:
    "NavaSound is preparing an Australian music distribution service for independent artists. Apply to the founding artist beta with release details only.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "NavaSound | Music distribution for independent artists",
    description:
      "Apply to NavaSound's founding artist beta with your release details. Keep your masters on your device for now.",
    url: "https://navasound.com",
    siteName: "NavaSound",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NavaSound | Music distribution for independent artists",
    description:
      "Apply to NavaSound's founding artist beta with your release details. Keep your masters on your device for now.",
  },
};

const process = [
  ["01", "Apply", "Send the artist name, release type and target date."],
  ["02", "Review", "A person checks the metadata, ownership and release timing."],
  ["03", "Confirm", "We send the provider route, price and final terms in writing."],
  ["04", "Deliver", "Files and payment are requested only after both sides agree."],
];

const pricing = [
  ["Single", "A$10"],
  ["EP or album", "A$20"],
  ["DSP royalty commission", "0% planned"],
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="NavaSound home">
          <span>NavaSound</span>
          <small>NS / 001</small>
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#pricing">Pricing</a>
          <Link href="/legal">Legal</Link>
          <Link className={styles.navAction} href="/apply">Apply</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.catalogueLine}>
            <span>NS / 001</span>
            <span>Founding artist beta / Australia</span>
          </div>
          <h1>
            Prepare your release. <span>Keep your masters.</span>
          </h1>
          <p className={styles.lede}>
            NavaSound is preparing a music distribution service for independent
            artists in Australia. Start with the release details. We ask for files
            and payment only after the route, price and terms are confirmed.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/apply">
              Apply to the beta <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.secondaryAction} href="/release">
              Prepare a release brief
            </Link>
          </div>
          <p className={styles.availability}>
            Applications are open. No uploads or payments on this website.
          </p>
        </div>

        <aside className={styles.catalogueMark} aria-label="NavaSound catalogue 001">
          <span>NS</span>
          <strong>001</strong>
          <small>Founding artist beta</small>
        </aside>
      </section>

      <section className={styles.ruledSection} id="process">
        <div className={styles.sectionIntro}>
          <p>A / Process</p>
          <h2>How a release moves.</h2>
        </div>
        <div className={styles.rows}>
          {process.map(([number, title, description]) => (
            <div className={styles.processRow} key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ruledSection} id="pricing">
        <div className={styles.sectionIntro}>
          <p>B / Planned pricing</p>
          <h2>Launch prices.</h2>
        </div>
        <div>
          <div className={styles.priceRows}>
            {pricing.map(([item, price]) => (
              <div className={styles.priceRow} key={item}>
                <span>{item}</span>
                <strong>{price}</strong>
              </div>
            ))}
          </div>
          <p className={styles.priceNote}>
            All prices are in AUD and remain planned until confirmed in writing.
            Provider deductions, payout timing and optional fees will be disclosed
            before payment. Your masters remain yours. Checkout is not open.
          </p>
        </div>
      </section>

      <section className={styles.applyBand}>
        <div>
          <p>C / Applications</p>
          <h2>Have a release ready?</h2>
        </div>
        <Link className={styles.primaryAction} href="/apply">
          Tell us about it <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <footer className={styles.footer}>
        <div>
          <Link className={styles.footerBrand} href="/">NavaSound</Link>
          <a href="mailto:hello@navasound.com">hello@navasound.com</a>
        </div>
        <nav aria-label="Legal links">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/beta">Beta terms</Link>
          <Link href="/legal/refunds">Refunds</Link>
        </nav>
        <p>Mehdi Emir / ABN 62 351 619 456 / Queensland, Australia</p>
      </footer>
    </main>
  );
}
