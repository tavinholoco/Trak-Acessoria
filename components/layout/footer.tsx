import Link from "next/link";

import { site, whatsappUrl } from "@/data/site";

/**
 * Footer (2.3): marca, navegação, contatos, redes sociais e créditos.
 * Componente de servidor — sem estado.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-10">
        {/* Marca */}
        <div className="mb-14 border-b border-border pb-12">
          <p className="font-display text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
            Trak<span className="text-primary">✦</span>
          </p>
          <p className="mt-4 max-w-sm font-sans text-sm text-muted-foreground">
            {site.tagline} Assessoria para empresas e profissionais do mercado
            de arte.
          </p>
        </div>

        {/* Colunas */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Navegação */}
          <nav aria-label="Navegação do rodapé" className="flex flex-col gap-3">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Navegação
            </h2>
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contatos */}
          <div className="flex flex-col gap-3">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Contato
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="font-sans text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary"
            >
              {site.email}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary"
            >
              {site.whatsapp.display}
            </a>
          </div>

          {/* Redes sociais */}
          <div className="flex flex-col gap-3">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Redes sociais
            </h2>
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary"
              >
                {social.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Créditos */}
        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-muted-foreground">
            © {year} {site.name}. Projeto de portfólio — dados fictícios.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {/* Política de Privacidade — LGPD (RNF-08 / Fase 5.6) */}
            <Link
              href="/privacidade"
              className="font-sans text-xs font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
            >
              Política de Privacidade
            </Link>
            <p className="font-sans text-xs text-muted-foreground">
              Divulgação · Recursos · Cultura
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
