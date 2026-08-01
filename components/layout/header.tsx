"use client";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";
import { useActiveSection } from "@/hooks/use-section-observer";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";

/** Referência estável dos ids — o hook depende dela (ver use-section-observer). */
const NAV_IDS = site.nav.map((item) => item.href.slice(1));

/**
 * Header sticky (RF-01/RF-02): logo, navegação âncora, CTA e toggle de tema.
 * Destaca o link da seção ativa conforme a rolagem.
 */
export function Header() {
  const scrolled = useScrollPosition(8);
  const activeId = useActiveSection(NAV_IDS);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background transition-colors",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-4 md:px-10">
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-baseline gap-1.5 font-display text-2xl font-black uppercase tracking-tight transition-colors hover:text-primary"
        >
          Trak<span className="text-primary">✦</span>
        </a>

        {/* Navegação desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {site.nav.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeId === id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  // Texto sempre em foreground: vermelho (#D41F16) sobre preto
                  // fica em 3.65:1 (< AA 4.5:1). O ativo é indicado pelo
                  // sublinhado vermelho — acento de marca sem quebrar contraste.
                  "px-3 py-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary",
                  isActive &&
                    "underline decoration-primary decoration-2 underline-offset-4"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contato"
            className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
          >
            Falar conosco
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
