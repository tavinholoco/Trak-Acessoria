import Image from "next/image";

import { bannerHeadline, marqueeItems } from "@/data/marquee";
import { cn } from "@/lib/utils";

/** Ilustrações autorais do banner (Fase 3.8) — SVGs em public/art/. */
const bannerArt = [
  { src: "/art/megafone.svg", alt: "Megafone — divulgação" },
  { src: "/art/moeda.svg", alt: "Moeda — recursos" },
  { src: "/art/paleta.svg", alt: "Paleta — arte" },
  { src: "/art/sol.svg", alt: "Sol — psicodelia" },
  { src: "/art/flor.svg", alt: "Flor — orgânico" },
  { src: "/art/busto.svg", alt: "Busto — irreverência" },
  { src: "/art/estrela.svg", alt: "Estrela — brilho" },
  { src: "/art/vinil.svg", alt: "Vinil — cultura" },
];

/**
 * Marquee infinito + banner ilustrado (Fase 3.2 / RF-04).
 * A faixa de texto é decorativa (aria-hidden); o banner é acessível com
 * ilustrações autorais em colagem psicodélica (Fase 3.8).
 */
export function Marquee() {
  return (
    <>
      {/* Faixa de texto em movimento contínuo (RF-04) */}
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

      {/* Banner ilustrado — colagem psicodélica (Fase 3.8) */}
      <section
        aria-labelledby="banner-titulo"
        className="border-b border-border bg-secondary texture-lines"
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 py-14 md:px-10 md:py-20">
          <h2
            id="banner-titulo"
            className="font-display text-3xl font-black uppercase tracking-tight md:text-5xl"
          >
            {bannerHeadline}
          </h2>
          <p className="mt-4 max-w-md font-sans text-sm text-muted-foreground">
            Assessoria para quem faz cultura acontecer — do ateliê ao acervo.
          </p>
          <div className="mt-10 grid grid-cols-4 gap-4 sm:grid-cols-8">
            {bannerArt.map((art, i) => (
              <figure
                key={art.src}
                className={cn(
                  "group flex items-center justify-center transition-transform duration-300 hover:scale-110",
                  i % 2 === 0 ? "rotate-[-4deg]" : "rotate-[3deg]"
                )}
              >
                {/* SVGs vetoriais autorais (Fase 5.4): lazy por padrão */}
                <Image
                  src={art.src}
                  alt={art.alt}
                  width={1024}
                  height={1024}
                  unoptimized
                  className="h-14 w-14 md:h-20 md:w-20"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
