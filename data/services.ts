import type { Service } from "@/types";

/**
 * Oferta de serviços da Trak (RF-03 / Fase 3.3).
 * PRD §6.3: 6 serviços — conteúdo fictício (projeto de portfólio).
 */
export const services: Service[] = [
  {
    id: "gestao-financeira",
    index: "01",
    title: "Gestão Financeira",
    description:
      "Fluxo de caixa, precificação de obras e planejamento tributário para o negócio de arte respirar e crescer com previsibilidade.",
    highlights: ["Fluxo de caixa e precificação", "Planejamento tributário", "Controles sob medida"],
  },
  {
    id: "captacao-e-editais",
    index: "02",
    title: "Captação e Editais",
    description:
      "Identificação de oportunidades, escrita de projetos e acompanhamento de editais e leis de incentivo — do edital à prestação de contas.",
    highlights: ["Editais e leis de incentivo", "Escrita de projetos", "Prestação de contas"],
  },
  {
    id: "curadoria-e-acervo",
    index: "03",
    title: "Curadoria e Acervo",
    description:
      "Organização do acervo, catalogação e estratégias de comercialização que valorizam o trabalho e abrem novas frentes de venda.",
    highlights: ["Catalogação de acervo", "Estratégia de comercialização", "Documentação de obras"],
  },
  {
    id: "branding-e-marketing",
    index: "04",
    title: "Branding e Marketing Cultural",
    description:
      "Posicionamento de marca, presença digital e campanhas que conectam o trabalho artístico ao público e ao mercado certos.",
    highlights: ["Posicionamento de marca", "Presença digital", "Campanhas culturais"],
  },
  {
    id: "gestao-de-projetos",
    index: "05",
    title: "Gestão de Projetos",
    description:
      "Planejamento, orçamento, cronograma e execução de projetos culturais do início ao fim — com foco em resultado e prestação de contas.",
    highlights: ["Planejamento e orçamento", "Cronograma e execução", "Prestação de contas"],
  },
  {
    id: "assessoria-juridica",
    index: "06",
    title: "Assessoria Jurídica e Contratos",
    description:
      "Contratos de venda, consignação, cessão de imagem e formalização do negócio — segurança jurídica para criar sem medo.",
    highlights: ["Contratos de venda", "Consignação e cessão", "Formalização do negócio"],
  },
];
