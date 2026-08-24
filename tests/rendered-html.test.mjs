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
  assert.match(html, /Quem é Juliana/);
  assert.match(html, /16\.385/);
  assert.match(html, /Corredor Ecológico Onça-Pintada/);
  assert.match(html, /id="foto"/);
  assert.match(html, /id="materiais"/);
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

  assert.match(page, /accept="image\/png,image\/jpeg"/);
  assert.match(page, /canvas\.toBlob/);
  assert.match(page, /URL\.revokeObjectURL/);
  assert.match(page, /Sua imagem não é enviada nem armazenada/);
  assert.match(vercelHtml, /Central Juliana 1020/);
  assert.match(vercelHtml, /og\.jpg/);
  assert.match(vercelConfig, /"framework": "vite"/);
  assert.match(packageJson, /"build:vercel"/);
});
