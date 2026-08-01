import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Parallax } from "./parallax";

describe("Parallax (RF-11 / Fase 3.10)", () => {
  it("renderiza os filhos", () => {
    render(<Parallax>Conteúdo</Parallax>);
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });

  it("sem prefers-reduced-motion aplica transform de deslocamento", () => {
    const { container } = render(<Parallax speed={24}>Conteúdo</Parallax>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.transform).toContain("translate3d");
  });

  it("com prefers-reduced-motion não aplica movimento", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))
    );

    const { container } = render(<Parallax speed={24}>Conteúdo</Parallax>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.transform).toBe("translate3d(0, 0px, 0)");
    vi.unstubAllGlobals();
  });
});
