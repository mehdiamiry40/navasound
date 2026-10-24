// This site serves only same-origin documents, fonts, images, and scripts.
// Forms never submit: visitors download, copy, or open a mailto link themselves.
// No analytics, tag manager, or embedded player is loaded, so no third-party
// origin is allowlisted. vercel.live is not allowlisted.

export const CSP_HASH_PLACEHOLDER = "__CSP_INLINE_HASHES__";
/** Leading space so an empty style list leaves `style-src 'self'` with no stray gap. */
export const CSP_STYLE_PLACEHOLDER = " __CSP_STYLE_HASHES__";

function join(directive: string, sources: string[]): string {
  return `${directive} ${sources.join(" ")}`;
}

/**
 * Production policy. `scriptHashes` are `'sha256-...'` sources.
 * An empty list leaves a placeholder that the build must replace inside the
 * output Vercel serves. Shipping the placeholder blocks every inline script.
 *
 * `upgrade-insecure-requests` is not part of this static header. Vercel already
 * sends HSTS, and every asset URL is same-origin. A per-request copy of the
 * directive replaced the hashed policy, and baking it in blocked WebKit on the
 * local HTTP server.
 */
export function buildContentSecurityPolicy(scriptHashes: string[], styleHashes?: string[]): string {
  const hashes = scriptHashes.length > 0 ? [...scriptHashes].sort() : [CSP_HASH_PLACEHOLDER];
  // The build-time policy leaves a style placeholder. Once hashes are known, an
  // empty list means this document set has no inline style blocks.
  const styleDirective =
    styleHashes === undefined && scriptHashes.length === 0
      ? `style-src 'self'${CSP_STYLE_PLACEHOLDER}`
      : join("style-src", ["'self'", ...(styleHashes ? [...styleHashes].sort() : [])]);
  return [
    join("default-src", ["'self'"]),
    join("script-src", ["'self'", ...hashes]),
    join("script-src-attr", ["'none'"]),
    styleDirective,
    join("style-src-attr", ["'unsafe-inline'"]),
    join("img-src", ["'self'"]),
    join("font-src", ["'self'"]),
    join("connect-src", ["'self'"]),
    join("media-src", ["'self'"]),
    join("object-src", ["'none'"]),
    join("base-uri", ["'self'"]),
    join("form-action", ["'none'"]),
    join("frame-src", ["'none'"]),
    join("frame-ancestors", ["'none'"]),
    join("worker-src", ["'none'"]),
  ].join("; ");
}

/** React's development overlay needs eval, and dev inline scripts change every compile. */
export function buildDevContentSecurityPolicy(): string {
  return [
    join("default-src", ["'self'"]),
    join("script-src", ["'self'", "'unsafe-inline'", "'unsafe-eval'"]),
    join("script-src-attr", ["'none'"]),
    join("style-src", ["'self'", "'unsafe-inline'"]),
    join("style-src-attr", ["'unsafe-inline'"]),
    join("img-src", ["'self'", "data:", "blob:"]),
    join("font-src", ["'self'"]),
    join("connect-src", ["'self'", "ws:", "wss:"]),
    join("media-src", ["'self'"]),
    join("object-src", ["'none'"]),
    join("base-uri", ["'self'"]),
    join("form-action", ["'none'"]),
    join("frame-src", ["'none'"]),
    join("frame-ancestors", ["'none'"]),
    join("worker-src", ["'self'", "blob:"]),
  ].join("; ");
}

export function directiveValue(policy: string, name: string): string {
  const match = policy
    .split(";")
    .map((part) => part.trim())
    .find((part) => part === name || part.startsWith(`${name} `));
  if (!match) throw new Error(`CSP is missing ${name}`);
  return match.slice(name.length).trim();
}

export function assertProductionScriptSrc(policy: string): void {
  const scriptSrc = directiveValue(policy, "script-src");
  if (scriptSrc.includes("'unsafe-inline'") || scriptSrc.includes("'unsafe-eval'")) {
    throw new Error(`production script-src must not allow unsafe-inline or unsafe-eval: ${scriptSrc}`);
  }
  if (scriptSrc.includes("'nonce-") || scriptSrc.includes("'strict-dynamic'")) {
    throw new Error("production script-src must use hashes, not a nonce");
  }
  if (
    scriptSrc.includes(CSP_HASH_PLACEHOLDER) ||
    policy.includes(CSP_HASH_PLACEHOLDER) ||
    policy.includes(CSP_STYLE_PLACEHOLDER)
  ) {
    throw new Error("production CSP still contains a hash placeholder");
  }
  if (!scriptSrc.includes("'sha256-")) {
    throw new Error("production script-src has no sha256 hashes");
  }
  if (policy.includes("vercel.live")) {
    throw new Error("production CSP must not allow vercel.live");
  }
}

export function missingScriptHashes(policy: string, required: string[]): string[] {
  const scriptSrc = directiveValue(policy, "script-src");
  return required.filter((hash) => !scriptSrc.includes(hash));
}
