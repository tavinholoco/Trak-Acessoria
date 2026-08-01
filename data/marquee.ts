/**
 * Itens da faixa de texto em movimento contínuo (RF-04 / Fase 3.2).
 * Conteúdo isolado em data/* (RNF-04) — edite aqui sem tocar em componentes.
 */
export const marqueeItems = [
  "Divulgação",
  "Recursos",
  "Cultura",
  "Editais",
  "Curadoria",
  "Marca",
] as const;

/**
 * Título do banner ilustrado (Fase 3.8) — string explícita para não derivar
 * de índices de `marqueeItems`. Observação: duplica texto de três itens da
 * lista de propósito (desacoplado de índices); se os itens mudarem, atualize
 * o banner junto.
 */
export const bannerHeadline = "Divulgação ✦ Recursos ✦ Editais";
