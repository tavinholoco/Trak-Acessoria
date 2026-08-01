import type { Project } from "@/types";

/**
 * Cases da seção Projetos (RF-05 / Fase 3.4).
 * PRD §6.4: grade de posters com métricas de destaque — conteúdo fictício.
 */
export const projects: Project[] = [
  {
    id: "galeria-bela-vista",
    index: "01",
    title: "Galeria Bela Vista",
    client: "Galeria de arte contemporânea",
    year: "2025",
    metric: { value: "+120%", label: "em vendas de acervo" },
    description:
      "Reposicionamento de marca e estratégia comercial que reorganizou o acervo, ampliou a base de colecionadores e acelerou as vendas.",
    art: "/art/paleta.svg",
  },
  {
    id: "atelie-coletivo-raiz",
    index: "02",
    title: "Ateliê Coletivo Raiz",
    client: "Ateliê de gravura",
    year: "2024",
    metric: { value: "R$ 2M", label: "captados via Lei Rouanet" },
    description:
      "Estruturação do projeto cultural, captação junto a empresas patrocinadoras e gestão completa da prestação de contas.",
    art: "/art/moeda.svg",
  },
  {
    id: "produtora-aurora",
    index: "03",
    title: "Produtora Aurora",
    client: "Produtora cultural",
    year: "2024",
    metric: { value: "7", label: "editais aprovados em um ano" },
    description:
      "Mapeamento de oportunidades, escrita de projetos e acompanhamento de fomento municipal, estadual e federal.",
    art: "/art/sol.svg",
  },
  {
    id: "artista-clara-mendes",
    index: "04",
    title: "Clara Mendes",
    client: "Artista visual",
    year: "2025",
    metric: { value: "×3", label: "no alcance das redes e vendas" },
    description:
      "Posicionamento de marca pessoal e campanhas de divulgação que alavancaram o lançamento de uma série autoral.",
    art: "/art/megafone.svg",
  },
];
