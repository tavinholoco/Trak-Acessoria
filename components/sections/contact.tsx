import { ContactForm } from "@/components/sections/contact-form";
import { Poster } from "@/components/sections/poster";
import { Reveal } from "@/components/sections/reveal";
import { buttonVariants } from "@/components/ui/button";
import { site, whatsappUrl } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Bloco de contato (Fase 3.6 / RF-09 + RF-08): informações de contato e
 * WhatsApp à esquerda, formulário (Fase 4) à direita.
 *
 * Fase A.6: antes as duas colunas eram "tudo à esquerda" (descrição, contatos,
 * CTA, redes e o formulário inteiro empilhados) contra o FAQ à direita — que
 * preenchia menos da metade da coluna. O FAQ virou pôster próprio e as duas
 * colunas passaram a ter alturas comparáveis.
 */
export function Contact() {
  return (
    <Poster id="contato" index="07" title="Contato" tone="invert">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal className="h-full">
          <div className="flex h-full flex-col gap-8">
            <p className="max-w-md font-sans text-sm text-muted-foreground">
              Vamos conversar sobre o seu negócio de arte? Conte sobre o seu
              momento e a gente desenha o próximo passo junto com você.
            </p>

            <div className="flex flex-col gap-3 border-t border-border pt-6">
              <a
                href={`mailto:${site.email}`}
                className="label-mono-lg transition-colors hover:text-primary"
              >
                {site.email}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono-lg transition-colors hover:text-primary"
              >
                WhatsApp {site.whatsapp.display}
              </a>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track-cta="whatsapp"
              className={cn(buttonVariants({ size: "lg" }), "w-fit")}
            >
              FALAR NO WHATSAPP
            </a>

            {/* `mt-auto`: ancora as redes na base da coluna, para as duas
                colunas fecharem juntas em telas grandes. */}
            <ul className="mt-auto flex flex-wrap gap-4 border-t border-border pt-6">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-muted-foreground transition-colors hover:text-primary"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* RF-08: formulário de contato (Fase 4) */}
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </Poster>
  );
}
