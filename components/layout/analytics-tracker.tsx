"use client";

import { useEffect } from "react";

import { useScrollDepth } from "@/hooks/use-scroll-depth";
import {
  isTrackingAllowed,
  loadAnalyticsScript,
  subscribeConsent,
  trackEvent,
} from "@/lib/analytics";

/** Seletor de CTAs rastreáveis — links marcados com data-track-cta. */
const CTA_SELECTOR = "a[data-track-cta], button[data-track-cta]";

/**
 * Rastreador de KPIs (Fase 5.5 / PRD §3.2):
 * - profundidade de rolagem (useScrollDepth, 25/50/75/100%);
 * - cliques em CTAs marcados com `data-track-cta="nome"`.
 *
 * Os listeners ficam sempre ativos: o `trackEvent` (lib/analytics) faz o
 * no-op quando não há consentimento LGPD — assim o tracking passa a funcionar
 * imediatamente após o visitante aceitar o banner (sem precisar recarregar).
 */
export function AnalyticsTracker() {
  useScrollDepth();

  // Injeta o script do provider assim que o consentimento for aceito — cobre
  // tanto o aceite no banner quanto uma visita com decisão já gravada (5.5).
  useEffect(() => {
    const maybeLoad = () => {
      if (isTrackingAllowed()) loadAnalyticsScript();
    };
    maybeLoad();
    return subscribeConsent(maybeLoad);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const element = target?.closest<HTMLElement>(CTA_SELECTOR);
      const label = element?.dataset.trackCta;
      if (element && label) {
        trackEvent("cta_click", { label });
      }
    };

    // Delegação de clique no documento — cobre links/buttons adicionados depois.
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Componente sem UI própria.
  return null;
}
