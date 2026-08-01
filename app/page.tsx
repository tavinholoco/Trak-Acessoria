import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";

const marqueeItems = [
  "Divulgação",
  "Recursos",
  "Cultura",
  "Editais",
  "Curadoria",
  "Marca",
];

/** Alvos das âncoras (RF-01) ainda sem conteúdo — preenchidos na Fase 3. */
const placeholders = [
  { id: "servicos", index: "03", title: "Serviços" },
  { id: "projetos", index: "04", title: "Projetos" },
  { id: "equipe", index: "05", title: "Equipe" },
  { id: "contato", index: "06", title: "Contato" },
];

export default function Home() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground texture-grain">
      {/* Hero pôster — Fase 3.1 completa o conteúdo */}
      <section
        id="inicio"
        aria-labelledby="inicio-titulo"
        className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-between px-4 py-10 md:px-10"
      >
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

      {/* Marquee — Fase 3.2 completa o banner ilustrado */}
      <section
        aria-hidden="true"
        className="border-y border-border bg-primary py-4 text-background"
      >
        <div className="flex w-max min-w-full animate-marquee gap-0 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="display-2 mx-6 flex items-center gap-6"
                >
                  {item}
                  <span className="text-background/60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Seções-alvo das âncoras — conteúdo completo na Fase 3 */}
      {placeholders.map(({ id, index, title }) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-titulo`}
          className="border-t border-border"
        >
          <div className="px-4 py-20 md:px-10 md:py-28">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              {index} · {title}
            </p>
            <h2 id={`${id}-titulo`} className="display-2 mt-3">
              {title}
            </h2>
            {/* Fase 3: seção completa aqui */}
          </div>
        </section>
      ))}
    </main>
  );
}
