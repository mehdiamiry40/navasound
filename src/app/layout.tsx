import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { createPageMetadata, SITE_URL } from "./_lib/metadata";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: "NavaSound Release Readiness — Your release, clearly handled",
    description:
      "The available-now NavaSound Release Readiness beta offers applications, local metadata preparation and human review. Distribution comes after provider integration.",
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
