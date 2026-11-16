import { test, expect } from "@playwright/test";

const path = "/advogado-direito-civil-joinville/";

test("Direito Civil leva da home à página e permite voltar ao escritório", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  const card = page.locator("a.area-card").filter({ hasText: "Direito Civil" });
  await expect(card).toHaveAttribute("href", path);
  await card.click();
  await expect(page).toHaveURL(new RegExp(`${path}$`));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Advogado de Direito Civil em Joinville");
  await expect(page.locator(".civil-sidebar-areas [aria-current='page']")).toHaveText("Direito Civil");
  await expect(page.locator(".civil-opening-copy .button")).toHaveAttribute("href", /wa.me\/5547988455504.*Direito%20Civil%20em%20Joinville/);
  await page.getByRole("link", { name: "Conheça o escritório", exact: true }).click();
  await expect(page).toHaveURL(/\/#escritorio$/);
  await expect(page.locator("#escritorio")).toBeInViewport();
  expect(errors).toEqual([]);
});

test("FAQ começa recolhido, abre por teclado e fecha o item anterior", async ({ page }) => {
  await page.goto(path);
  const questions = page.locator(".civil-faq-item");
  await expect(questions).toHaveCount(4);
  await expect(page.locator(".civil-faq-item[open]")).toHaveCount(0);
  const first = questions.nth(0);
  await expect(first.locator(".civil-faq-answer")).toBeHidden();
  await first.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(first).toHaveAttribute("open", "");
  await expect(first.locator(".civil-faq-answer")).toBeVisible();
  await questions.nth(1).locator("summary").click();
  await expect(first).not.toHaveAttribute("open", "");
  await expect(questions.nth(1).locator(".civil-faq-answer")).toBeVisible();
  await questions.nth(1).locator("summary").click();
  await expect(page.locator(".civil-faq-item[open]")).toHaveCount(0);
});

test("acesso direto, metadados, imagens e layout responsivo", async ({ page }, info) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `largura ${width}`).toBe(true);
  }
  await expect(page).toHaveTitle("Advogado de Direito Civil em Joinville | Filipi Barbosa");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://filipi-barbosa.vercel.app${path}`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Direito Civil em Joinville/);
  const image = page.locator(".civil-lawyer img");
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  await page.setViewportSize(info.project.name === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 1000 });
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `test-results/civil-${info.project.name}.png`, fullPage: true });
});

test("outras especialidades continuam acessíveis e navegação local funciona", async ({ page }, info) => {
  await page.goto(path);
  await page.locator(".civil-sidebar-areas").getByRole("button", { name: "Direito de Família" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("navigation", { name: "Nesta página", exact: true }).getByRole("link", { name: "Dúvidas frequentes" }).click();
  await expect(page).toHaveURL(/#duvidas-frequentes$/);
  await expect(page.locator("#civil-faq-title")).toBeInViewport();
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.locator("#main-nav")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  }
});

test("produção entrega conteúdo sem JavaScript, sitemap e schema coerentes", async ({ browser, request }) => {
  test.skip(!process.env.TEST_PRODUCTION, "Validação do HTML gerado no build de produção.");
  const response = await request.get(path);
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain("Quando procurar um advogado de Direito Civil?");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:5173${path}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Advogado de Direito Civil em Joinville");
  await page.locator(".civil-faq-item summary").first().click();
  await expect(page.locator(".civil-faq-answer").first()).toBeVisible();
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())["@graph"];
  expect(graph.find(item => item["@type"] === "LegalService").address.addressLocality).toBe("Joinville");
  const faq = graph.find(item => item["@type"] === "FAQPage");
  expect(faq.mainEntity).toHaveLength(4);
  for (const item of faq.mainEntity) {
    await expect(page.locator(".civil-faq-item").filter({ hasText: item.name }).locator(".civil-faq-answer")).toHaveText(item.acceptedAnswer.text);
  }
  expect(await (await request.get("/sitemap.xml")).text()).toContain(`https://filipi-barbosa.vercel.app${path}`);
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: https://filipi-barbosa.vercel.app/sitemap.xml");
  await context.close();
});
