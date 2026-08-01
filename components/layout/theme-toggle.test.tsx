import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeToggle } from "./theme-toggle";

// vi.hoisted: o mock de next-themes roda antes da inicialização do módulo.
const themeState = vi.hoisted(() => ({
  resolvedTheme: "dark",
  setTheme: vi.fn((theme: string) => {
    themeState.resolvedTheme = theme;
  }),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: themeState.resolvedTheme,
    setTheme: themeState.setTheme,
  }),
}));

describe("ThemeToggle (RF-10)", () => {
  beforeEach(() => {
    themeState.resolvedTheme = "dark";
    themeState.setTheme.mockClear();
  });

  it("no tema escuro mostra o botão para ativar o modo claro", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: "Ativar modo claro" })
    ).toBeInTheDocument();
  });

  it("alterna para light ao clicar (e o rótulo reage)", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Ativar modo claro" }));

    expect(themeState.setTheme).toHaveBeenCalledWith("light");

    // Re-renderiza para o mock de next-themes propagar o novo tema.
    rerender(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: "Ativar modo escuro" })
    ).toBeInTheDocument();
  });

  it("no tema claro mostra o botão para ativar o modo escuro", () => {
    themeState.resolvedTheme = "light";
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: "Ativar modo escuro" })
    ).toBeInTheDocument();
  });
});
