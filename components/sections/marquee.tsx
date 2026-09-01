import Image from "next/image";

import { bannerHeadline, marqueeItems } from "@/data/marquee";
import { cn } from "@/lib/utils";

/**
 * Ilustrações autorais do banner (Fase 3.8) — SVGs em public/art/.
 *
 * Fase B.4: cada peça carrega sua posição na colagem. Antes eram oito ícones
 * de 80px espalhados numa fileira regular de 1360px — o comentário prometia
 * "colagem psicodélica" e o que saía era uma linha de ícones. Agora as artes
 * vão de 176px a 288px, rotacionadas, sobrepostas por margem negativa e
 * desalinhadas na vertical; a fileira é mais larga que a tela e sangra nas
 * duas bordas (o <section> tem overflow-hidden).
 *
 * As classes são literais de propósito: o Tailwind precisa vê-las inteiras
 * no fonte para gerá-las.
 */
const bannerArt = [
  {
    src: "/art/megafone.svg",
    alt: "Megafone — divulgação",
    pos: "w-36 -rotate-12 md:w-80",
  },
  {
    src: "/art/moeda.svg",
    alt: "Moeda — recursos",
    pos: "-ml-8 w-28 translate-y-8 rotate-6 md:-ml-24 md:w-68 md:translate-y-16",
  },
  {
    src: "/art/paleta.svg",
    alt: "Paleta — arte",
    pos: "-ml-8 w-44 -translate-y-6 rotate-3 md:-ml-24 md:w-96 md:-translate-y-12",
  },
  {
    src: "/art/sol.svg",
    alt: "Sol — psicodelia",
    pos: "-ml-8 w-32 translate-y-5 -rotate-6 md:-ml-24 md:w-76 md:translate-y-10",
  },
  {
    src: "/art/flor.svg",
    alt: "Flor — orgânico",
    pos: "-ml-8 w-40 -translate-y-7 rotate-12 md:-ml-24 md:w-84 md:-translate-y-14",
  },
  {
    src: "/art/busto.svg",
    alt: "Busto — irreverência",
    pos: "-ml-8 w-28 translate-y-6 -rotate-3 md:-ml-24 md:w-68 md:translate-y-12",
  },
  {
    src: "/art/estrela.svg",
    alt: "Estrela — brilho",
    pos: "-ml-8 w-32 -translate-y-4 rotate-6 md:-ml-24 md:w-72 md:-translate-y-8",
  },
  {
    src: "/art/vinil.svg",
    alt: "Vinil — cultura",
    pos: "-ml-8 w-40 translate-y-7 -rotate-12 md:-ml-24 md:w-88 md:translate-y-14",
  },
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
      {/* `py-8`: com `display-2` (até 72px) e line-height 0.95, o `py-4`
          anterior deixava o til de "DIVULGAÇÃO" e a cedilha de "SERVIÇOS"
          saindo da faixa vermelha — e, fora dela, texto preto sobre fundo
          preto some (Fase A.3). */}
      <section
        aria-hidden="true"
        className="border-y border-border bg-primary py-8 text-background"
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

      {/* Banner ilustrado — colagem psicodélica (Fase 3.8 / B.4) */}
      <section
        aria-labelledby="banner-titulo"
        className="relative overflow-hidden border-b border-border bg-secondary texture-lines"
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 pt-14 md:px-10 md:pt-20">
          <h2 id="banner-titulo" className="display-2">
            {bannerHeadline}
          </h2>
          <p className="mt-4 max-w-md font-sans text-sm text-muted-foreground">
            Assessoria para quem faz cultura acontecer — do ateliê ao acervo.
          </p>
        </div>

        {/* Fileira em largura total: mais larga que a tela, centralizada e
            recortada pelas bordas do <section>. */}
        <div className="flex w-full items-center justify-center pt-6 pb-14 md:pt-4 md:pb-20">
          {bannerArt.map((art) => (
            <figure
              key={art.src}
              className={cn(
                "relative shrink-0 transition-transform duration-500 hover:z-10 hover:scale-110 hover:rotate-0",
                art.pos
              )}
            >
              {/* SVGs vetoriais autorais (Fase 5.4): lazy por padrão */}
              <Image
                src={art.src}
                alt={art.alt}
                width={1024}
                height={1024}
                unoptimized
                className="h-auto w-full"
              />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
