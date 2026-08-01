import { describe, expect, it } from "vitest";

import { site, whatsappUrl } from "./site";

describe("site — dados globais (data/site.ts)", () => {
  it("contém identidade e contatos válidos", () => {
    expect(site.name).toBeTruthy();
    expect(site.tagline).toBeTruthy();
    expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    // WhatsApp: apenas dígitos, com DDI 55 (Brasil).
    expect(site.whatsapp.number).toMatch(/^55\d{10,12}$/);
  });

  it("navegação âncora: 5 itens, hrefs de âncora e ids únicos (RF-01)", () => {
    expect(site.nav).toHaveLength(5);
    const ids = site.nav.map((item) => item.href.slice(1));

    for (const item of site.nav) {
      expect(item.href).toMatch(/^#/);
      expect(item.label).toBeTruthy();
    }
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("inicio");
    expect(ids).toContain("contato");
  });

  it("redes sociais têm URLs absolutas válidas", () => {
    expect(site.socials.length).toBeGreaterThan(0);
    for (const social of site.socials) {
      expect(social.label).toBeTruthy();
      expect(social.href).toMatch(/^https:\/\//);
    }
  });

  it("whatsappUrl (RF-09) aponta para wa.me com mensagem codificada", () => {
    expect(whatsappUrl).toContain(`https://wa.me/${site.whatsapp.number}`);
    expect(whatsappUrl).toContain("text=");
    expect(decodeURIComponent(whatsappUrl)).toContain(site.whatsapp.message);
  });
});
