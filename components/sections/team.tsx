import { team } from "@/data/team";
import { Poster } from "@/components/sections/poster";
import { Reveal } from "@/components/sections/reveal";

/**
 * Bloco editorial da equipe (Fase 3.5 / RF-06) a partir de data/team.ts.
 * Lista tipográfica com papéis e áreas de atuação.
 */
export function Team() {
  return (
    <Poster id="equipe" index="05" title="Equipe">
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
              {/* Muted-foreground: vermelho pequeno sobre preto quebra o AA
                  (3.65:1 < 4.5:1 — PRD §9.3). O acento vermelho fica no ✦. */}
              <p className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {member.role}
              </p>
              <p className="mt-4 max-w-xl font-sans text-sm text-muted-foreground">
                {member.bio}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {member.focus.map((area) => (
                  <li
                    key={area}
                    className="border border-border px-2 py-1 font-sans text-xs font-bold uppercase tracking-wide"
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
