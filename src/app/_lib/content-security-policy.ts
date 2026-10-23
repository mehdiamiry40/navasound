export type ContentSecurityPolicyOptions = {
  nonce: string;
  dev: boolean;
  upgradeInsecureRequests: boolean;
};

/**
 * Production policy for this site. Every document, font, image, and script is
 * same-origin. Forms never submit: visitors download, copy, or open a mailto
 * link themselves, so form-action stays 'none'.
 *
 * script-src is listed before script-src-attr. Next.js extracts the nonce with
 * a startsWith("script-src") scan, and "script-src-attr" would match first.
 */
export function contentSecurityPolicy({
  nonce,
  dev,
  upgradeInsecureRequests,
}: ContentSecurityPolicyOptions) {
  const scriptSrc = [
    "script-src",
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    dev ? "'unsafe-eval'" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const styleSrc = dev
    ? "style-src 'self' 'unsafe-inline'"
    : `style-src 'self' 'nonce-${nonce}'`;

  const directives = [
    "default-src 'self'",
    scriptSrc,
    "script-src-attr 'none'",
    styleSrc,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "worker-src 'none'",
  ];

  if (upgradeInsecureRequests) directives.push("upgrade-insecure-requests");

  return directives.join("; ");
}
