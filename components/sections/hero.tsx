import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";
import { Parallax } from "@/components/sections/parallax";

/**
 * Hero pôster (Fase 3.1): headline gigante (N1), espaço vazio dominante,
 * 2 CTAs e indicadores de autoridade. Server component.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-between overflow-hidden px-4 py-10 md:px-10"
    >
      {/* Parallax leve no sol da identidade (Fase 3.10) */}
      <Parallax
        speed={40}
        className="pointer-events-none absolute -right-10 top-24 hidden lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/sol.svg"
          alt=""
          aria-hidden="true"
          className="h-40 w-40 animate-spin-slow opacity-80"
        />
      </Parallax>

      {/* Tipografia gigante */}
      <div className="flex flex-col pt-6 md:pt-10">
        <h1 id="inicio-titulo" className="display-1">
          <span className="block">Arte é</span>
          <span className="block text-primary">Negócio.</span>
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#servicos" className={buttonVariants({ size: "sm" })}>
            VER SERVIÇOS
          </a>
          <a
            href="#contato"
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
