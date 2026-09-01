import { team } from "@/data/team";
import { Poster } from "@/components/sections/poster";
import { Reveal } from "@/components/sections/reveal";

/**
 * Bloco editorial da equipe (Fase 3.5 / RF-06) a partir de data/team.ts.
 * Lista tipográfica com papéis e áreas de atuação, em duas colunas.
 *
 * Uma versão anterior transformou isto numa lista de linhas em largura total,
 * com o nome em escala de pôster. Ficou pior: o formato em duas colunas lê
 * melhor e é o que está aqui de volta. O fundo azul da seção (tone="accent")
 * fica — é ele que resolve o vazio que a grade tinha antes.
 */
export function Team() {
  return (
    <Poster id="equipe" index="05" title="Equipe" tone="accent">
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
        {team.map((member, i) => (
          <Reveal key={member.id} delay={(i % 2) * 100}>
            <article className="group border-t border-border pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight transition-colors group-hover:text-primary md:text-4xl">
                  {member.name}
                </h3>
                <span
                  aria-hidden="true"
                  className="font-display text-2xl text-primary transition-transform duration-300 group-hover:rotate-12"
                >
                  ✦
                </span>
              </div>
              <p className="mt-2 label-mono text-muted-foreground">
                {member.role}
              </p>
              <p className="mt-4 max-w-xl font-sans text-sm text-muted-foreground">
                {member.bio}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {member.focus.map((area) => (
                  <li
                    key={area}
                    className="label-mono border border-border px-2 py-1"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Poster>
  );
}
