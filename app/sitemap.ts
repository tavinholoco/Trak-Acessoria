import type { MetadataRoute } from "next";

import { site } from "@/data/site";

/**
 * Sitemap gerado (RF-12 / Fase 5.2). Home + Política de Privacidade (5.6).
 * lastModified dinâmico para refletir deploys recentes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
