import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { createPageMetadata, SITE_URL } from "./_lib/metadata";
import "./globals.css";
import "./interior.css";

const displayFont = Fraunces({ variable: "--font-display", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: "NavaSound — Release preparation for independent artists",
    description:
      "NavaSound’s Release Readiness beta helps independent artists prepare release metadata locally and request human review.",
    path: "/",
  }),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
