import type { NextConfig } from "next";

/**
 * Headers de segurança (RNF-05 / auditoria de segurança pré-publicação).
 *
 * CSP: `script-src 'unsafe-inline'` é OBRIGATÓRIO para o Next.js (App Router
 * injeta scripts inline de RSC flight data e o JSON-LD é script inline). A
 * proteção efetiva é o allowlist: apenas `self` + Plausible (injetado sob
 * consentimento LGPD) + Vercel Speed Insights. Um script externo arbitrário
 * (ex.: vindo de XSS) é bloqueado. Para remover o 'unsafe-inline', migrar
 * para CSP com nonce via middleware (documentado como melhoria futura).
 *
 * `style-src 'unsafe-inline'` é necessário (Next/Tailwind).
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://plausible.io https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self' https://plausible.io https://va.vercel-scripts.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
