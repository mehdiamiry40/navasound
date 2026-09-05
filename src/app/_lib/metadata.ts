import type { Metadata } from "next";

export const SITE_NAME = "NavaSound";
export const SITE_URL = "https://navasound.com";

const socialImage = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "NavaSound — Release prep for artists. Built around your music.",
};

export type PublicPath =
  | "/"
  | "/apply"
  | "/release"
  | "/legal"
  | "/legal/privacy"
  | "/legal/terms"
  | "/legal/beta"
  | "/legal/refunds";

type PageMetadata = Readonly<{
  title: string;
  description: string;
  path: PublicPath;
}>;

export function absoluteSiteUrl(path: PublicPath): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const url = absoluteSiteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
