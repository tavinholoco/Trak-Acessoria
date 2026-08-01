import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CONSENT_KEY } from "@/lib/analytics";
import { ConsentBanner } from "./consent-banner";

describe("ConsentBanner (Fase 5.5 — LGPD)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS", "plausible");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("não renderiza nada quando analytics não está configurado", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS", "");
    const { container } = render(<ConsentBanner />);
    expect(container).toBeEmptyDOMElement();
  });

  it("exibe o aviso quando não há decisão ainda", () => {
    render(<ConsentBanner />);
    expect(
      screen.getByRole("region", { name: /consentimento/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Política de Privacidade/ })
    ).toHaveAttribute("href", "/privacidade");
  });

  it("'ACEITAR' persiste a decisão e some com o banner", () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "ACEITAR" }));

    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("accepted");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("'RECUSAR' persiste a decisão e mantém o tracking desligado", () => {
    render(<ConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "RECUSAR" }));

    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("declined");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("não reexibe depois que o visitante já decidiu", () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    const { container } = render(<ConsentBanner />);
    expect(container).toBeEmptyDOMElement();
  });
});
