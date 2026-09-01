"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  getConsent,
  isAnalyticsConfigured,
  setConsent,
  subscribeConsent,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Só exibe quando há analytics configurado E nenhuma decisão tomada. */
function snapshotConsentVisible(): boolean {
  return isAnalyticsConfigured() && getConsent() === null;
}

/**
 * Banner de consentimento LGPD (Fase 5.5 / RNF-08). Privacy-first:
 * - Sem provider configurado (`NEXT_PUBLIC_ANALYTICS`) → não renderiza nada.
 * - Visitante que já decidiu (localStorage) → não incomoda de novo.
 * - "Aceitar" habilita o tracking; "Recusar" mantém tudo desligado.
 * - `useSyncExternalStore` re-renderiza na hora da decisão (subscribeConsent).
 *
 * O painel é `fixed` na base da tela e, sem reservar espaço, cobria a última
 * linha do rodapé — inclusive o link "Política de Privacidade", que é
 * justamente para onde o banner manda o visitante. Com a página rolada até o
 * fim o link ficava atrás do painel e o clique não chegava nele. Por isso o
 * espaçador irmão: ele mede o painel e devolve a altura ao fluxo, empurrando o
 * rodapé para cima enquanto o aviso estiver na tela.
 */
export function ConsentBanner() {
  const visible = useSyncExternalStore(
    subscribeConsent,
    snapshotConsentVisible,
    // No servidor (SSR) nunca exibe — evita flash/hydration mismatch.
    () => false
  );

  const asideRef = useRef<HTMLElement>(null);
  const [alturaReservada, setAlturaReservada] = useState(0);

  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;

    // O setState sai da callback do observer (atualização assíncrona), não do
    // corpo do efeito — mesma regra seguida em Reveal (set-state-in-effect).
    const observer = new ResizeObserver(() => {
      // +16px = o `bottom-4` que afasta o painel da borda da janela.
      setAlturaReservada(el.getBoundingClientRect().height + 16);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <aside
        ref={asideRef}
        role="region"
        aria-label="Aviso de privacidade e consentimento de análise"
        className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl border-2 border-border bg-background p-5 texture-grain"
      >
        <p className="font-sans text-sm leading-relaxed text-foreground">
          Usamos uma ferramenta de análise anônima para entender como a página é
          usada (profundidade de rolagem e cliques), melhorando a experiência.
          Seus dados não são vendidos.{" "}
          <a
            href="/privacidade"
            className="font-bold underline decoration-primary underline-offset-4 transition-colors hover:text-primary"
          >
            Saiba mais na Política de Privacidade
          </a>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            ACEITAR
          </button>
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          >
            RECUSAR
          </button>
        </div>
      </aside>

      {/* Espaço no fluxo equivalente ao painel — ver nota acima. */}
      <div aria-hidden="true" style={{ height: alturaReservada }} />
    </>
  );
}
