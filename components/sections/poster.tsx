import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PosterProps {
  /** Id da âncora (RF-01) — o E2E smoke depende de servicos/projetos/equipe/contato. */
  id: string;
  /** Índice editorial do pôster (ex.: "03"). */
  index: string;
  title: string;
  /** "paper" = fundo de papel quente (textura das seções claras — 3.9). */
  tone?: "default" | "paper";
  children: ReactNode;
}

/**
 * Wrapper "cartaz" reutilizável (PRD §6 / E: Poster Design).
 * Cada seção é um pôster independente: índice grande, título display e
 * conteúdo. Server component — sem estado.
 */
export function Poster({ id, index, title, tone = "default", children }: PosterProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={cn("border-t border-border texture-lines", tone === "paper" && "bg-secondary")}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {/* Índice grande em vermelho: texto grande (AA 3:1 sobre preto — PRD §9.3). */}
          <span className="font-display text-5xl font-black leading-none text-primary md:text-7xl">
            {index}
          </span>
          <h2 id={`${id}-titulo`} className="display-2">
            {title}
          </h2>
        </div>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
