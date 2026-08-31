import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { createPageMetadata, SITE_URL } from "./_lib/metadata";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: "NavaSound — Your release, clearly handled",
    description:
      "Transparent music distribution for independent artists. Clear release fees, artist-owned masters and a more visible route to release day.",
    path: "/",
  }),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
