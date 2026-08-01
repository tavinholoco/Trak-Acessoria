import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { setConsent } from "@/lib/analytics";

import { AnalyticsTracker } from "./analytics-tracker";

describe("AnalyticsTracker (Fase 5.5 — CTA clicks)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS", "plausible");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    window.localStorage.clear();
    // Limpa scripts injetados por loadAnalyticsScript — jsdom compartilhado.
    document.querySelectorAll("script[data-trak-analytics]").forEach((s) => s.remove());
    // Consistência com analytics.test.ts: um vi.fn() residual poderia
    // suprimir a instalação do stub da fila em um teste futuro.
    delete (window as { plausible?: unknown }).plausible;
  });

  it("rastreia clique em elemento com data-track-cta após aceite", () => {
    const plausible = vi.fn();
    (window as unknown as { plausible?: typeof plausible }).plausible = plausible;
    window.localStorage.setItem("trak:analytics-consent", "accepted");

    render(<AnalyticsTracker />);
    const cta = document.createElement("a");
    cta.dataset.trackCta = "whatsapp";
    document.body.appendChild(cta);

    fireEvent.click(cta);

    expect(plausible).toHaveBeenCalledWith("cta_click", {
      props: { label: "whatsapp" },
    });
    cta.remove();
  });

  it("ignora cliques sem consentimento (no-op)", () => {
    const plausible = vi.fn();
    (window as unknown as { plausible?: typeof plausible }).plausible = plausible;
    window.localStorage.setItem("trak:analytics-consent", "declined");

    render(<AnalyticsTracker />);
    const cta = document.createElement("a");
    cta.dataset.trackCta = "falar-conosco";
    document.body.appendChild(cta);

    fireEvent.click(cta);

    expect(plausible).not.toHaveBeenCalled();
    cta.remove();
  });

  it("injeta o script do provider ao aceitar o consentimento (5.5)", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_ANALYTICS_DOMAIN",
      "trak-assessoria.vercel.app"
    );

    render(<AnalyticsTracker />);
    expect(document.querySelector("script[data-trak-analytics]")).toBeNull();

    // Aceite via lib/analytics — notifica os assinantes (subscribeConsent).
    setConsent("accepted");

    const script = document.querySelector(
      "script[data-trak-analytics]"
    ) as HTMLScriptElement | null;
    expect(script).not.toBeNull();
    expect(script?.dataset.domain).toBe("trak-assessoria.vercel.app");
  });

  it("não injeta script quando o visitante recusou (5.5)", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_ANALYTICS_DOMAIN",
      "trak-assessoria.vercel.app"
    );
    window.localStorage.setItem("trak:analytics-consent", "declined");

    render(<AnalyticsTracker />);

    expect(document.querySelector("script[data-trak-analytics]")).toBeNull();
  });
});
