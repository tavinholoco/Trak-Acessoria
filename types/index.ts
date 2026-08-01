/**
 * Trak Assessoria — tipos compartilhados.
 * Usados pelos arquivos de conteúdo em data/* e pelos componentes de seção
 * (Fase 3). RNF-04: conteúdo isolado e tipado, sem `any`.
 */

/** Serviço da seção Serviços (RF-03) — 6 itens no PRD §6.3. */
export interface Service {
  /** Chave única (ex.: "gestao-financeira"). */
  id: string;
  /** Índice editorial do pôster (ex.: "01"). */
  index: string;
  title: string;
  description: string;
  /** Tópicos-chave exibidos como lista curta. */
  highlights: string[];
}

/** Case/obra da seção Projetos (RF-05) — grade de posters com métricas. */
export interface Project {
  id: string;
  index: string;
  title: string;
  /** Cliente/tipo de empresa (ex.: "Galeria de arte"). */
  client: string;
  year: string;
  /** Métrica de destaque (ex.: "+120% em vendas de acervo"). */
  metric: {
    value: string;
    label: string;
  };
  description: string;
  /** Caminho da ilustração SVG em public/art/ (ex.: "/art/moeda.svg"). */
  art: string;
}

/** Integrante da seção Equipe (RF-06). */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Áreas de atuação (tags). */
  focus: string[];
}

/** Item do FAQ (RF-07) — Accordion acessível. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
