import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { site, whatsappUrl } from "@/data/site";
import { Contact } from "./contact";

describe("Contact (Fase 3.6 / RF-09)", () => {
  it("mantém a âncora #contato e o bloco de contato", () => {
    render(<Contact />);

    expect(screen.getByRole("region")).toHaveAttribute("id", "contato");
    expect(
      screen.getByRole("link", { name: site.email })
    ).toHaveAttribute("href", `mailto:${site.email}`);
  });

  it("CTA de WhatsApp usa a URL pré-preenchida (RF-09)", () => {
    render(<Contact />);

    const whatsapp = screen.getByRole("link", { name: "FALAR NO WHATSAPP" });
    expect(whatsapp).toHaveAttribute("href", whatsappUrl);
    expect(whatsapp).toHaveAttribute("target", "_blank");
    expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("lista as redes sociais em nova aba", () => {
    render(<Contact />);

    for (const social of site.socials) {
      const link = screen.getByRole("link", { name: new RegExp(social.label) });
      expect(link).toHaveAttribute("href", social.href);
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("reserva o espaço do formulário para a Fase 4 (RF-08)", () => {
    render(<Contact />);
    expect(screen.getByText(/Formulário de contato/)).toBeInTheDocument();
  });
});
