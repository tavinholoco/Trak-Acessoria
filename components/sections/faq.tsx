import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/faq";

/**
 * FAQ (Fase 3.7 / RF-07): accordion acessível a partir de data/faq.ts.
 * Expansão única por vez e navegação por teclado (Base UI).
 */
export function Faq() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
        Perguntas frequentes
      </h3>
      {/* Base UI: sem a prop multiple, o padrão é um item aberto por vez —
          expansão única (RF-07). */}
      <Accordion className="w-full">
        {faq.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="font-display text-lg font-black uppercase tracking-tight">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="font-sans text-sm text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
