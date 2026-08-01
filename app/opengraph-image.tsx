import { ImageResponse } from "next/og";

import { site } from "@/data/site";

/**
 * OG image gerada no edge (RF-12 / Fase 5.1) — 1200×630 com a identidade
 * Trak: tipografia display gigante, vermelho da marca e preto de fundo.
 * Renderizada sob demanda; o metadata do layout a referencia implicitamente
 * (convenção de arquivo app/opengraph-image.*).
 */
export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#0F0F0F",
          color: "#F7F4EE",
          padding: 64,
          // Serif pesada aproximando a Fraunces da identidade (PRD §9.4) —
          // fontes do sistema, sem fetch externo no edge.
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 900, letterSpacing: -4 }}>
          Trak<span style={{ color: "#D41F16" }}>✦</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>
          <span>Arte é</span>
          <span style={{ color: "#D41F16" }}>Negócio.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#A9A295" }}>
          Assessoria para empresas de arte — divulgação, posicionamento e captação de recursos.
        </div>
      </div>
    ),
    size
  );
}
