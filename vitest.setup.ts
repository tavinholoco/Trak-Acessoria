import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

/**
 * jsdom não implementa `matchMedia` — mock padrão para componentes que
 * consultam `prefers-reduced-motion` (useReducedMotion) e afins.
 */
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    // configurable: testes específicos sobrescrevem via vi.stubGlobal.
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock do IntersectionObserver (usado por useActiveSection / Header).
  class IntersectionObserverMock {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: number[] = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn();
  }
  Object.defineProperty(window, "IntersectionObserver", {
    // configurable: testes de Reveal sobrescrevem para simular interseção.
    configurable: true,
    writable: true,
    value: IntersectionObserverMock,
  });
}

// Desmonta a árvore e restaura mocks após cada teste.
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
