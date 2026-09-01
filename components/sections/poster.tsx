import type { ReactNode } from "react";

import { PosterToneProvider } from "@/components/sections/poster-tone";
import { cn } from "@/lib/utils";

interface PosterProps {
  /** Id da âncora (RF-01) — o E2E smoke depende de servicos/projetos/equipe/contato. */
  id: string;
  /** Índice editorial do pôster (ex.: "03"). */
  index: string;
  title: string;
  /**
   * Fundo do pôster (Fase B.3). Cada tom reescreve os tokens de cor no
   * próprio <section>, então o conteúdo se re-tematiza sozinho:
   *
   * - `default` — o fundo da página
   * - `paper`   — degrau suave (`--secondary`), textura das seções claras (3.9)
   * - `invert`  — a paleta do tema oposto: papel no escuro, preto no claro
   * - `accent`  — o azul #1D3BFF da marca, igual nos dois temas
   */
  tone?: "default" | "paper" | "invert" | "accent";
  children: ReactNode;
}

/**
 * O `texture-lines` (linhas de papel impresso) entra em todos os tons menos o
 * azul: sobre um fundo saturado as linhas de 7px viram moiré e leem como
 * artefato de renderização, não como textura.
 */
const toneClass: Record<NonNullable<PosterProps["tone"]>, string> = {
  default: "texture-lines",
  paper: "texture-lines bg-secondary",
  invert: "texture-lines tone-invert",
  accent: "tone-accent",
};

/**
 * Só os tokens do tom, sem a pintura do bloco. Vai por contexto até as
 * superfícies que saem em Portal (o popup do Select) e por isso escapam da
 * herança das custom properties — ver poster-tone.tsx.
 */
const toneTokens: Record<NonNullable<PosterProps["tone"]>, string> = {
  default: "",
  paper: "",
  invert: "tone-invert-tokens",
  accent: "tone-accent-tokens",
};

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
      className={cn("border-t border-border texture-grain", toneClass[tone])}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {/* Índice em mono (Fase B.1): o contraste de peso e de família
              contra o título em Fraunces 900 é a hierarquia — o número marca,
              o título fala. Vermelho em texto grande (AA 3:1 — PRD §9.3).
              O `data-slot` deixa o tom azul dar a ele um creme próprio sem
              precisar sequestrar o --primary da seção inteira. */}
          <span data-slot="poster-index" className="index-mono text-primary">
            {index}
          </span>
          <h2 id={`${id}-titulo`} className="display-2">
            {title}
          </h2>
        </div>
        <div className="mt-12 md:mt-16">
          <PosterToneProvider tone={toneTokens[tone]}>
            {children}
          </PosterToneProvider>
        </div>
      </div>
    </section>
  );
}
