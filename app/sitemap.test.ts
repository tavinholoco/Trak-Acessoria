import { describe, expect, it } from "vitest";

import { site } from "@/data/site";
import sitemap from "./sitemap";

describe("sitemap.ts (RF-12 / Fase 5.2)", () => {
  it("lista a home e a política de privacidade (5.6)", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(2);

    expect(entries[0].url).toBe(site.url);
    expect(entries[1].url).toBe(`${site.url}/privacidade`);
  });

  it("tem lastModified válido e frequência/prioridade coerentes", () => {
    const [home, privacidade] = sitemap();
    expect(home.lastModified).toBeInstanceOf(Date);
    expect(home.changeFrequency).toBe("monthly");
    expect(home.priority).toBe(1);

    expect(privacidade.changeFrequency).toBe("yearly");
    expect(privacidade.priority).toBeLessThan(1);
  });
});
