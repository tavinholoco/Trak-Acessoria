import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "./hero";

describe("Hero (Fase 3.1)", () => {
  it("mantém a âncora #inicio e o título gigante (E2E depende)", () => {
    render(<Hero />);

    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("id", "inicio");
    expect(
      screen.getByRole("heading", { level: 1, name: /Negócio/ })
    ).toBeInTheDocument();
  });

  it("tem os dois CTAs de âncora (RF-01)", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: "VER SERVIÇOS" })).toHaveAttribute(
      "href",
      "#servicos"
    );
    expect(screen.getByRole("link", { name: "FALAR CONOSCO" })).toHaveAttribute(
      "href",
      "#contato"
    );
  });
});
