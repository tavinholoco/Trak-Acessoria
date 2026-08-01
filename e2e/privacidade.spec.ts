import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Política de Privacidade (RNF-08 / Fase 5.6)", () => {
  test("link no rodapé aponta para /privacidade", async ({ page }) => {
    await page.goto("/");

    // Escopado ao footer: com o analytics ativo no E2E, o banner de
    // consentimento (Fase 5.5) também tem um link "Política de Privacidade".
    const link = page
      .locator("footer")
      .getByRole("link", { name: "Política de Privacidade" });
    await expect(link).toHaveAttribute("href", "/privacidade");

    await link.click();
    await expect(page).toHaveURL(/\/privacidade/);
  });

  test("página renderiza título, data e seções LGPD", async ({ page }) => {
    await page.goto("/privacidade");

    await expect(
      page.getByRole("heading", { level: 1, name: /Privacidade/ })
    ).toBeVisible();
    await expect(page.getByText(/Última atualização/)).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: /Seus direitos/ })
    ).toBeVisible();
    await expect(page.getByText(/LGPD/).first()).toBeVisible();
  });

  test("página tem metadata próprio (title + description)", async ({ page }) => {
    await page.goto("/privacidade");

    await expect(page).toHaveTitle(/Política de Privacidade/);
    await expect(
      page.locator('meta[name="description"]')
    ).toHaveAttribute("content", /LGPD/);
  });

  test("sem violações críticas do axe (WCAG AA / 5.11)", async ({ page }) => {
    await page.goto("/privacidade");

    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(blocking).toEqual([]);
  });
});
