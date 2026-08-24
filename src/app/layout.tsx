import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://navasound.com"),
  title: "NavaSound | Music distribution for independent artists",
  description: "NavaSound is building an Australian music distribution service for independent artists. The founding beta starts with release details only.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NavaSound | Music distribution for independent artists",
    description: "Apply to NavaSound's founding artist beta with your release details. Keep your masters on your device for now.",
    url: "https://navasound.com",
    siteName: "NavaSound",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NavaSound | Music distribution for independent artists",
    description: "Apply to NavaSound's founding artist beta with your release details. Keep your masters on your device for now.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
