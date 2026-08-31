import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "form-action 'none'",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

const nextConfig: NextConfig = {
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
