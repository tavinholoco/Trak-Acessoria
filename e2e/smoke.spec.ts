import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Smoke — página inicial", () => {
  test("carrega com hero, navegação e rodapé", async ({ page, isMobile }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Trak Assessoria/);

    await expect(
      page.getByRole("heading", { level: 1, name: /Negócio/ })
    ).toBeVisible();

    // A navegação desktop é oculta no mobile (`hidden lg:flex`) — só existe
    // em viewport não-mobile. O rodapé é visível em todos os tamanhos.
    if (!isMobile) {
      await expect(
        page.getByRole("navigation", { name: "Navegação principal" })
      ).toBeVisible();
    }

    await expect(
      page.getByRole("navigation", { name: "Navegação do rodapé" })
    ).toBeVisible();
  });

  test("navegação âncora rola até a seção Serviços (RF-01)", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: "Serviços", exact: true })
      .first()
      .click();

    await expect(page).toHaveURL(/#servicos/);
    await expect(page.locator("#servicos")).toBeVisible();
  });

  test("toggle de tema alterna do escuro para o claro (RF-10)", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.getByRole("button", { name: /Ativar modo/ }).click();

    await expect(page.locator("html")).toHaveClass(/light/);
  });

  test("CTA do header aponta para a âncora de contato", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "CTA do header é oculto no viewport mobile");
    await page.goto("/");
    await page
      .locator("header")
      .getByRole("link", { name: "Falar conosco" })
      .click();

    await expect(page).toHaveURL(/#contato/);
  });
});

test.describe("Menu mobile (RF-02)", () => {
  test.skip(({ isMobile }) => !isMobile, "Somente no viewport mobile");

  test("abre o Sheet e fecha ao clicar em um link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu de navegação" }).click();

    const sheet = page.getByRole("dialog");
    await expect(
      sheet.getByRole("navigation", { name: "Navegação móvel" })
    ).toBeVisible();

    await sheet.getByRole("link", { name: "Contato", exact: true }).click();

    await expect(sheet).toBeHidden();
    await expect(page).toHaveURL(/#contato/);
  });
});

test.describe("Acessibilidade (RNF-02 / WCAG)", () => {
  test("página inicial sem violações críticas do axe", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();
    // WCAG AA (RNF-02) = sem violações critical OU serious (ex.: contraste).
    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(blocking).toEqual([]);
  });
});
