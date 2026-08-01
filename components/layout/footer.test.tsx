import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "./footer";

describe("Footer (2.3)", () => {
  it("renderiza as três colunas: navegação, contato e redes sociais", () => {
    render(<Footer />);

    expect(
      screen.getByRole("navigation", { name: "Navegação do rodapé" })
    ).toBeInTheDocument();

    // Contatos (site.ts)
    expect(
      screen.getByRole("link", { name: "contato@trakassessoria.com.br" })
    ).toHaveAttribute("href", "mailto:contato@trakassessoria.com.br");

    // WhatsApp com URL pré-preenchida (RF-09)
    const whatsapp = screen.getByRole("link", { name: "+55 11 99999-0000" });
    expect(whatsapp).toHaveAttribute("href", expect.stringContaining("wa.me/5511999990000"));
    expect(whatsapp).toHaveAttribute("target", "_blank");

    // Redes sociais abrem em nova aba com segurança
    const instagram = screen.getByRole("link", { name: /Instagram/ });
    expect(instagram).toHaveAttribute("href", "https://instagram.com/trakassessoria");
    expect(instagram).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renderiza todos os links de navegação âncora do site", () => {
    render(<Footer />);
    for (const label of ["Início", "Serviços", "Projetos", "Equipe", "Contato"]) {
      expect(
        screen.getByRole("link", { name: new RegExp(label) })
      ).toBeInTheDocument();
    }
  });

  it("exibe link de Política de Privacidade apontando para /privacidade (RNF-08)", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "Política de Privacidade" });
    expect(link).toHaveAttribute("href", "/privacidade");
  });
});
