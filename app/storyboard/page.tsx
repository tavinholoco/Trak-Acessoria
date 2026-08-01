import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const palette = [
  { name: "Preto (background)", value: "#0F0F0F", hex: "#0F0F0F" },
  { name: "Branco quente (foreground)", value: "#F7F4EE", hex: "#F7F4EE" },
  { name: "Vermelho (primary)", value: "#E1261C", hex: "#E1261C" },
  { name: "Azul (accent)", value: "#1D3BFF", hex: "#1D3BFF" },
  { name: "Cinza quente (muted)", value: "#1C1C1C", hex: "#1C1C1C" },
  { name: "Muted-foreground", value: "#A9A295", hex: "#A9A295" },
];

const posters = [
  { label: "Vermelho", className: "bg-primary" },
  { label: "Azul", className: "bg-accent" },
  { label: "Cinza", className: "bg-secondary" },
  { label: "Papel", className: "bg-foreground text-background" },
];

export default function StoryboardPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground texture-grain">
      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-16 md:px-12">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <Badge variant="outline" className="mb-4 rounded-none font-sans">
              STORYBOARD — DEV ONLY
            </Badge>
            <h1 className="display-2">Trak<br />Design System</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
              ← Voltar ao site
            </Link>
          </div>
        </header>

        {/* 01 — Paleta */}
        <section aria-labelledby="paleta" className="flex flex-col gap-8">
          <div className="flex items-baseline gap-4">
            <span className="font-sans text-sm text-muted-foreground">01</span>
            <h2 id="paleta" className="display-2">Paleta</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {palette.map((color) => (
              <div key={color.name} className="flex flex-col gap-2">
                <div
                  className="aspect-[4/5] w-full border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-sans text-xs font-medium uppercase leading-tight text-foreground">
                  {color.name}
                </p>
                <p className="font-sans text-xs text-muted-foreground">{color.value}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* 02 — Tipografia */}
        <section aria-labelledby="tipografia" className="flex flex-col gap-8">
          <div className="flex items-baseline gap-4">
            <span className="font-sans text-sm text-muted-foreground">02</span>
            <h2 id="tipografia" className="display-2">Tipografia</h2>
          </div>
          <div className="flex flex-col gap-2 overflow-hidden border-y border-border py-8">
            <p className="display-1 -mb-2">TraK</p>
            <p className="display-1 text-primary">Quebra</p>
            <p className="display-1">Regras</p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="display-2">Nível 1 — 300–600px</h3>
              <p className="font-sans text-sm text-muted-foreground">
                Fraunces Black · caixa alta · tracking fechado · leading 0.88 · clamp até 600px
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-2xl font-bold uppercase tracking-tight">
                Nível 2 — 40–80px
              </h3>
              <p className="font-sans text-lg text-muted-foreground">
                Nível 3 — corpo 16–22px. Inter regular para leitura, contraste com a escala
                monumental da display. Frases longas, legendas e textos de apoio.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* 03 — Botões */}
        <section aria-labelledby="botoes" className="flex flex-col gap-8">
          <div className="flex items-baseline gap-4">
            <span className="font-sans text-sm text-muted-foreground">03</span>
            <h2 id="botoes" className="display-2">Botões</h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">SEE THE WORK</Button>
            <Button size="sm" variant="outline">FALAR CONOSCO</Button>
            <Button size="sm" variant="secondary">SAIBA MAIS</Button>
            <Button size="sm" variant="ghost">GHOST</Button>
            <Button size="sm" variant="destructive">DESTRUCTIVE</Button>
            <Button size="sm" variant="link">LINK →</Button>
          </div>
          <p className="font-sans text-sm text-muted-foreground">
            Vermelho, pequenos, sem sombra/gradiente/brilho — radius 0 ou 8px.
          </p>
        </section>

        <Separator />

        {/* 04 — Cards (só imagem) */}
        <section aria-labelledby="cards" className="flex flex-col gap-8">
          <div className="flex items-baseline gap-4">
            <span className="font-sans text-sm text-muted-foreground">04</span>
            <h2 id="cards" className="display-2">Cards / Posters</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {posters.map((poster) => (
              <Card
                key={poster.label}
                className="overflow-hidden rounded-none border-border bg-transparent"
              >
                <div className={`flex aspect-[3/4] items-end p-4 ${poster.className}`}>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest">
                    {poster.label}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <p className="font-sans text-sm text-muted-foreground">
            Cards de projetos: apenas imagem, sem bordas complexas. Radius 0.
          </p>
        </section>

        <Separator />

        {/* 05 — Texturas */}
        <section aria-labelledby="texturas" className="flex flex-col gap-8">
          <div className="flex items-baseline gap-4">
            <span className="font-sans text-sm text-muted-foreground">05</span>
            <h2 id="texturas" className="display-2">Texturas</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="texture-lines flex aspect-[3/2] items-center justify-center border border-border">
              <span className="font-sans text-xs font-bold uppercase">Linhas (papel impresso)</span>
            </div>
            <div className="texture-grain flex aspect-[3/2] items-center justify-center border border-border">
              <span className="font-sans text-xs font-bold uppercase">Grain leve</span>
            </div>
            <div className="bg-foreground flex aspect-[3/2] items-center justify-center text-background">
              <span className="font-sans text-xs font-bold uppercase">Papel quente</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-8 text-center">
          <p className="font-sans text-sm text-muted-foreground">
            Identidade provisória — aguardando aprovação do cliente.
          </p>
        </footer>
      </div>
    </main>
  );
}
