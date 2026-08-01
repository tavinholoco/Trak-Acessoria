import { describe, expect, it } from "vitest";

import { bannerHeadline, marqueeItems } from "./marquee";

describe("marquee — itens da faixa animada (data/marquee.ts)", () => {
  it("contém ao menos 4 itens de texto", () => {
    expect(marqueeItems.length).toBeGreaterThanOrEqual(4);
  });

  it("todos os itens são textos não vazios e únicos (RF-04)", () => {
    for (const item of marqueeItems) {
      expect(item.trim().length).toBeGreaterThan(0);
    }
    expect(new Set(marqueeItems).size).toBe(marqueeItems.length);
  });

  it("bannerHeadline é texto não vazio (banner ilustrado — 3.8)", () => {
    expect(bannerHeadline.trim().length).toBeGreaterThan(0);
  });
});
