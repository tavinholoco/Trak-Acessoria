import { site } from "./site";

/**
 * Política de Privacidade (RNF-08 / Fase 5.6) — LGPD.
 * Conteúdo isolado em data/* (RNF-04): edite aqui sem tocar em componentes.
 * Projeto de portfólio — dados fictícios; texto de exemplo para demonstração.
 */

/** Seção da política — parágrafos renderizados sob um título. */
export interface PrivacySection {
  /** Chave única (âncora da seção). */
  id: string;
  title: string;
  /** Parágrafos do texto. */
  body: string[];
}

export const privacy = {
  /** Data da última atualização (formato pt-BR). */
  updatedAt: "01/08/2026",

  /** Controlador de dados — a própria Trak Assessoria (fictícia). */
  controller: {
    name: site.name,
    email: site.email,
    whatsapp: site.whatsapp.display,
  },

  /**
   * Seções da política. O formulário de contato (RF-08) coleta os dados
   * listados na seção "dados-coletados"; cookies/analytics não estão ativos
   * (M4 da Fase 5) — a seção documenta o compromisso de consentimento.
   */
  sections: [
    {
      id: "introducao",
      title: "1. Quem somos",
      body: [
        `A ${site.name} é uma assessoria para empresas e profissionais do mercado de arte. Esta política explica como tratamos os dados pessoais de quem visita nosso site ou entra em contato conosco, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).`,
        "Ao utilizar este site, você concorda com as práticas descritas nesta política. Se não concordar, recomendamos não enviar dados pelo formulário e entrar em contato por outros meios.",
      ],
    },
    {
      id: "dados-coletados",
      title: "2. Dados que coletamos",
      body: [
        "Coletamos apenas os dados que você fornece voluntariamente pelo formulário de contato: nome, e-mail, tipo de empresa e mensagem. Não coletamos dados sensíveis, dados de pagamento ou informações de navegação para fins de perfilamento.",
        "Esses dados são usados exclusivamente para responder à sua solicitação e iniciar uma conversa comercial — nunca para envio de marketing sem o seu consentimento.",
      ],
    },
    {
      id: "base-legal",
      title: "3. Base legal e finalidade",
      body: [
        "O tratamento dos dados do formulário tem como base legal o consentimento (art. 7º, I, da LGPD) e o legítimo interesse em atender a solicitações de contato (art. 7º, IX).",
        "Os dados são utilizados apenas para: responder mensagens, agendar conversas de diagnóstico e enviar propostas quando solicitado.",
      ],
    },
    {
      id: "compartilhamento",
      title: "4. Compartilhamento e armazenamento",
      body: [
        "O envio do formulário é encaminhado por e-mail através de um provedor de e-mail transacional (Resend). Seus dados não são vendidos, alugados ou compartilhados com terceiros para fins comerciais.",
        "Os dados são mantidos apenas pelo tempo necessário ao atendimento da solicitação. Você pode solicitar a exclusão a qualquer momento, conforme seus direitos (seção 6).",
      ],
    },
    {
      id: "cookies-analytics",
      title: "5. Cookies e analytics",
      body: [
        "Este site não utiliza cookies de rastreamento nem ferramentas de análise de audiência sem o seu consentimento prévio. Ferramentas opcionais de medição de audiência (como Plausible ou GA4), quando adotadas, serão ativadas somente após consentimento explícito e de forma anonimizada.",
        "Para monitorar a performance da página (Core Web Vitals — tempo de carregamento, estabilidade visual e interatividade), o site utiliza o Vercel Speed Insights, serviço da plataforma de hospedagem. Esse serviço coleta métricas anônimas de performance do navegador — sem cookies de rastreamento, sem dados pessoais e sem perfilamento — e dispensa consentimento nos termos do art. 7º, IX, da LGPD (legítimo interesse na qualidade do serviço).",
        "O modo escuro e as preferências de tema são armazenadas localmente no seu navegador (localStorage) e não são enviadas aos nossos servidores.",
      ],
    },
    {
      id: "direitos",
      title: "6. Seus direitos (LGPD)",
      body: [
        "Conforme os arts. 18 a 20 da LGPD, você pode solicitar, a qualquer momento: confirmação do tratamento, acesso aos dados, correção, anonimização ou exclusão, portabilidade e revogação do consentimento.",
        "Para exercer qualquer um desses direitos, entre em contato pelos canais da seção 7. Responderemos em até 15 dias, conforme previsto em lei.",
      ],
    },
    {
      id: "contato",
      title: "7. Contato do controlador",
      body: [
        `Para dúvidas, solicitações ou reclamações sobre o tratamento dos seus dados, fale com a ${site.name} pelo e-mail ${site.email} ou pelo WhatsApp ${site.whatsapp.display}.`,
        "Esta política pode ser atualizada periodicamente. A data da última revisão está indicada no início da página.",
      ],
    },
  ] satisfies PrivacySection[],
} as const;
