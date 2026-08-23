import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://navasound.com"),
  title: "NavaSound — Independent music, everywhere",
  description: "Straightforward music distribution for independent artists. A$10 singles, A$20 EPs and albums, with no royalty commission.",
  openGraph: {
    title: "NavaSound — Independent music, everywhere",
    description: "Simple pay-per-release music distribution. Keep 100% of your royalties.",
    url: "https://navasound.com",
    siteName: "NavaSound",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NavaSound — Your music. Everywhere it should be." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NavaSound — Independent music, everywhere",
    description: "Simple pay-per-release music distribution. Keep 100% of your royalties.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
