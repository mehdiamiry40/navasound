"use client";

import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <title>NavaSound — Something went wrong</title>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <main id="main-content" className="state-page">
          <section className="state-shell" aria-labelledby="state-title">
            <p className="state-code">500 / Playback interrupted</p>
            <h1 id="state-title">Something went quiet.</h1>
            <p>
              NavaSound could not load. Try again, or return home and start from a
              clean page.
            </p>
            <div className="state-actions">
              <button className="button button-primary" type="button" onClick={retry}>
                Try again
              </button>
              <Link className="text-link" href="/">Return home</Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
