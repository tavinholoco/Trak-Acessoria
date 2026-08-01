import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { services } from "@/data/services";
import { Services } from "./services";

describe("Services (Fase 3.3 / RF-03)", () => {
  it("renderiza os 6 serviços a partir de data/services.ts", () => {
    render(<Services />);

    for (const service of services) {
      expect(
        screen.getByRole("heading", { name: service.title })
      ).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
      for (const highlight of service.highlights) {
        // getAllByText: destaques podem se repetir entre serviços
        // (ex.: "Prestação de contas" em Captação e Gestão de Projetos).
        expect(screen.getAllByText(new RegExp(highlight)).length).toBeGreaterThan(0);
      }
    }
  });

  it("mantém a âncora #servicos", () => {
    render(<Services />);
    expect(screen.getByRole("region")).toHaveAttribute("id", "servicos");
  });
});
