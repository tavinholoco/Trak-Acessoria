import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useReducedMotion } from "./use-reduced-motion";

/**
 * Instala um mock controlável de `matchMedia` para
 * `(prefers-reduced-motion: reduce)` e devolve os listeners registrados.
 */
function installMatchMedia(initialMatches: boolean) {
  const state = { matches: initialMatches };
  const listeners = new Set<EventListenerOrEventListenerObject>();

  const mql: MediaQueryList = {
    get matches() {
      return state.matches;
    },
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn(
      (_type: string, listener: EventListenerOrEventListenerObject) => {
        listeners.add(listener);
      }
    ),
    removeEventListener: vi.fn(
      (_type: string, listener: EventListenerOrEventListenerObject) => {
        listeners.delete(listener);
      }
    ),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  };

  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue(mql));

  return {
    setMatches(matches: boolean) {
      state.matches = matches;
      // O callback do hook ignora o argumento do evento — um Event simples basta.
      listeners.forEach((listener) => {
        if (typeof listener === "function") {
          listener(new Event("change"));
        }
      });
    },
  };
}

describe("useReducedMotion (RF-11)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("retorna false quando o usuário NÃO prefere movimento reduzido", () => {
    installMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("retorna true quando prefers-reduced-motion é reduce", () => {
    installMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("reage a mudanças na preferência (evento change)", () => {
    const { setMatches } = installMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => setMatches(true));
    expect(result.current).toBe(true);

    act(() => setMatches(false));
    expect(result.current).toBe(false);
  });
});
