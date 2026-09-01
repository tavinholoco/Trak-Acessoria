import type { TeamMember } from "@/types";

/**
 * Equipe da Trak (RF-06 / Fase 3.5) — bloco editorial com integrantes.
 * Conteúdo fictício (projeto de portfólio).
 */
export const team: TeamMember[] = [
  {
    id: "ana-souza",
    name: "Ana Souza",
    role: "Fundadora · Estratégia",
    bio: "Mais de 12 anos entre galerias e produtoras culturais. Une visão de negócio e sensibilidade artística para desenhar planos que fazem sentido na prática.",
    focus: ["Estratégia", "Negócios"],
  },
  {
    id: "carlos-lima",
    name: "Carlos Lima",
    role: "Captação de Recursos",
    bio: "Especialista em editais e leis de incentivo. Já captou mais de R$ 8M para projetos culturais, e conhece cada etapa, da inscrição à prestação de contas.",
    focus: ["Editais", "Incentivo"],
  },
  {
    id: "marina-prado",
    name: "Marina Prado",
    role: "Curadoria e Acervo",
    bio: "Curadora e historiadora da arte. Organiza acervos, escreve textos críticos e constrói narrativas que valorizam cada obra dentro e fora da galeria.",
    focus: ["Curadoria", "Acervo"],
  },
  {
    id: "pedro-nunes",
    name: "Pedro Nunes",
    role: "Marketing Cultural",
    bio: "Estrategista de marca e comunicação para o mercado de arte. Transforma a presença digital em pontes reais entre artistas, galerias e colecionadores.",
    focus: ["Marca", "Comunicação"],
  },
];
