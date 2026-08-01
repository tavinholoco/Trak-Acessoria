import { projects } from "@/data/projects";
import { Poster } from "@/components/sections/poster";
import { Reveal } from "@/components/sections/reveal";

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
            <article className="group flex h-full flex-col overflow-hidden border border-border bg-background transition-transform duration-300 hover:-translate-y-1">
              <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.art}
                  alt={`Ilustração do projeto ${project.title}`}
                  className="h-2/3 w-2/3 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 font-sans text-xs font-bold tracking-[0.25em] text-muted-foreground">
                  {project.index}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {project.client} · {project.year}
                </p>
                <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight">
                  {project.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground">
                  {project.description}
                </p>
                <p className="mt-2 border-t border-border pt-3 font-display text-2xl font-black text-primary">
                  {project.metric.value}{" "}
                  <span className="font-sans text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {project.metric.label}
                  </span>
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Poster>
  );
}
