import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useScrollDepth, SCROLL_DEPTH_MILESTONES } from "./use-scroll-depth";

describe("useScrollDepth (Fase 5.5 — KPI profundidade de rolagem)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS", "plausible");
    window.localStorage.setItem("trak:analytics-consent", "accepted");

    // Viewport e documento roláveis (jsdom: propriedades via defineProperty).
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 4000,
    });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("dispara um evento por marco (25/50/75/100) uma única vez", async () => {
    const plausible = vi.fn();
    (window as unknown as { plausible?: typeof plausible }).plausible = plausible;

    renderHook(() => useScrollDepth());

    // total rolável = 4000 - 800 = 3200
    const simulateScroll = (y: number) => {
      Object.defineProperty(window, "scrollY", { configurable: true, value: y });
      window.dispatchEvent(new Event("scroll"));
    };

    simulateScroll(800); // 25%
    await waitFor(() =>
      expect(plausible).toHaveBeenCalledWith("scroll_depth", {
        props: { depth: 25 },
      })
    );

    simulateScroll(1600); // 50%
    await waitFor(() =>
      expect(plausible).toHaveBeenCalledWith("scroll_depth", {
        props: { depth: 50 },
      })
    );

    // Rolando de novo no mesmo marco: não duplica.
    plausible.mockClear();
    simulateScroll(900); // ainda ~28%
    simulateScroll(1000); // ainda ~31%
    expect(plausible).not.toHaveBeenCalled();
  });

  it("sem consentimento, o listener existe mas o trackEvent é no-op", () => {
    const plausible = vi.fn();
    (window as unknown as { plausible?: typeof plausible }).plausible = plausible;
    window.localStorage.setItem("trak:analytics-consent", "declined");

    const { unmount } = renderHook(() => useScrollDepth());

    Object.defineProperty(window, "scrollY", { configurable: true, value: 1600 });
    window.dispatchEvent(new Event("scroll"));

    expect(plausible).not.toHaveBeenCalled();
    unmount();
  });

  it("aceite dado DEPOIS do mount ativa o tracking (regressão do bug)", async () => {
    const plausible = vi.fn();
    (window as unknown as { plausible?: typeof plausible }).plausible = plausible;
    // Sem consentimento inicial — igual ao fluxo real (banner aparece).
    window.localStorage.setItem("trak:analytics-consent", "declined");

    const { unmount } = renderHook(() => useScrollDepth());

    // Rolar até 25% SEM consentimento: nada é registrado nem marcado.
    Object.defineProperty(window, "scrollY", { configurable: true, value: 800 });
    window.dispatchEvent(new Event("scroll"));
    expect(plausible).not.toHaveBeenCalled();

    // Visitante aceita o banner agora (pós-mount) — o listener já estava
    // ativo; a partir do aceite o range completo passa a ser medido.
    window.localStorage.setItem("trak:analytics-consent", "accepted");
    Object.defineProperty(window, "scrollY", { configurable: true, value: 1600 });
    window.dispatchEvent(new Event("scroll"));

    // 25% e 50% nunca foram marcados pré-consent → ambos disparam agora.
    await waitFor(() =>
      expect(plausible).toHaveBeenCalledWith("scroll_depth", {
        props: { depth: 25 },
      })
    );
    await waitFor(() =>
      expect(plausible).toHaveBeenCalledWith("scroll_depth", {
        props: { depth: 50 },
      })
    );
    unmount();
  });

  it("exibe os marcos esperados (constante de configuração)", () => {
    expect(SCROLL_DEPTH_MILESTONES).toEqual([25, 50, 75, 100]);
  });
});
