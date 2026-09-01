import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";

/**
 * Página única (one-page) — compõe os blocos-pôster da Fase 3.
 * Cada seção renderiza seu próprio <section> com id de âncora (RF-01).
 */
export default function Home() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground texture-grain">
      <Hero />
      <Marquee />
      <Services />
      <Projects />
      <Team />
      {/* Fase A.6: o FAQ saiu da coluna do Contato e virou pôster próprio,
          antes da conversão — responde a objeção, depois pede o contato. */}
      <Faq />
      <Contact />
    </main>
  );
}
