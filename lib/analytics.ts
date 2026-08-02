/**
 * Analytics leve com consentimento LGPD (RF-12 complementar / Fase 5.5).
 *
 * Princípio privacy-first: nada é rastreado até o visitante aceitar o
 * consentimento explícito (banner LGPD). Sem aceite, `trackEvent` é no-op.
 *
 * Provider: Plausible-compatível via `window.plausible` (API simples e
 * anônima). O script do provider só é injetado DEPOIS do aceite
 * (`loadAnalyticsScript`), usando a env var de domínio:
 *   NEXT_PUBLIC_ANALYTICS=plausible          (ativa o provider)
 *   NEXT_PUBLIC_ANALYTICS_DOMAIN=exemplo.com (domínio do site no provider)
 *
 * Sem `NEXT_PUBLIC_ANALYTICS` definida, todo o módulo é inerte — o banner de
 * consentimento nem é exibido (ver components/layout/consent-banner.tsx).
 */

/** Chave do consentimento no localStorage (não é cookie — LGPD-friendly). */
export const CONSENT_KEY = "trak:analytics-consent";

/**
 * URL padrão do script do provider (Plausible SaaS). Para self-hosted,
 * sobrescreva com NEXT_PUBLIC_ANALYTICS_SCRIPT_URL (ex.: seu domínio).
 *
 * Lida em `loadAnalyticsScript` em tempo de chamada (não no escopo do módulo)
 * para ser testável via vi.stubEnv e consistente com NEXT_PUBLIC_ANALYTICS_DOMAIN.
 */
const DEFAULT_ANALYTICS_SCRIPT_URL = "https://plausible.io/js/script.js";

export type ConsentState = "accepted" | "declined" | null;

/** O analytics está configurado no ambiente? (provider ativo) */
export function isAnalyticsConfigured(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS === "plausible";
}

/** Estado de consentimento persistido do visitante (null = ainda não decidiu). */
export function getConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === "accepted" || stored === "declined" ? stored : null;
}

/** Listener de mudanças de consentimento (assinatura externa, sem estado). */
type ConsentListener = () => void;
const consentListeners = new Set<ConsentListener>();

/** Assina mudanças de consentimento — usado pelo banner para re-render (Fase 5.5). */
export function subscribeConsent(listener: ConsentListener): () => void {
  consentListeners.add(listener);
  return () => {
    consentListeners.delete(listener);
  };
}

/** Notifica assinantes após uma decisão. */
function notifyConsentListeners(): void {
  for (const listener of consentListeners) listener();
}

/** Grava a decisão do visitante e avisa os assinantes. */
export function setConsent(state: Exclude<ConsentState, null>): void {
  window.localStorage.setItem(CONSENT_KEY, state);
  notifyConsentListeners();
}

/** Só rastreia se houver provider configurado E consentimento aceito. */
export function isTrackingAllowed(): boolean {
  return isAnalyticsConfigured() && getConsent() === "accepted";
}

/** Interface mínima do `window.plausible` (sem dependência externa). */
interface PlausibleWindow extends Window {
  plausible?: (
    event: string,
    options?: { props?: Record<string, string | number | boolean> }
  ) => void;
}

/**
 * Injeta o script do provider (Plausible) — somente após o consentimento
 * (LGPD). No-op sem domínio configurado ou se o script já foi injetado.
 *
 * Também instala a fila oficial do Plausible: chamadas a `window.plausible`
 * feitas antes do script carregar são acumuladas e processadas por ele ao
 * carregar (nenhum evento se perde no intervalo do aceite → load).
 */
export function loadAnalyticsScript(): void {
  if (typeof document === "undefined") return;
  if (document.querySelector("script[data-trak-analytics]")) return;

  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  if (!domain) return;

  // URL do script lida no momento da chamada (testável e consistente com a
  // leitura de domain acima). Padrão: Plausible SaaS.
  const scriptUrl =
    process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL ?? DEFAULT_ANALYTICS_SCRIPT_URL;

  const w = window as unknown as {
    plausible?: ((...args: unknown[]) => void) & { q?: unknown[] };
  };

  // Fila oficial do Plausible — `window.plausible` vira função imediatamente.
  if (typeof w.plausible !== "function") {
    w.plausible = (...args: unknown[]) => {
      (w.plausible!.q ??= []).push(args);
    };
  }

  const script = document.createElement("script");
  // async: o atributo `defer` é inócuo em scripts criados via JS (só vale
  // para scripts do parser) — async mantém o carregamento não-bloqueante.
  script.async = true;
  script.src = scriptUrl;
  script.dataset.domain = domain;
  script.dataset.trakAnalytics = "true";
  document.head.appendChild(script);
}

/**
 * Registra um evento (conversão, scroll depth, CTA…).
 * No-op quando o visitante não consentiu ou o provider não está ativo.
 */
export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>
): void {
  if (!isTrackingAllowed()) return;
  const plausible = (window as PlausibleWindow).plausible;
  if (typeof plausible !== "function") return;
  plausible(name, props ? { props } : undefined);
}
