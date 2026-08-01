import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { faq } from "@/data/faq";
import { Faq } from "./faq";

describe("Faq (Fase 3.7 / RF-07)", () => {
  it("renderiza todas as perguntas a partir de data/faq.ts", () => {
    render(<Faq />);

    for (const item of faq) {
      expect(
        screen.getByRole("button", { name: item.question })
      ).toBeInTheDocument();
    }
  });

  it("abre a resposta ao clicar no accordion (interação acessível)", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const trigger = screen.getByRole("button", { name: faq[0].question });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    // Base UI mantém o painel montado (animação de altura) — o estado
    // acessível é o que prova a expansão única por vez (RF-07).
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(faq[0].answer)).toBeInTheDocument();
  });
});
