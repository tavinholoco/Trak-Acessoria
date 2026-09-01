import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

/**
 * Página 404 estilizada como pôster da marca (Fase 3.8 + PRD §10).
 * Ilustração autoral + navegação de retorno.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-8 px-4 py-20 text-center">
      <p className="label-mono text-muted-foreground">
        Erro 404 · Página não encontrada
      </p>
      <h1 className="display-1">
        Perdido
        <br />
        na <span className="text-primary">exposição.</span>
      </h1>
      {/* SVG vetorial autoral (Fase 5.4) */}
      <Image
        src="/art/busto.svg"
        alt="Ilustração autoral de um busto, identidade Trak"
        width={1024}
        height={1024}
        unoptimized
        className="h-40 w-40 animate-spin-slow"
      />
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        VOLTAR AO INÍCIO
      </Link>
    </main>
  );
}
