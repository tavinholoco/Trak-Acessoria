import { Faq } from "@/components/sections/faq";
import { Poster } from "@/components/sections/poster";
import { Reveal } from "@/components/sections/reveal";
import { buttonVariants } from "@/components/ui/button";
import { site, whatsappUrl } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Bloco de contato (Fase 3.6 / RF-09): informações, WhatsApp e FAQ.
 * O formulário (RF-08) chega na Fase 4 — placeholder documentado abaixo.
 */
export function Contact() {
  return (
    <Poster id="contato" index="06" title="Contato" tone="paper">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col gap-6">
            <p className="max-w-md font-sans text-sm text-muted-foreground">
              Vamos conversar sobre o seu negócio de arte? Conte sobre o seu
              momento e a gente desenha o próximo passo junto com você.
            </p>

            <div className="flex flex-col gap-3 border-t border-border pt-6">
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
                WhatsApp {site.whatsapp.display}
              </a>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "w-fit")}
            >
              FALAR NO WHATSAPP
            </a>

            <ul className="flex flex-wrap gap-4 border-t border-border pt-6">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>

            {/* RF-08: formulário de contato chega na Fase 4 */}
            <p className="border border-dashed border-border p-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Formulário de contato em breve
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Faq />
        </Reveal>
      </div>
    </Poster>
  );
}
