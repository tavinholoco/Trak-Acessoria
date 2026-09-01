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
 *
 * Duas sutilezas do cálculo:
 *
 * 1. O deslocamento é relativo à posição em que o componente montou, e não à
 *    posição absoluta na viewport. Sem isso o primeiro quadro do cliente
 *    difere do HTML do servidor (que sempre sai em 0) e o conteúdo dá um
 *    salto seco na hidratação — 84px no banner, medido.
 *
 * 2. `getBoundingClientRect()` devolve a caixa **já com o transform aplicado**,
 *    então medir sem descontar o offset atual realimenta o quadro anterior.
 */
export function Parallax({ children, speed = 24, className }: ParallaxProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    // Offset aplicado no momento da medição (ver nota 2).
    let aplicado = 0;
    // Progresso na montagem, que vira o zero do deslocamento (ver nota 1).
    let base: number | null = null;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const top = rect.top - aplicado;
      // -1 (acima da viewport) → 1 (abaixo), com sinal invertido.
      const progress = (top + rect.height / 2 - vh / 2) / (vh / 2);
      base ??= progress;
      aplicado = Math.round(-(progress - base) * speed);
      setOffset(aplicado);
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
