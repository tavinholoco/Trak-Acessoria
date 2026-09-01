import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Poster } from "@/components/sections/poster";
import { Reveal } from "@/components/sections/reveal";
import { faq } from "@/data/faq";
import { whatsappUrl } from "@/data/site";

/**
 * FAQ (Fase 3.7 / RF-07): accordion acessível a partir de data/faq.ts.
 * Expansão única por vez e navegação por teclado (Base UI).
 *
 * Fase A.6: era a coluna direita do bloco de Contato, onde ~300px de conteúdo
 * ocupavam uma coluna de ~700px — quase meia tela vazia. Agora é um pôster
 * próprio, com as perguntas em escala editorial.
 */
export function Faq() {
  return (
    <Poster id="duvidas" index="06" title="Dúvidas">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div className="flex flex-col gap-4">
            <h3 className="label-mono text-muted-foreground">
              Perguntas frequentes
            </h3>
            <p className="font-sans text-sm text-muted-foreground">
              As dúvidas que mais aparecem no primeiro contato, de quem
              atendemos a como funciona a conversa inicial.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track-cta="whatsapp-faq"
              className="w-fit label-mono text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
            >
              Não achou a sua? Pergunte ↗
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {/* Base UI: sem a prop multiple, o padrão é um item aberto por vez —
              expansão única (RF-07). */}
          <Accordion className="w-full border-y border-border">
            {faq.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="py-5 font-display text-xl font-black uppercase leading-tight tracking-tight transition-colors hover:text-primary md:py-6 md:text-3xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 font-sans text-sm text-muted-foreground md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Poster>
  );
}
