import { describe, expect, it } from "vitest";

import { services } from "./services";

describe("services — oferta de serviços (data/services.ts)", () => {
  it("lista os 6 serviços previstos no PRD §6.3", () => {
    expect(services).toHaveLength(6);
  });

  it("cada serviço tem id, índice, título, descrição e destaques", () => {
    for (const service of services) {
      expect(service.id).toMatch(/^[a-z0-9-]+$/);
      expect(service.index).toMatch(/^\d{2}$/);
      expect(service.title.trim().length).toBeGreaterThan(0);
      expect(service.description.length).toBeGreaterThan(20);
      expect(service.highlights.length).toBeGreaterThan(0);
      for (const highlight of service.highlights) {
        expect(highlight.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("ids são únicos (chave estável para keys do React)", () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("cobre os temas centrais do PRD: finanças, editais, curadoria, marca, projetos e jurídico", () => {
    const titles = services.map((s) => s.title.toLowerCase());
    expect(titles.join(" ")).toContain("gestão financeira");
    expect(titles.join(" ")).toContain("editais");
    expect(titles.join(" ")).toContain("curadoria");
    expect(titles.join(" ")).toContain("marketing");
    expect(titles.join(" ")).toContain("projetos");
    expect(titles.join(" ")).toContain("jurídica");
  });
});
