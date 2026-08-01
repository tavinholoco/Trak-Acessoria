import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { marqueeItems } from "@/data/marquee";
import { Marquee } from "./marquee";

describe("Marquee (Fase 3.2 / RF-04)", () => {
  it("renderiza os itens da faixa a partir de data/marquee.ts", () => {
    render(<Marquee />);

    for (const item of marqueeItems) {
      expect(screen.getAllByText(item).length).toBeGreaterThan(0);
    }
  });

  it("a faixa é decorativa (aria-hidden) e o banner tem ilustrações com alt", () => {
    const { container } = render(<Marquee />);

    // Faixa em movimento contínuo: aria-hidden (decorativa).
    expect(container.querySelector("[aria-hidden='true']")).not.toBeNull();

    // Banner ilustrado (Fase 3.8): figuras com alt descritivo (RNF-06).
    const figures = container.querySelectorAll("figure");
    expect(figures.length).toBeGreaterThanOrEqual(4);
    for (const figure of Array.from(figures)) {
      const img = figure.querySelector("img");
      expect(img?.getAttribute("alt")?.length).toBeGreaterThan(0);
    }
  });
});
