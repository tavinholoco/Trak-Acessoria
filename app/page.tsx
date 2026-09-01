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
    // O `texture-grain` saiu daqui (Fase C.3): num <main> de ~7.300px ele
    // virava uma única camada composta do tamanho da página inteira. Agora
    // cada seção pinta o seu, dentro dos próprios limites.
    <main className="min-h-dvh overflow-hidden bg-background text-foreground">
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
