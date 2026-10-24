import { fileURLToPath, pathToFileURL } from "node:url";
import { tsImport } from "tsx/esm/api";

const adapterFile = fileURLToPath(new URL("./csp-adapter.mjs", import.meta.url));

async function loadPublish() {
  return tsImport("../src/lib/csp-publish.ts", import.meta.url);
}

async function loadDelegatedAdapter() {
  const adapterPath = process.env.NEXT_ADAPTER_PATH;
  if (!adapterPath || adapterPath === adapterFile) return null;
  const loaded = await import(pathToFileURL(adapterPath).href);
  return loaded.default ?? loaded;
}

export const name = "NavaSound CSP";

export async function modifyConfig(config, context) {
  const delegated = await loadDelegatedAdapter();
  if (typeof delegated?.modifyConfig === "function") {
    config = await delegated.modifyConfig(config, context);
  }
  // Vercel's modifyConfig points adapterPath back at itself. This file has to
  // stay the adapter so hashes are in the routing object before it is serialised.
  config.adapterPath = adapterFile;
  // Immutable chunks share one URL across deployments. The preview toolbar is
  // compiled into one of those chunks, so the first unstripped upload would be
  // what every later preview serves. Deployment-scoped assets (?dpl=) upload
  // the stripped file for this deployment only.
  if (process.env.VERCEL_ENV === "preview") {
    config.supportsImmutableAssets = false;
    if (config.experimental) config.experimental.supportsImmutableAssets = false;
  }
  return config;
}

export async function onBuildComplete(payload) {
  const publish = await loadPublish();
  // Preview assets are deployment-scoped, so stripping before the copy changes
  // the file this deployment uploads. Immutable shared URLs are left untouched.
  const strippedEarly = await publish.stripUnconditionalPreviewToolbar(payload.distDir);
  if (strippedEarly.length) {
    console.log(
      `CSP: removed the unconditional preview toolbar injection from ${strippedEarly.length} file(s) before deployment output was written`,
    );
  }
  console.log(`CSP: supportsImmutableAssets=${Boolean(payload.config?.supportsImmutableAssets)}`);
  const published = await publish.publishInlineScriptHashes({
    distDir: payload.distDir,
    routing: payload.routing,
  });
  console.log(
    `CSP: published ${published.hashList.length} inline-script hashes into the build routing ` +
      `(${published.patchedFiles.length} file(s), policy ${published.policy.length} bytes)`,
  );

  const delegated = await loadDelegatedAdapter();
  if (typeof delegated?.onBuildComplete === "function") {
    await delegated.onBuildComplete(payload);
  } else if (process.env.NEXT_ADAPTER_PATH) {
    throw new Error(
      `CSP adapter could not call onBuildComplete on NEXT_ADAPTER_PATH (${process.env.NEXT_ADAPTER_PATH})`,
    );
  }

  const outputRoots = [
    `${payload.distDir}/output`,
    `${payload.projectDir}/.vercel/output`,
    "/vercel/output",
  ];
  let strippedLate = 0;
  for (const root of outputRoots) {
    strippedLate += (await publish.stripUnconditionalPreviewToolbar(root)).length;
  }
  if (strippedLate) {
    console.log(`CSP: removed the unconditional preview toolbar injection from ${strippedLate} deployed file(s)`);
  }

  const checked = await publish.assertDeploymentOutput({
    projectRoot: payload.projectDir,
    distDir: payload.distDir,
    routing: payload.routing,
    requireDeploymentOutput: Boolean(process.env.NEXT_ADAPTER_PATH),
  });
  console.log(`CSP: deployment config has the hashed policy (${checked.configs.length} file(s))`);
}

const cspAdapter = { name, modifyConfig, onBuildComplete };
export default cspAdapter;
