import { expect, test } from "@playwright/test";

test.describe("SEO técnico (Fase 5.1 + 5.2)", () => {
  test("metadados: title, description, canonical, OG e Twitter (RF-12)", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Trak Assessoria/);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.length).toBeGreaterThan(50);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https?:\/\//
    );

    await expect(
      page.locator('meta[property="og:type"]')
    ).toHaveAttribute("content", "website");
    await expect(
      page.locator('meta[property="og:locale"]')
    ).toHaveAttribute("content", "pt_BR");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /Trak/
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image"
    );

    // OG image gerada pelo app/opengraph-image.tsx (Fase 5.1) — Next a
    // referencia automaticamente via metadata quando a rota existe
    // (gera og:image E twitter:image — assertados separadamente).
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(1);
  });

  test("JSON-LD: Organization + ProfessionalService presentes (5.2)", async ({
    page,
  }) => {
    await page.goto("/");

    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();

    expect(jsonLd).toContain('"@type":"Organization"');
    expect(jsonLd).toContain('"@type":"ProfessionalService"');
  });

  test("sitemap.xml responde 200 e lista a home", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("<loc>");
  });

  test("robots.txt responde 200, permite indexação e aponta o sitemap", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    // Next 16.2 gera "User-Agent:" (A maiúsculo) — compara sem case.
    expect(body.toLowerCase()).toContain("user-agent: *");
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap:");
  });
});
