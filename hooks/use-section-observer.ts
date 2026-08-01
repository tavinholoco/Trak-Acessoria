"use client";

import { useEffect, useState } from "react";

/**
 * Observa as seções com os ids informados e retorna o id da seção atualmente
 * ativa — a que cruza uma faixa central da viewport (logo abaixo do header
 * sticky). Usado para destacar o link ativo na navegação (RF-01).
 *
 * O array `ids` deve ter referência estável (defina fora do componente).
 */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      // Faixa de ativação no meio da viewport (40% do topo ao 45% da base).
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
