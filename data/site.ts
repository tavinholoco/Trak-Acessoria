/**
 * Trak Assessoria — dados globais do site.
 * Conteúdo isolado em data/* (RNF-04): edite aqui sem tocar em componentes.
 *
 * Nome, e-mail e WhatsApp são fictícios (projeto de portfólio).
 */

export const site = {
  name: "Trak Assessoria",
  shortName: "Trak",
  tagline: "Arte é negócio.",
  description:
    "Assessoria para empresas de arte: divulgação, posicionamento e captação de recursos para quem faz cultura acontecer.",

  /**
   * URL pública do site — base para canonical, sitemap, robots e OG (RF-12).
   * Sem domínio próprio (decisão do cliente): sobrescreva via NEXT_PUBLIC_SITE_URL
   * no deploy (Vercel) ou use a URL padrão da Vercel.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://trak-acessoria.vercel.app",

  email: "contato@trakassessoria.com.br",

  whatsapp: {
    number: "5511999990000",
    display: "+55 11 99999-0000",
    message: "Olá! Vim pela página da Trak Assessoria e quero conversar.",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com/trakassessoria" },
    { label: "LinkedIn", href: "https://linkedin.com/company/trak-assessoria" },
    { label: "Behance", href: "https://behance.net/trakassessoria" },
  ],

  /** Navegação âncora (RF-01) — ordem = menu desktop, mobile e rodapé. */
  nav: [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Equipe", href: "#equipe" },
    { label: "Contato", href: "#contato" },
  ],
} as const;

/** URL direta do WhatsApp com mensagem pré-preenchida (RF-09). */
export const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
  site.whatsapp.message
)}`;
