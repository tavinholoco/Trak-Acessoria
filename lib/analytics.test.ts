import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  CONSENT_KEY,
  getConsent,
  isAnalyticsConfigured,
  isTrackingAllowed,
  loadAnalyticsScript,
  setConsent,
  trackEvent,
} from "./analytics";

describe("analytics — consentimento LGPD (Fase 5.5)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS", "plausible");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    // Limpa scripts injetados por loadAnalyticsScript e o stub da fila —
    // o jsdom é compartilhado entre testes do mesmo arquivo.
    document.querySelectorAll("script[data-trak-analytics]").forEach((s) => s.remove());
    delete (window as { plausible?: unknown }).plausible;
  });

  it("isAnalyticsConfigured: true apenas com provider 'plausible'", () => {
    expect(isAnalyticsConfigured()).toBe(true);
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS", "ga4");
    expect(isAnalyticsConfigured()).toBe(false);
  });

  it("consentimento: null por padrão, persiste accepted/declined", () => {
    expect(getConsent()).toBeNull();
    setConsent("accepted");
    expect(getConsent()).toBe("accepted");
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("accepted");

    setConsent("declined");
    expect(getConsent()).toBe("declined");
  });

  it("isTrackingAllowed exige provider configurado E aceite", () => {
    // Sem decisão → não rastreia.
    expect(isTrackingAllowed()).toBe(false);

    setConsent("declined");
    expect(isTrackingAllowed()).toBe(false);

    setConsent("accepted");
    expect(isTrackingAllowed()).toBe(true);

    // Provider desligado → não rastreia mesmo com aceite.
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS", "");
    expect(isTrackingAllowed()).toBe(false);
  });

  it("trackEvent é no-op sem consentimento (nada é chamado)", () => {
    const plausible = vi.fn();
    (window as unknown as { plausible?: typeof plausible }).plausible = plausible;

    trackEvent("cta_click", { label: "whatsapp" });
    expect(plausible).not.toHaveBeenCalled();
  });

  it("trackEvent chama window.plausible com props após aceite", () => {
    const plausible = vi.fn();
    (window as unknown as { plausible?: typeof plausible }).plausible = plausible;
    setConsent("accepted");

    trackEvent("form_submit", { ok: true, source: "contato" });

    expect(plausible).toHaveBeenCalledTimes(1);
    expect(plausible).toHaveBeenCalledWith("form_submit", {
      props: { ok: true, source: "contato" },
    });
  });

  it("trackEvent não falha se window.plausible não existir (aceite)", () => {
    setConsent("accepted");
    expect(() => trackEvent("scroll_depth", { depth: 50 })).not.toThrow();
  });

  it("loadAnalyticsScript injeta o script do Plausible com o domínio (5.5)", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_DOMAIN", "trak-assessoria.vercel.app");
    loadAnalyticsScript();

    const script = document.querySelector(
      "script[data-trak-analytics]"
    ) as HTMLScriptElement | null;
    expect(script).not.toBeNull();
    expect(script?.src).toBe("https://plausible.io/js/script.js");
    expect(script?.dataset.domain).toBe("trak-assessoria.vercel.app");
  });

  it("loadAnalyticsScript é idempotente (não duplica o script)", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_DOMAIN", "trak-assessoria.vercel.app");
    loadAnalyticsScript();
    loadAnalyticsScript();
    const scripts = document.querySelectorAll("script[data-trak-analytics]");
    expect(scripts).toHaveLength(1);
  });

  it("loadAnalyticsScript usa URL customizada via env (self-hosted)", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_DOMAIN", "stats.exemplo.com.br");
    vi.stubEnv(
      "NEXT_PUBLIC_ANALYTICS_SCRIPT_URL",
      "https://stats.exemplo.com.br/js/script.js"
    );
    loadAnalyticsScript();

    const script = document.querySelector(
      "script[data-trak-analytics]"
    ) as HTMLScriptElement | null;
    expect(script?.src).toBe("https://stats.exemplo.com.br/js/script.js");
    expect(script?.dataset.domain).toBe("stats.exemplo.com.br");
  });

  it("loadAnalyticsScript é no-op sem domínio configurado", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_DOMAIN", "");
    loadAnalyticsScript();
    expect(document.querySelector("script[data-trak-analytics]")).toBeNull();
  });

  it("loadAnalyticsScript instala a fila (queue) do Plausible", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_DOMAIN", "trak-assessoria.vercel.app");
    loadAnalyticsScript();

    const w = window as unknown as {
      plausible?: (...args: unknown[]) => void;
    };
    expect(typeof w.plausible).toBe("function");
  });
});
