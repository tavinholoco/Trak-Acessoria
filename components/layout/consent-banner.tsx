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
 * Formato: barra de largura total colada na base, no vermelho da marca
 * (`tone-primary`). Era um cartão flutuante centralizado com borda de 2px — a
 * única superfície da página fora do sistema de cor, e alta o bastante (168px
 * no desktop, 237px no mobile) para tornar cara a faixa que ela precisa
 * reservar. Em barra, a mesma mensagem cabe numa linha no desktop.
 *
 * A reserva de espaço continua sendo necessária, e não é detalhe estético: a
 * barra é `fixed`, então cobria a última linha do rodapé — inclusive o link
 * "Política de Privacidade", justamente para onde o aviso manda o visitante.
 * Com a página rolada até o fim não havia como tirar o link de baixo dela, e o
 * clique não chegava nele. O espaçador irmão mede a barra e devolve a altura ao
 * fluxo, dando folga de rolagem enquanto o aviso estiver na tela. Encolher a
 * barra reduz essa faixa; nenhum formato de elemento fixo elimina.
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
        className="tone-primary fixed inset-x-0 bottom-0 z-50 border-t-2 border-foreground/40"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10">
          <p className="max-w-3xl font-sans text-sm leading-relaxed">
            Usamos análise anônima — profundidade de rolagem e cliques — para
            melhorar a página. Seus dados não são vendidos.{" "}
            <a
              href="/privacidade"
              className="font-bold underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Saiba mais na Política de Privacidade
            </a>
            .
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setConsent("accepted")}
              // `hover:opacity-85`: no vermelho, o hover padrão do botão iria
              // para `bg-foreground`, que aqui é o mesmo creme do estado normal.
              className={cn(buttonVariants({ size: "sm" }), "hover:opacity-85")}
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
        </div>
      </aside>

      {/* Espaço no fluxo equivalente à barra — ver nota acima. */}
      <div aria-hidden="true" style={{ height: alturaReservada }} />
    </>
  );
}
