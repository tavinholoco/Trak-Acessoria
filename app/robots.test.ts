import { describe, expect, it } from "vitest";

import { site } from "@/data/site";
import robots from "./robots";

describe("robots.ts (RF-12 / Fase 5.2)", () => {
  it("permite indexação completa (allow /) para todos os bots", () => {
    const config = robots();
    expect(config.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });

  it("aponta o sitemap a partir da URL pública do site", () => {
    const config = robots();
    expect(config.sitemap).toBe(`${site.url}/sitemap.xml`);
  });
});
