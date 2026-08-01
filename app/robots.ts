import type { MetadataRoute } from "next";

import { site } from "@/data/site";

/**
 * robots.txt gerado (RF-12 / Fase 5.2) — permite indexação completa e
 * aponta para o sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
