import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { privacy } from "@/data/privacidade";
import { whatsappUrl } from "@/data/site";

/** Política de Privacidade (RNF-08 / Fase 5.6) — LGPD. */
export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Trak Assessoria em conformidade com a LGPD — como tratamos os dados pessoais enviados pelo formulário de contato.",
};

/**
 * Página /privacidade — Política de Privacidade (LGPD).
 * Conteúdo vindo de data/privacidade.ts (RNF-04); layout de pôster editorial
 * coerente com a identidade (§9). Server component, sem estado.
 */
export default function PrivacidadePage() {
  return (
    <main className="min-h-dvh bg-background text-foreground texture-grain">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-10 md:py-24">
        {/* Cabeçalho */}
        <header className="border-b border-border pb-10">
          <p className="mb-6 label-mono text-muted-foreground">
            Última atualização · {privacy.updatedAt}
          </p>
          <h1 className="display-1">
            Política de
            <br />
            <span className="text-primary">Privacidade</span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base text-muted-foreground">
            Como a {privacy.controller.name} trata os seus dados pessoais, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
            13.709/2018).
          </p>
        </header>

        {/* Seções da política */}
        <div className="flex flex-col gap-12 py-12">
          {privacy.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-titulo`}
              className="flex flex-col gap-4"
            >
              <h2
                id={`${section.id}-titulo`}
                className="font-display text-2xl font-black uppercase leading-none tracking-tight md:text-3xl"
              >
                {section.title}
              </h2>
              {section.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-sans text-base leading-relaxed text-foreground/90"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Rodapé da página */}
        <footer className="flex flex-col gap-6 border-t border-border pt-10">
          <p className="font-sans text-sm text-muted-foreground">
            Dúvidas? Fale com a {privacy.controller.name} pelo e-mail{" "}
            <a
              href={`mailto:${privacy.controller.email}`}
              className="font-bold text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary"
            >
              {privacy.controller.email}
            </a>{" "}
            ou WhatsApp{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary"
            >
              {privacy.controller.whatsapp}
            </a>
            .
          </p>
          <div>
            <Link href="/" className={buttonVariants({ size: "sm" })}>
              ← VOLTAR AO INÍCIO
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
