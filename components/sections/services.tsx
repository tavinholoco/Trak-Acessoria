import { services } from "@/data/services";
import { Poster } from "@/components/sections/poster";
import { Reveal } from "@/components/sections/reveal";

/**
 * Grid editorial de serviços (Fase 3.3 / RF-03) a partir de data/services.ts.
 * Hover exagerado (RF-11): card inverte para o vermelho e sobe.
 */
export function Services() {
  return (
    <Poster id="servicos" index="03" title="Serviços">
      <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={(i % 3) * 80}>
            <article className="group flex h-full flex-col gap-6 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground md:p-8">
              {/* Sem a seta que ficava aqui: o card não leva a lugar nenhum,
                  e o "→" prometia uma navegação que não existe. */}
              <span className="label-mono text-muted-foreground transition-colors group-hover:text-primary-foreground/80">
                {service.index}
              </span>
              <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground transition-colors group-hover:text-primary-foreground/90">
                {service.description}
              </p>
              <ul className="mt-auto flex flex-col gap-1.5 border-t border-border pt-4">
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="label-mono"
                  >
                    ✦ {highlight}
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
