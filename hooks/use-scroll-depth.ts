"use client";

import { useEffect } from "react";

import { isTrackingAllowed, trackEvent } from "@/lib/analytics";

/** Marcos de profundidade de rolagem monitorados (KPIs PRD §3.2). */
export const SCROLL_DEPTH_MILESTONES = [25, 50, 75, 100] as const;

/**
 * Rastreia profundidade de rolagem (25/50/75/100%) disparando um evento por
 * marco (uma única vez cada).
 *
 * O listener fica sempre ativo; sem consentimento LGPD nada é registrado
 * (nem marcado como alcançado). Assim, quem aceita o banner no meio da
 * rolagem passa a ter o range completo medido a partir do aceite — sem
 * registrar atividade pré-consentimento (privacy-first).
 */
export function useScrollDepth(): void {
  useEffect(() => {
    const reached = new Set<number>();

    const handleScroll = () => {
      // Sem consentimento: não marca nem rastreia (privacy-first).
      if (!isTrackingAllowed()) return;

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = Math.min(
        100,
        Math.round((window.scrollY / scrollable) * 100)
      );

      for (const milestone of SCROLL_DEPTH_MILESTONES) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent("scroll_depth", { depth: milestone });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
