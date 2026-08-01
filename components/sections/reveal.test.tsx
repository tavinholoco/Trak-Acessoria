import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Reveal } from "./reveal";

describe("Reveal (RF-11 / Fase 3.10)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renderiza os filhos", () => {
    render(<Reveal>Conteúdo</Reveal>);
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });

  it("revela o conteúdo quando intersecta a viewport", () => {
    // Captura a callback do IntersectionObserver para simular a interseção.
    let callback: IntersectionObserverCallback | undefined;
    class MockObserver {
      constructor(cb: IntersectionObserverCallback) {
        callback = cb;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    vi.stubGlobal("IntersectionObserver", MockObserver);

    const { container } = render(<Reveal>Conteúdo</Reveal>);
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("opacity-0");

    act(() => {
      callback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(wrapper?.className).toContain("opacity-100");
  });

  it("mostra o conteúdo imediatamente com prefers-reduced-motion", () => {
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

    const { container } = render(<Reveal>Conteúdo</Reveal>);
    expect(container.firstElementChild?.className).toContain("opacity-100");
  });
});
