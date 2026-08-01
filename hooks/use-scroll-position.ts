"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

/**
 * Retorna `true` quando a página rolou além de `threshold` pixels.
 * Usado pelo Header para mudar o estado visual (ex.: borda ao rolar).
 * No servidor (SSR) retorna `false`.
 */
export function useScrollPosition(threshold = 8): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false
  );
}
