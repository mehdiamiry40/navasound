import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://navasound.com"),
  title: "NavaSound — Release your music. Keep what’s yours.",
  description: "Clear music distribution for independent artists, with simple release fees, artist-owned masters and human review.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NavaSound — Release your music. Keep what’s yours.",
    description: "Clear pay-per-release music distribution for independent artists.",
    url: "https://navasound.com",
    siteName: "NavaSound",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NavaSound — Release your music. Keep what’s yours.",
    description: "Clear pay-per-release music distribution for independent artists.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
