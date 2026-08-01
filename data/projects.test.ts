import { describe, expect, it } from "vitest";

import { projects } from "./projects";

describe("projects — cases com métricas (data/projects.ts)", () => {
  it("lista ao menos 3 projetos", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });

  it("cada projeto tem título, cliente, ano, descrição e métrica de destaque", () => {
    for (const project of projects) {
      // Id ASCII estável (convenção dos demais data/* — sem acentos).
      expect(project.id).toMatch(/^[a-z0-9-]+$/);
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(project.client.trim().length).toBeGreaterThan(0);
      expect(project.year).toMatch(/^\d{4}$/);
      expect(project.description.length).toBeGreaterThan(20);
      expect(project.metric.value.trim().length).toBeGreaterThan(0);
      expect(project.metric.label.trim().length).toBeGreaterThan(0);
      // Ilustração autorai referenciada em public/art/ (Fase 3.8).
      expect(project.art).toMatch(/^\/art\/.+\.svg$/);
    }
  });

  it("ids são únicos", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
