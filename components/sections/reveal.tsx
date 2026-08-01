"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso da transição (ms) — útil para efeito cascata entre cards. */
  delay?: number;
}

/**
 * Reveal on scroll (RF-11 / Fase 3.10): revela o conteúdo com fade + slide
 * quando entra na viewport (IntersectionObserver). Com
 * `prefers-reduced-motion` o conteúdo aparece imediatamente, sem animação.
 *
 * A visibilidade é derivada de `reduced || visible` (sem setState síncrono em
 * efeito — regra react-hooks/set-state-in-effect); o setState só acontece
 * dentro da callback do observer (atualização assíncrona).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  const shown = reduced || visible;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        // invisible/visible: conteúdo oculto não pode receber foco de teclado
        // (opacity-0 sozinho ainda é focusable — RNF-02).
        shown ? "visible translate-y-0 opacity-100" : "invisible translate-y-8 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
