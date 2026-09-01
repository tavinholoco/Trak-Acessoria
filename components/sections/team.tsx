import { team } from "@/data/team";
import { Poster } from "@/components/sections/poster";
import { Reveal } from "@/components/sections/reveal";

/**
 * Bloco editorial da equipe (Fase 3.5 / RF-06) a partir de data/team.ts.
 *
 * Fase B.6: era uma grade de duas colunas em que cada integrante ocupava
 * pouco mais de um terço da largura — sobrava espaço morto à direita de todos
 * os quatro. Virou uma lista de linhas em largura total, com o nome em escala
 * de pôster à esquerda e o dossiê (papel, bio e áreas) à direita.
 * O fundo azul da seção vem do `tone="accent"` (Fase B.2).
 */
export function Team() {
  return (
    <Poster id="equipe" index="05" title="Equipe" tone="accent">
      <div className="flex flex-col">
        {team.map((member, i) => (
          <Reveal key={member.id} delay={(i % 2) * 100}>
            <article className="group grid gap-4 border-t border-border py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 md:py-10">
              {/* Nome em escala de pôster */}
              <div className="flex items-start gap-4 md:gap-6">
                <span
                  aria-hidden="true"
                  className="label-mono mt-2 shrink-0 text-muted-foreground md:mt-4"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* O índice fica fora do <h3>: o nome acessível do heading é só
                    o nome do integrante. */}
                <h3 className="font-display text-4xl font-black uppercase leading-[0.92] tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-5xl lg:text-6xl">
                  {member.name}
                </h3>
              </div>

              {/* Dossiê */}
              <div className="flex flex-col items-start gap-4 md:pt-3">
                <div className="flex w-full items-baseline justify-between gap-4">
                  <p className="label-mono text-muted-foreground">
                    {member.role}
                  </p>
                  <span
                    aria-hidden="true"
                    className="font-display text-xl leading-none text-foreground transition-transform duration-300 group-hover:rotate-90"
                  >
                    ✦
                  </span>
                </div>
                <p className="max-w-prose font-sans text-sm text-muted-foreground">
                  {member.bio}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {member.focus.map((area) => (
                    <li
                      key={area}
                      className="label-mono border border-border px-2.5 py-1.5"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Poster>
  );
}
