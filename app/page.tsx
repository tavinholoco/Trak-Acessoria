import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

const marqueeItems = [
  "Divulgação",
  "Recursos",
  "Cultura",
  "Editais",
  "Curadoria",
  "Marca",
];

export default function Home() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground texture-grain">
      {/* Hero pôster */}
      <section className="relative flex min-h-[92dvh] flex-col justify-between px-4 py-6 md:px-10">
        {/* Topo */}
        <div className="flex items-center justify-between border-b border-border pb-4 font-sans text-xs font-bold uppercase tracking-[0.25em]">
          <span>Trak Assessoria</span>
          <span className="hidden sm:inline">Divulgação · Recursos</span>
        </div>

        {/* Tipografia gigante */}
        <div className="flex flex-col">
          <h1 className="display-1">
            <span className="block">Arte é</span>
            <span className="block text-primary">Negócio.</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/storyboard" className={buttonVariants({ size: "sm" })}>
              SEE THE WORK
            </Link>
            <Link
              href="https://wa.me/5511999990000"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              FALAR CONOSCO
            </Link>
          </div>
        </div>

        {/* Rodapé do hero */}
        <p className="max-w-sm font-sans text-sm text-muted-foreground">
          Assessoria para empresas de arte — posicionamento, divulgação e captação
          de recursos para quem faz cultura acontecer.
        </p>
      </section>

      {/* Marquee */}
      <section
        aria-hidden="true"
        className="border-y border-border bg-primary py-4 text-background"
      >
        <div className="flex min-w-full w-max animate-marquee gap-0 whitespace-nowrap">
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
    </main>
  );
}
