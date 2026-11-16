import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const html = await readFile("dist/advogado-direito-civil-joinville/index.html", "utf8");
const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])["@graph"];

test("service content and closed accordions are present in the delivered HTML", () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const text of ["Quando procurar um advogado de Direito Civil?", "Responsabilidade civil", "Indenização por danos materiais e morais", "Cobranças e conflitos entre particulares"]) assert.ok(html.includes(text));
  const details = [...html.matchAll(/<details\b([^>]*)>/g)];
  assert.equal(details.length, 4);
  for (const [, attributes] of details) assert.ok(!/\bopen\b/.test(attributes));
});

test("metadata and local business data identify the specialty and Joinville", () => {
  assert.ok(html.includes("<title>Advogado de Direito Civil em Joinville | Filipi Barbosa</title>"));
  assert.match(html, /rel="canonical" href="https:\/\/filipi-barbosa.vercel.app\/advogado-direito-civil-joinville\/"/);
  const business = graph.find(item => item["@type"] === "LegalService");
  assert.equal(business.address.addressLocality, "Joinville");
  assert.equal(business.telephone, "+5547988455504");
  assert.ok(!("aggregateRating" in business));
  const faq = graph.find(item => item["@type"] === "FAQPage");
  assert.equal(faq.mainEntity.length, 4);
  for (const question of faq.mainEntity) {
    assert.ok(html.includes(question.name));
    assert.ok(html.includes(question.acceptedAnswer.text));
  }
});

test("every locally referenced production asset exists", async () => {
  const assets = [...html.matchAll(/(?:src|href)="(\/(?:assets|images)\/[^"?#]+)"/g)].map(match => match[1]);
  assert.ok(assets.length > 4);
  for (const asset of new Set(assets)) await access(`dist${asset}`);
});

test("discovery files contain the canonical service URL", async () => {
  assert.match(await readFile("dist/sitemap.xml", "utf8"), /https:\/\/filipi-barbosa.vercel.app\/advogado-direito-civil-joinville\//);
  assert.match(await readFile("dist/robots.txt", "utf8"), /Sitemap: https:\/\/filipi-barbosa.vercel.app\/sitemap.xml/);
});
