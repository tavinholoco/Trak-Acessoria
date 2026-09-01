import Image from "next/image";

import { Poster } from "@/components/sections/poster";
import { Reveal } from "@/components/sections/reveal";
import { projects } from "@/data/projects";

/**
 * Grade de posters/cases com métricas (Fase 3.4 / RF-05) a partir de
 * data/projects.ts. Cards "só-imagem" (PRD §9.10): ilustração + métrica.
 */
export function Projects() {
  return (
    <Poster id="projetos" index="04" title="Projetos" tone="paper">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 4) * 80}>
            <article className="group flex h-full flex-col overflow-hidden border border-foreground/25 bg-background transition-transform duration-300 hover:-translate-y-1">
              {/* O poço da ilustração era `bg-secondary` — a mesma cor do fundo
                  da seção (tone="paper"), o que fazia 2/3 do card sumir no tema
                  claro. Agora acompanha o card e o divisor marca a separação
                  (Fase A.4). */}
              <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden border-b border-foreground/25 bg-background">
                {/* SVG vetorial autoral (Fase 5.4): lazy por padrão */}
                <Image
                  src={project.art}
                  alt={`Ilustração do projeto ${project.title}`}
                  width={1024}
                  height={1024}
                  unoptimized
                  className="h-2/3 w-2/3 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 font-sans text-xs font-bold tracking-[0.25em] text-muted-foreground">
                  {project.index}
                </span>
              </div>
              {/* `flex-1` + `mt-auto` na métrica: sem isso a linha da métrica
                  subia e descia conforme a descrição tinha 3 ou 4 linhas, e os
                  cards não alinhavam entre si (Fase A.5). */}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {project.client} · {project.year}
                </p>
                <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight">
                  {project.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground">
                  {project.description}
                </p>
                {/* A métrica é o argumento mais forte do case — passa a ser o
                    maior elemento do card, e não mais do tamanho do título. */}
                <div className="mt-auto border-t border-border pt-4">
                  <p className="font-display text-4xl font-black leading-none tracking-tight text-primary md:text-5xl">
                    {project.metric.value}
                  </p>
                  <p className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    {project.metric.label}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Poster>
  );
}
