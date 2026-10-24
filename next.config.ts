import type { NextConfig } from "next";
import { join } from "node:path";
import { buildContentSecurityPolicy, buildDevContentSecurityPolicy } from "./src/lib/csp-policy";

// Production script hashes are unknown until prerender finishes. The placeholder is
// replaced in the build output by scripts/csp-hashes.ts. On Vercel that is too late
// for the header the CDN serves: the Next adapter copies it into
// `.next/output/config.json` during onBuildComplete, while `next build` is still
// running. scripts/csp-adapter.mjs wraps that adapter and writes the hashes first.
// Development cannot use those hashes: inline scripts change on every compile.
const contentSecurityPolicy =
  process.env.NODE_ENV === "development" ? buildDevContentSecurityPolicy() : buildContentSecurityPolicy([]);

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  // Vercel sets NEXT_ADAPTER_PATH to its own adapter. Wrap it so the routing
  // object it serialises already contains the real script hashes.
  ...(process.env.NEXT_ADAPTER_PATH ? { adapterPath: join(process.cwd(), "scripts/csp-adapter.mjs") } : {}),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.navasound.com",
          },
        ],
        destination: "https://navasound.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
