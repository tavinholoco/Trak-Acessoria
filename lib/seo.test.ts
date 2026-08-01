import { describe, expect, it } from "vitest";

import { site } from "@/data/site";
import { seoJsonLd, serializeJsonLd } from "./seo";

describe("seo — JSON-LD (RF-12 / Fase 5.2)", () => {
  it("expõe @graph com Organization e ProfessionalService", () => {
    const types = seoJsonLd["@graph"].map((node) => node["@type"]);
    expect(types).toContain("Organization");
    expect(types).toContain("ProfessionalService");
  });

  it("usa a URL pública do site nos @id e URLs", () => {
    const organization = seoJsonLd["@graph"].find(
      (node) => node["@type"] === "Organization"
    );
    expect(organization).toBeDefined();
    if (organization) {
      expect(organization.url).toBe(site.url);
      expect(organization["@id"]).toBe(`${site.url}/#organization`);
    }
  });

  it("ProfessionalService referencia contatos válidos do site", () => {
    const service = seoJsonLd["@graph"].find(
      (node) => node["@type"] === "ProfessionalService"
    );
    expect(service).toBeDefined();
    if (service && "contactPoint" in service) {
      expect(service.contactPoint.email).toBe(site.email);
      expect(service.contactPoint.telephone).toBe(`+${site.whatsapp.number}`);
      expect(service.contactPoint.availableLanguage).toBe("pt-BR");
    }
  });

  it("serializeJsonLd escapa '<' (proteção XSS, recomendação da docs)", () => {
    const out = serializeJsonLd({ key: "<script>alert(1)</script>" });
    expect(out).toContain("\\u003cscript>");
    expect(out).not.toContain("<script>");
  });
});
