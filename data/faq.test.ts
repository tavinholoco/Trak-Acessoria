import { describe, expect, it } from "vitest";

import { faq } from "./faq";

describe("faq — perguntas frequentes (data/faq.ts)", () => {
  it("lista ao menos 4 perguntas", () => {
    expect(faq.length).toBeGreaterThanOrEqual(4);
  });

  it("cada item tem id, pergunta (com ?) e resposta não vazia", () => {
    for (const item of faq) {
      expect(item.id).toMatch(/^[a-z0-9-]+$/);
      expect(item.question.trim().endsWith("?")).toBe(true);
      expect(item.answer.length).toBeGreaterThan(20);
    }
  });

  it("ids são únicos (acordeão — key estável)", () => {
    const ids = faq.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
