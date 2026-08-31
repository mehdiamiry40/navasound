import type { MetadataRoute } from "next";
import { absoluteSiteUrl, type PublicPath } from "./_lib/metadata";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/apply", changeFrequency: "monthly", priority: 0.9 },
  { path: "/release", changeFrequency: "monthly", priority: 0.8 },
  { path: "/legal", changeFrequency: "yearly", priority: 0.5 },
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal/beta", changeFrequency: "yearly", priority: 0.4 },
  { path: "/legal/refunds", changeFrequency: "yearly", priority: 0.4 },
] as const satisfies ReadonlyArray<{
  path: PublicPath;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: absoluteSiteUrl(path),
    changeFrequency,
    priority,
  }));
}
