"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Tom do pôster em volta, para superfícies que saem em Portal.
 *
 * Os tons do `Poster` (Fase B.3) re-tematizam o conteúdo reescrevendo as custom
 * properties no `<section>` — o que só funciona por herança, para descendentes.
 * O popup do Select é montado em Portal direto no `<body>`, então escapa da
 * herança e abria com o tema da raiz: painel quase preto sobre o bloco creme
 * do Contato no tema escuro, e o inverso no tema claro.
 *
 * O contexto carrega a classe `.tone-*-tokens` do pôster para que a superfície
 * flutuante possa vestir a mesma paleta do bloco de onde ela foi aberta.
 * Vazio quando o pôster usa o tom padrão — o portal fica com o tema da página,
 * que é o comportamento correto nesse caso.
 */
const PosterToneContext = createContext<string>("");

export function PosterToneProvider({
  tone,
  children,
}: {
  tone: string;
  children: ReactNode;
}) {
  return (
    <PosterToneContext.Provider value={tone}>
      {children}
    </PosterToneContext.Provider>
  );
}

/** Classe de tokens do pôster em volta, ou "" fora de um pôster tonalizado. */
export function usePosterTone(): string {
  return useContext(PosterToneContext);
}
