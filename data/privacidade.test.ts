import { describe, expect, it } from "vitest";

import { privacy } from "./privacidade";

describe("privacidade — Política de Privacidade (RNF-08 / Fase 5.6)", () => {
  it("tem data de atualização no formato pt-BR", () => {
    expect(privacy.updatedAt).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it("identifica o controlador com e-mail e WhatsApp do site", () => {
    expect(privacy.controller.name).toBeTruthy();
    expect(privacy.controller.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(privacy.controller.whatsapp).toMatch(/\+55 \d{2} \d{5}-\d{4}/);
  });

  it("cobre os temas exigidos pela LGPD (dados, base legal, direitos, contato)", () => {
    const titles = privacy.sections.map((s) => s.title.toLowerCase());
    const keywords = ["dados", "consentimento", "direitos", "contato", "cookies"];

    for (const keyword of keywords) {
      const found = titles.some((t) => t.includes(keyword));
      const inBody = privacy.sections.some((s) =>
        s.body.some((p) => p.toLowerCase().includes(keyword))
      );
      expect(found || inBody).toBe(true);
    }
  });

  it("cada seção tem id único, título e pelo menos um parágrafo", () => {
    const ids = privacy.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const section of privacy.sections) {
      expect(section.id).toMatch(/^[a-z0-9-]+$/);
      expect(section.title).toBeTruthy();
      expect(section.body.length).toBeGreaterThan(0);
      for (const paragraph of section.body) {
        expect(paragraph.length).toBeGreaterThan(20);
      }
    }
  });

  it("menciona explicitamente o formulário de contato (RF-08)", () => {
    const allText = privacy.sections
      .flatMap((s) => s.body)
      .join(" ")
      .toLowerCase();
    expect(allText).toContain("formulário");
    expect(allText).toContain("nome");
    expect(allText).toContain("e-mail");
  });
});
