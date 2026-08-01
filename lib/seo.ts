import { site } from "@/data/site";

/**
 * Dados estruturados JSON-LD (RF-12 / Fase 5.2) — Schema.org.
 * Organization + ProfessionalService, injetados no <head> via <script>
 * application/ld+json no root layout (recomendação da docs do Next.js).
 */

/** Payload JSON-LD com @graph: Organization + ProfessionalService. */
export const seoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      sameAs: site.socials.map((social) => social.href),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#professional-service`,
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      areaServed: "BR",
      parentOrganization: { "@id": `${site.url}/#organization` },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: site.email,
        telephone: `+${site.whatsapp.number}`,
        availableLanguage: "pt-BR",
      },
    },
  ],
} as const;

/**
 * Serializa o payload JSON-LD com a proteção contra XSS recomendada pela
 * docs do Next.js (substitui `<` por `\u003c`).
 */
export function serializeJsonLd(payload: object): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}
