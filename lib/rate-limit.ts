/**
 * Rate limiting básico em memória (Fase 4.4 / RF-08).
 * PRD: "limite por IP/tempo" — objetivo: reduzir spam no formulário.
 *
 * Atenção: o store é por instância (básico). Para escala horizontal, trocar
 * por um armazenamento compartilhado (ex.: Redis/Upstash) sem mudar a API.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/** Janela padrão: 10 minutos. */
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
/** Máximo de requisições por chave (IP) por janela. */
export const RATE_LIMIT_MAX = 3;

/**
 * Extrai o IP real do visitante para a chave de rate limit.
 *
 * A Vercel anexa o IP real como a ÚLTIMA entrada de `x-forwarded-for` — os
 * valores anteriores podem ser forjados pelo client (spoofing) para zerar o
 * limite. Por isso usamos o último valor, com fallback para `x-real-ip`.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded
      .split(",")
      .map((ip) => ip.trim())
      .filter(Boolean);
    const last = ips[ips.length - 1];
    if (last) return last;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Verifica se `key` (ex.: IP do visitante) ainda pode fazer requisição.
 * Retorna `false` quando o limite da janela foi atingido.
 */
export function checkRateLimit(
  key: string,
  max: number = RATE_LIMIT_MAX,
  windowMs: number = RATE_LIMIT_WINDOW_MS
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  // Janela expirada ou primeira requisição: reinicia a contagem.
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) {
    return false;
  }

  entry.count += 1;
  return true;
}

/** Limpa o store — usado pelos testes (beforeEach). */
export function resetRateLimits(): void {
  store.clear();
}
