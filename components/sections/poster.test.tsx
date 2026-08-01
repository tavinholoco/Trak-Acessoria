import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Poster } from "./poster";

describe("Poster — wrapper de seção (Fase 3)", () => {
  it("renderiza âncora, aria-labelledby, índice, título e conteúdo", () => {
    render(
      <Poster id="servicos" index="03" title="Serviços">
        <p>Conteúdo da seção</p>
      </Poster>
    );

    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("id", "servicos");
    expect(section).toHaveAttribute("aria-labelledby", "servicos-titulo");
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Serviços" })).toBeInTheDocument();
    expect(screen.getByText("Conteúdo da seção")).toBeInTheDocument();
  });

  it("aplica o tom 'paper' quando solicitado (textura de seções claras — 3.9)", () => {
    const { container } = render(
      <Poster id="equipe" index="05" title="Equipe" tone="paper">
        <p>x</p>
      </Poster>
    );
    expect(container.querySelector("#equipe")?.className).toContain("bg-secondary");
  });
});
