import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { civilPath, civilFaqs } from "../src/civil-content.js";
import { contact } from "../src/content.js";

// Static service HTML makes the full content available before JavaScript runs.
const siteUrl = new URL(process.env.SITE_URL || "https://filipi-barbosa.vercel.app").origin;
const pageUrl = `${siteUrl}${civilPath}`;
const serviceId = `${pageUrl}#service`;
const businessId = `${siteUrl}/#escritorio`;
const personId = `${siteUrl}/#filipi-marcelino-barbosa`;
const address = {
  "@type": "PostalAddress",
  streetAddress: "Rua Minas Gerais, 1122 — Nova Brasília",
  addressLocality: "Joinville",
  addressRegion: "SC",
  addressCountry: "BR",
};
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService", "@id": businessId,
      name: "Filipi Barbosa Advogados", url: `${siteUrl}/`,
      telephone: `+${contact.whatsapp}`, email: contact.email,
      address, image: `${siteUrl}/images/filipi-barbosa.webp`,
      areaServed: { "@type": "City", name: "Joinville", containedInPlace: { "@type": "State", name: "Santa Catarina" } },
      sameAs: [contact.instagram],
    },
    {
      "@type": "Person", "@id": personId, name: "Filipi Marcelino Barbosa",
      jobTitle: "Advogado", identifier: "OAB/SC 60.331", worksFor: { "@id": businessId },
      image: `${siteUrl}/images/filipi-barbosa.webp`,
    },
    {
      "@type": "Service", "@id": serviceId,
      name: "Direito Civil em Joinville", serviceType: "Orientação e atuação em Direito Civil",
      url: pageUrl, provider: { "@id": businessId },
      areaServed: { "@type": "City", name: "Joinville" },
      description: "Orientação em responsabilidade civil, indenizações, obrigações e cobranças, com análise individual dos fatos e documentos.",
    },
    {
      "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl,
      name: "Advogado de Direito Civil em Joinville | Filipi Barbosa",
      inLanguage: "pt-BR", about: { "@id": serviceId },
      publisher: { "@id": businessId }, breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Áreas de atuação", item: `${siteUrl}/#atuacao` },
        { "@type": "ListItem", position: 3, name: "Direito Civil", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage", "@id": `${pageUrl}#duvidas-frequentes`,
      mainEntity: civilFaqs.map(faq => ({
        "@type": "Question", name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const { default: CivilPage } = await server.ssrLoadModule("/src/civil-page.jsx");
  const markup = renderToString(createElement(CivilPage));
  const target = `dist${civilPath}index.html`;
  let html = await readFile(target, "utf8");
  if (!html.includes('<div id="root"></div>')) throw new Error("Service root not found during prerender.");
  html = html.replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`);
  html = html.replaceAll("https://filipi-barbosa.vercel.app", siteUrl);
  html = html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script></head>`);
  await writeFile(target, html);
  await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url><url><loc>${pageUrl}</loc></url></urlset>\n`);
  await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`Prerendered ${civilPath}; generated sitemap and robots.txt.`);
} finally {
  await server.close();
}
