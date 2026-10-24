import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import {
  inlineScripts,
  requiredScriptHashes,
  sha256Source,
  stripPreviewToolbar,
  uncoveredInlineScripts,
} from "../src/lib/csp-inline";
import {
  CSP_HASH_PLACEHOLDER,
  CSP_STYLE_PLACEHOLDER,
  assertProductionScriptSrc,
  buildContentSecurityPolicy,
  buildDevContentSecurityPolicy,
  directiveValue,
} from "../src/lib/csp-policy";
import { assertDeploymentOutput, publishInlineScriptHashes } from "../src/lib/csp-publish";

const GTAG = "window.dataLayer = window.dataLayer || [];";

function page(extra = ""): string {
  const payload = JSON.stringify([0, { children: GTAG, id: "google-ads-tag" }]);
  return `<!doctype html><script src="/_next/static/chunks/app.js"></script>
<script type="application/ld+json">{"@type":"WebSite"}</script>
<script>(self.__next_s=self.__next_s||[]).push(${payload})</script>
<script>(self.__next_f=self.__next_f||[]).push([0])</script>
${extra}`;
}

describe("content security policy", () => {
  it("hashes the script source the browser hashes", () => {
    assert.equal(sha256Source("window.__ok = 1"), "'sha256-jHIk/15hbltKLWfuHJjRVWpRTvmtGvByNu5yNRfH7oc='");
  });

  it("ignores JSON-LD and external scripts, and hashes next/script payloads", () => {
    const scripts = inlineScripts(page());
    assert.equal(scripts.length, 2);
    assert.deepEqual(scripts[0]?.dynamic, [GTAG]);
    const hashes = requiredScriptHashes(page());
    assert.ok(hashes.includes(sha256Source(scripts[0]!.text)));
    assert.ok(hashes.includes(sha256Source(GTAG)));
    assert.ok(hashes.includes(sha256Source("(self.__next_f=self.__next_f||[]).push([0])")));
  });

  it("keeps unsafe-eval, nonces, and third-party hosts out of the production script-src", () => {
    const policy = buildContentSecurityPolicy([sha256Source("var ready = true;")]);
    assert.equal(directiveValue(policy, "script-src").includes("'unsafe-inline'"), false);
    assert.equal(directiveValue(policy, "script-src").includes("'unsafe-eval'"), false);
    assert.equal(directiveValue(policy, "script-src").includes("'nonce-"), false);
    assert.equal(directiveValue(policy, "script-src").includes("'strict-dynamic'"), false);
    assert.equal(directiveValue(policy, "frame-ancestors"), "'none'");
    assert.equal(directiveValue(policy, "form-action"), "'none'");
    assert.equal(directiveValue(policy, "media-src"), "'self'");
    assert.equal(directiveValue(policy, "connect-src"), "'self'");
    assert.equal(directiveValue(policy, "style-src"), "'self'");
    assert.equal(directiveValue(policy, "img-src"), "'self'");
    assert.equal(policy.includes("vercel.live"), false);
    assert.equal(policy.includes("va.vercel-scripts.com"), false);
    assert.equal(policy.includes("upgrade-insecure-requests"), false);
    assert.doesNotThrow(() => assertProductionScriptSrc(policy));
    assert.equal(uncoveredInlineScripts("<script>var ready = true;</script>", policy).length, 0);
  });

  it("ships a placeholder until the post-build step fills hashes", () => {
    const policy = buildContentSecurityPolicy([]);
    assert.ok(policy.includes(CSP_HASH_PLACEHOLDER));
    assert.ok(policy.includes(CSP_STYLE_PLACEHOLDER.trim()));
    assert.throws(() => assertProductionScriptSrc(policy), /placeholder/);
  });

  it("allows eval only in the development policy", () => {
    const dev = buildDevContentSecurityPolicy();
    assert.match(directiveValue(dev, "script-src"), /'unsafe-eval'/);
    assert.match(directiveValue(dev, "script-src"), /'unsafe-inline'/);
    assert.equal(dev.includes("upgrade-insecure-requests"), false);
    assert.equal(dev.includes("vercel.live"), false);
  });

  it("strips the unconditional preview toolbar and keeps the production cookie gate", () => {
    const injected =
      'before;var r=document.createElement("script");r.src="https://vercel.live/_next-live/feedback/feedback.js",r.setAttribute("data-deployment-id",globalThis.NEXT_DEPLOYMENT_ID),(document.head||document.documentElement).appendChild(r);after';
    assert.equal(stripPreviewToolbar(injected), "before;void 0;after");
    assert.equal(stripPreviewToolbar("var ready = true;"), "var ready = true;");
    const production =
      'if(e.i(47167),/(?:^|;\\s)__vercel_toolbar=1(?:;|$)/.test(document.cookie)){var r=document.createElement("script");r.src="https://vercel.live/_next-live/feedback/feedback.js",r.setAttribute("data-explicit-opt-in","true"),r.setAttribute("data-cookie-opt-in","true"),r.setAttribute("data-deployment-id",globalThis.NEXT_DEPLOYMENT_ID),(document.head||document.documentElement).appendChild(r)}';
    assert.equal(stripPreviewToolbar(production), production);
    assert.throws(
      () => stripPreviewToolbar('const src = "https://vercel.live/_next-live/feedback/feedback.js";'),
      /unrecognized/,
    );
  });

  it("rewrites a deployment config that the adapter wrote with the placeholder", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "csp-"));
    const dist = path.join(root, ".next");
    const html = "<!doctype html><script>var ready = true;</script>";
    const placeholder = buildContentSecurityPolicy([]);
    await mkdir(path.join(dist, "server", "app"), { recursive: true });
    await mkdir(path.join(dist, "output"), { recursive: true });
    await writeFile(path.join(dist, "server", "app", "index.html"), html);
    await writeFile(
      path.join(dist, "routes-manifest.json"),
      JSON.stringify({
        headers: [{ source: "/:path*", headers: [{ key: "Content-Security-Policy", value: placeholder }] }],
      }),
    );
    const routing = { beforeMiddleware: [{ headers: { "content-security-policy": placeholder } }] };
    const published = await publishInlineScriptHashes({ distDir: dist, routing });
    assert.equal(JSON.stringify(routing).includes(CSP_HASH_PLACEHOLDER), false);
    assert.ok(published.hashList.length >= 1);

    const dropped = published.policy.replace(published.hashList[0]!, "");
    await writeFile(
      path.join(dist, "output", "config.json"),
      JSON.stringify({ routes: [{ headers: { "Content-Security-Policy": dropped } }] }),
    );
    await assertDeploymentOutput({ projectRoot: root, distDir: dist, routing, requireDeploymentOutput: true });
    const config = await readFile(path.join(dist, "output", "config.json"), "utf8");
    assert.equal(config.includes(CSP_HASH_PLACEHOLDER), false);
    assert.equal(config.includes(published.hashList[0]!), true);
    assert.equal(config.includes(published.policy), true);
    await rm(root, { recursive: true, force: true });
  });

  it("fails closed when a prerendered inline script or style has no hash", () => {
    const policy = buildContentSecurityPolicy([sha256Source("var ready = true;")]);
    const missing = uncoveredInlineScripts("<script>var other = true;</script>", policy);
    assert.deepEqual(missing, [sha256Source("var other = true;")]);
    const styled = buildContentSecurityPolicy(
      [sha256Source("var ready = true;")],
      [sha256Source(":root { color: black; }")],
    );
    assert.equal(directiveValue(styled, "style-src").includes(sha256Source(":root { color: black; }")), true);
    assert.equal(directiveValue(styled, "style-src").includes("'unsafe-inline'"), false);
  });
});
