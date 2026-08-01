import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";

/**
 * Hero pôster (Fase 3.1): headline gigante (N1), 2 CTAs e indicadores de
 * autoridade. Server component. A seção tem a altura do conteúdo (sem
 * min-h de tela cheia + justify-between), para não sobrar vazio entre os
 * CTAs e o rodapé de autoridade em nenhuma resolução.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative flex flex-col gap-10 overflow-hidden px-4 py-10 md:px-10"
    >
      {/* Tipografia gigante */}
      <div className="flex flex-col pt-6 md:pt-10">
        <h1 id="inicio-titulo" className="display-hero">
          <span className="block">Arte é</span>
          <span className="block text-primary">Negócio.</span>
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#servicos"
            data-track-cta="ver-servicos"
            className={buttonVariants({ size: "sm" })}
          >
            VER SERVIÇOS
          </a>
          <a
            href="#contato"
            data-track-cta="falar-conosco"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            FALAR CONOSCO
          </a>
        </div>
      </div>

      {/* Indicador de autoridade */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border pt-4">
        <p className="max-w-sm font-sans text-sm text-muted-foreground">
          {site.description}
        </p>
        <a
          href="#servicos"
          className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
        >
          Role para ver ↓
        </a>
      </div>
    </section>
  );
}
