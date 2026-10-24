import { createHash } from "node:crypto";
import { missingScriptHashes } from "./csp-policy";

const NEXT_S_PUSH = "(self.__next_s=self.__next_s||[]).push(";

const JS_TYPES = new Set([
  "",
  "text/javascript",
  "application/javascript",
  "text/ecmascript",
  "application/ecmascript",
  "module",
]);

export type InlineScript = {
  /** Exact source text the browser hashes for this parser-inserted script. */
  text: string;
  /**
   * `next/script` beforeInteractive payloads. Next inserts these with
   * createElement after load, so the browser hashes the payload itself.
   */
  dynamic: string[];
};

function attr(attrs: string, name: string): string | null {
  const match = attrs.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\`]+))`, "i"));
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3] ?? "";
}

function isExecutableScript(attrs: string): boolean {
  if (attr(attrs, "src") !== null) return false;
  const type = attr(attrs, "type");
  if (type === null) return true;
  return JS_TYPES.has(type.trim().toLowerCase());
}

/** Children Next will assign to a new script element via innerHTML. */
export function nextScriptPayloads(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed.startsWith(NEXT_S_PUSH)) return [];
  if (!trimmed.endsWith(")")) {
    throw new Error("truncated __next_s inline script");
  }
  let payload: unknown;
  try {
    payload = JSON.parse(trimmed.slice(NEXT_S_PUSH.length, -1));
  } catch (err) {
    throw new Error(`unparseable __next_s inline script: ${err instanceof Error ? err.message : String(err)}`);
  }
  if (!Array.isArray(payload)) return [];
  const props = payload[1];
  if (!props || typeof props !== "object" || !("children" in props)) return [];
  const children = (props as { children?: unknown }).children;
  if (typeof children !== "string" || children.length === 0) return [];
  return [children];
}

/** Parser-inserted executable inline scripts, in document order. JSON-LD is ignored. */
export function inlineScripts(html: string): InlineScript[] {
  const scripts: InlineScript[] = [];
  const open = /<script\b([^>]*)>/gi;
  let match: RegExpExecArray | null;
  while ((match = open.exec(html))) {
    const attrs = match[1] ?? "";
    const start = open.lastIndex;
    const end = html.toLowerCase().indexOf("</script>", start);
    if (end === -1) throw new Error("unterminated <script> in prerendered HTML");
    const text = html.slice(start, end);
    open.lastIndex = end + "</script>".length;
    if (!isExecutableScript(attrs) || text.length === 0) continue;
    scripts.push({ text, dynamic: nextScriptPayloads(text) });
  }
  return scripts;
}

export function sha256Source(content: string): string {
  const digest = createHash("sha256").update(content, "utf8").digest("base64");
  return `'sha256-${digest}'`;
}

/** Every hash the CSP must list for this HTML document. */
export function requiredScriptHashes(html: string): string[] {
  const hashes = new Set<string>();
  for (const script of inlineScripts(html)) {
    hashes.add(sha256Source(script.text));
    for (const payload of script.dynamic) hashes.add(sha256Source(payload));
  }
  return [...hashes].sort();
}

export function uncoveredInlineScripts(html: string, policy: string): string[] {
  return missingScriptHashes(policy, requiredScriptHashes(html));
}

/** Inline style blocks, in document order. The browser hashes their text. */
export function inlineStyles(html: string): string[] {
  const styles: string[] = [];
  const open = /<style\b[^>]*>/gi;
  while (open.exec(html)) {
    const start = open.lastIndex;
    const end = html.toLowerCase().indexOf("</style>", start);
    if (end === -1) throw new Error("unterminated <style> in prerendered HTML");
    const text = html.slice(start, end);
    open.lastIndex = end + "</style>".length;
    if (text.length === 0) continue;
    styles.push(text);
  }
  return styles;
}

export function requiredStyleHashes(html: string): string[] {
  return [...new Set(inlineStyles(html).map(sha256Source))].sort();
}

export function uncoveredInlineStyles(html: string, policy: string): string[] {
  const styleSrc = policy
    .split(";")
    .map((part) => part.trim())
    .find((part) => part === "style-src" || part.startsWith("style-src "));
  if (!styleSrc) return requiredStyleHashes(html);
  return requiredStyleHashes(html).filter((hash) => !styleSrc.includes(hash));
}

const PREVIEW_TOOLBAR_URL = "https://vercel.live/_next-live/feedback/feedback.js";

/**
 * Preview builds fold the environment check away and append this script on every page.
 * That would run for every preview visitor, and the CSP does not allow vercel.live.
 */
const UNCONDITIONAL_TOOLBAR_INJECTION =
  /var \w+=document\.createElement\("script"\);\w+\.src="https:\/\/vercel\.live\/_next-live\/feedback\/feedback\.js",\w+\.setAttribute\("data-deployment-id",globalThis\.NEXT_DEPLOYMENT_ID\),\(document\.head\|\|document\.documentElement\)\.appendChild\(\w+\)/g;

/**
 * Production leaves the same injector in the client bundle, but only runs it when the
 * document cookie `__vercel_toolbar=1` is set (Vercel's explicit toolbar opt-in).
 * Public responses never set that cookie, so the reference does not load the script.
 */
function cookieGatedToolbarOnly(source: string): boolean {
  let from = 0;
  while (from < source.length) {
    const index = source.indexOf(PREVIEW_TOOLBAR_URL, from);
    if (index === -1) return true;
    const before = source.slice(Math.max(0, index - 800), index);
    const after = source.slice(index, index + 500);
    const gated =
      before.includes("__vercel_toolbar=1") &&
      before.includes("document.cookie") &&
      after.includes("data-cookie-opt-in") &&
      after.includes("appendChild(");
    if (!gated) return false;
    from = index + PREVIEW_TOOLBAR_URL.length;
  }
  return true;
}

export function stripPreviewToolbar(source: string): string {
  UNCONDITIONAL_TOOLBAR_INJECTION.lastIndex = 0;
  const code = source.replace(UNCONDITIONAL_TOOLBAR_INJECTION, "void 0");
  if (!code.includes(PREVIEW_TOOLBAR_URL)) return code;
  if (cookieGatedToolbarOnly(code)) return code;
  throw new Error("unrecognized Vercel preview toolbar injection still references vercel.live");
}
