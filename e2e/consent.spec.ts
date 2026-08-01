import { expect, test } from "@playwright/test";

test.describe("Consentimento LGPD — analytics (Fase 5.5)", () => {
  test("banner aparece e 'ACEITAR' persiste a decisão", async ({ page }) => {
    await page.goto("/");

    const banner = page.getByRole("region", { name: /consentimento/ });
    await expect(banner).toBeVisible();

    // CTA de aceite some com o banner e grava no localStorage.
    await banner.getByRole("button", { name: "ACEITAR" }).click();
    await expect(banner).toBeHidden();

    const consent = await page.evaluate(() =>
      window.localStorage.getItem("trak:analytics-consent")
    );
    expect(consent).toBe("accepted");

    // Recarregar não reexibe (decisão persistida).
    await page.reload();
    await expect(
      page.getByRole("region", { name: /consentimento/ })
    ).toHaveCount(0);
  });

  test("'RECUSAR' mantém o tracking desligado", async ({ page }) => {
    await page.goto("/");

    const banner = page.getByRole("region", { name: /consentimento/ });
    await banner.getByRole("button", { name: "RECUSAR" }).click();
    await expect(banner).toBeHidden();

    const consent = await page.evaluate(() =>
      window.localStorage.getItem("trak:analytics-consent")
    );
    expect(consent).toBe("declined");
  });

  test("link do banner aponta para a Política de Privacidade", async ({
    page,
  }) => {
    await page.goto("/");

    const link = page
      .getByRole("region", { name: /consentimento/ })
      .getByRole("link", { name: /Política de Privacidade/ });
    await expect(link).toHaveAttribute("href", "/privacidade");

    await link.click();
    await expect(page).toHaveURL(/\/privacidade/);
  });
});
