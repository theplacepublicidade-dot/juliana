import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Juliana content hub", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Central Juliana 1020 \| Materiais oficiais<\/title>/i);
  assert.match(html, /id="historia"/);
  assert.match(html, /História e família/);
  assert.match(html, /16\.385/);
  assert.match(html, /id="mandato"/);
  assert.match(html, /28 votos a 7/);
  assert.match(html, /R\$ 500 milhões/);
  assert.match(html, /R\$ 1,5 bilhão em crédito Pronaf/);
  assert.match(html, /Desenvolvimento com segurança jurídica/);
  assert.match(html, /id="avatar"/);
  assert.match(html, /id="materiais"/);
  assert.match(html, /164/);
  assert.match(html, /27/);
  assert.match(html, /whatsapp\.com\/channel\/0029Vb8J3XW8F2p68rcnif34/);
  assert.doesNotMatch(html, /codex-preview|Building your site/i);
});

test("keeps photo personalization local and provides a Vercel build", async () => {
  const [page, vercelHtml, vercelConfig, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../vercel/index.html", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /accept="image\/\*"/);
  assert.match(page, /canvas\.toBlob/);
  assert.match(page, /URL\.revokeObjectURL/);
  assert.match(page, /Sua foto é processada apenas no navegador/);
  assert.match(page, /material\.localFile \?\? driveDownload/);
  assert.match(vercelHtml, /Central Juliana 1020/);
  assert.match(vercelHtml, /og\.jpg/);
  assert.match(vercelConfig, /"framework": "vite"/);
  assert.match(packageJson, /"build:vercel"/);
});
