"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParallaxProps {
  children: ReactNode;
  /** Intensidade do deslocamento em px (máximo). */
  speed?: number;
  className?: string;
}

/**
 * Parallax leve (RF-11 / Fase 3.10): desloca o conteúdo verticalmente
 * conforme a rolagem, com rAF (sem lib). Respeita `prefers-reduced-motion`
 * (fica parado). O transform usa translate3d para aproveitar GPU.
 */
export function Parallax({ children, speed = 24, className }: ParallaxProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (acima da viewport) → 1 (abaixo), com sinal invertido.
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
      setOffset(Math.round(-progress * speed));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, speed]);

  return (
    <div ref={ref} className={className} style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
      {children}
    </div>
  );
}
