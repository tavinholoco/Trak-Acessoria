"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site, whatsappUrl } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Menu mobile (RF-02): Sheet lateral com os links âncora + CTA.
 * Fechei o Sheet ao clicar em um link para não bloquear a rolagem suave.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-sm" className="lg:hidden" />
        }
      >
        <Menu />
        <span className="sr-only">Abrir menu de navegação</span>
      </SheetTrigger>

      {/* `w-full!` vence o `data-[side=right]:w-3/4` do componente (especificidade) */}
      <SheetContent side="right" className="w-full! bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-black uppercase tracking-tight">
            Trak<span className="text-primary">✦</span>
          </SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Navegação móvel"
          className="flex flex-col px-4 pt-2"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 font-sans text-lg font-bold uppercase tracking-wide transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 px-4 pb-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track-cta="whatsapp-mobile"
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            Falar no WhatsApp
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
