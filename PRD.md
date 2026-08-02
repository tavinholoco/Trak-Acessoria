# PRD — Landing Page: Trak Assessoria

**Produto:** Trak Assessoria (assessoria para empresas de arte)
**Status:** Em desenvolvimento — Fase 2 (Layout Shell) concluída; base de testes implementada (Vitest + RTL + Playwright); pronto para a Fase 3 (Seções)
**Autor:** Buffy (Freebuff)
**Data:** 31/07/2026 · Atualizado em 01/08/2026 (estratégia de testes — ver §13)
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui
**Tipo de entrega:** Landing page institucional de página única com seções âncora

---

## 1. Resumo Executivo

Este documento define o produto e o plano de ação para a construção da **landing page institucional da Trak Assessoria** — uma assessoria/consultoria que atende **empresas e profissionais do mercado de arte** — galerias, ateliês, estúdios, produtoras culturais, curadores e artistas que se organizam como negócio.

O objetivo da página é **apresentar a Trak, seus serviços e sua identidade artística**, convertendo visitantes em **contatos/leads qualificados** por meio de um formulário de contato e CTAs estratégicos.

> **Projeto pessoal de portfólio:** nome, e-mail e WhatsApp são fictícios (dados de demonstração).

### Decisões-chave

| Tema | Decisão |
|---|---|
| Arquitetura | Next.js 15+ com App Router (SSR/SSG) |
| Linguagem | TypeScript (strict) |
| UI Kit | shadcn/ui sobre Tailwind CSS v4 |
| Formato | Página única (one-page) com navegação por âncoras |
| Formulário | Validação com Zod + envio via API Route com **Resend** (gratuito) |
| Marca | Trak Assessoria (nome fictício) |
| Repositório | `Trak-Acessoria` |
| Identidade | Brutalismo Editorial + Psicodelia Vintage + Design Suíço (ver §9) |
| Idioma | Português (pt-BR) |
| Contato (demo) | E-mail: contato@trakassessoria.com.br · WhatsApp: +55 11 99999-0000 |
| Resend | Conta criada e API key pronta — configurada na Fase 0, **apenas em `.env.local` (gitignored)** |
| Domínio | Não será criado neste projeto — usar URL padrão da Vercel |
| Entrega | Sem back-end próprio; deploy estático + API mínima de contato |

---

## 2. Contexto e Problema

Empresas que trabalham com arte (galerias, ateliês, estúdios de criação, produtoras culturais, acervos privados) enfrentam desafios que vão além do fazer artístico:

- **Gestão de negócio:** precificação, fluxo de caixa, contratos, formalização.
- **Captação de recursos:** editais, leis de incentivo (Rouanet, ProAC etc.), patrocínio.
- **Mercado e posicionamento:** branding, presença digital, comercialização do acervo.
- **Gestão de projetos culturais:** planejamento, prestação de contas, curadoria.

**Foco central:** ajudar empresas artísticas com **divulgação** (marketing cultural, posicionamento, presença digital) e **recursos** (editais, leis de incentivo, patrocínio).

O problema atual: essas empresas raramente encontram, de forma clara e profissional, uma assessoria que reúna essas competências. A landing page resolve isso ao **comunicar serviços, provar resultados (projetos) e facilitar o primeiro contato**.

---

## 3. Objetivos e Métricas de Sucesso

### 3.1 Objetivos de negócio

1. Gerar leads qualificados (contatos iniciados pelo formulário ou WhatsApp).
2. Posicionar a assessoria como referência em gestão de empresas de arte.
3. Apresentar o portfólio de serviços de forma clara e hierarquizada.

### 3.2 KPIs e metas

| Métrica | Meta |
|---|---|
| Performance (Lighthouse, mobile) | ≥ 90 em Performance, Acessibilidade, Boas Práticas, SEO |
| Conversão do formulário | ≥ 3% dos visitantes |
| Tempo médio na página | ≥ 90 s |
| Profundidade de rolagem | ≥ 70% até a seção Contato |
| CTAs clicados | ≥ 5% dos visitantes |
| Core Web Vitals | LCP < 2,5 s · CLS < 0,1 · INP < 200 ms |

---

## 4. Público-Alvo e Personas

| Persona | Perfil | Necessidade principal |
|---|---|---|
| **A Galerista** | Dona de galeria com acervo próprio | Comercialização, precificação, curadoria, internacionalização |
| **O Gestor de Ateliê** | Ateliê/estúdio consolidado com equipe | Organização financeira, contratos, gestão de projetos |
| **A Produtora Cultural** | Produtora que capta recursos | Editais, leis de incentivo, prestação de contas |
| **O Artista-Empresário** | Artista em ascensão que se formalizou | Posicionamento de marca, marketing, assessoria jurídica |

**Cenário de uso principal:** um galerista acessa a página pelo Google/indicação, entende os serviços em < 60 segundos, lê um projeto (case) relevante, e envia uma mensagem pelo formulário ou WhatsApp.

---

## 5. Escopo

### 5.1 Dentro do escopo (v1)

- Página única com seções âncora (ver §6).
- Formulário de contato funcional com validação e feedback ao usuário.
- Botão de WhatsApp (CTA direto).
- SEO técnico (metadados, Open Graph, sitemap, robots, dados estruturados).
- Layout 100% responsivo (mobile-first).
- Acessibilidade básica (WCAG AA).
- Animações e movimento da identidade: marquee infinito, parallax leve, hover exagerado, reveal on scroll.
- Ilustrações SVG autorais (cartoon retrô/psicodélico) como elemento de personalidade.
- Modo escuro (dark mode) com alternância — preto #0F0F0F como tema default.

### 5.2 Fora do escopo (v1)

- Blog / área de notícias.
- Múltiplas páginas internas (Sobre, Serviços individuais) — tudo em uma página.
- E-commerce / venda online.
- Painel administrativo / CMS (conteúdo será mantido em arquivos de dados).
- Multi-idioma.
- Integrações com CRM (deixar arquitetura pronta para conectar depois).

---

## 6. Estrutura da Página (Sitemap)

Navegação fixa (header sticky) com âncoras: **Início · Serviços · Projetos · Equipe · Contato**

### 6.1 Seções da página (blocos-pôster)

| # | Seção | Conteúdo | Objetivo |
|---|---|---|---|
| 1 | **Hero** | Headline tipográfica gigante (Nível 1, quase ocupa a tela), muito espaço vazio, 2 CTAs ("Ver serviços" / "Falar conosco"), indicadores de autoridade | Impacto imediato |
| 2 | **Marquee / Banner Ilustrado** | Faixa de texto em movimento contínuo (marquee) + banner com ilustração cartoon psicodélica | Personalidade e ritmo |
| 3 | **Serviços** | Grid editorial de 6 serviços: Gestão financeira; Captação e editais; Curadoria e acervo; Branding e marketing cultural; Gestão de projetos; Assessoria jurídica e contratos | Apresentar oferta |
| 4 | **Projetos** | Grade de posters/cases com métricas (ex.: "+120% em vendas de acervo", "R$ 2M captados via Rouanet") | Prova de resultado |
| 5 | **Equipe** | Bloco editorial com integrantes, papéis e mini-bios | Confiança e humanização |
| 6 | **Contato** | Formulário (nome, e-mail, tipo de empresa, mensagem) + informações de contato + WhatsApp + FAQ opcional | Conversão |
| 7 | **Footer** | Marca, navegação, contatos, redes sociais, créditos | Encerramento |

> Cada seção funciona como um **pôster independente** — mesma linguagem visual, alternando vazio extremo e explosões de cor/ilustração (ver §9).

---

## 7. Requisitos Funcionais (RF)

| ID | Requisito | Detalhes |
|---|---|---|
| RF-01 | Navegação por âncoras | Header sticky que rola suavemente até cada seção; destaca a seção ativa |
| RF-02 | Header responsivo | Menu hambúrguer (Sheet) no mobile; links completos no desktop |
| RF-03 | Seção Serviços dinâmica | Cards renderizados a partir de `data/services.ts` |
| RF-04 | Marquee infinito | Faixa de texto em movimento contínuo (banner ilustrado); pausa em `prefers-reduced-motion` |
| RF-05 | Projetos | Grade de posters com métricas de destaque, carregada de `data/projects.ts` |
| RF-06 | Equipe | Bloco editorial com integrantes, carregado de `data/team.ts` |
| RF-07 | FAQ | Accordion acessível (expansão única por vez, teclado funcional) — opcional, junto ao Contato |
| RF-08 | Formulário de contato | Campos: nome, e-mail, tipo de empresa (select), mensagem. Validação com Zod; envio via API Route `POST /api/contact`; feedback com toast (sonner) e estado de loading/erro |
| RF-09 | Botão WhatsApp | Link direto `https://wa.me/5511999990000` com mensagem pré-preenchida |
| RF-10 | Dark mode | Alternância claro/escuro persistida (next-themes); preto #0F0F0F como default da marca |
| RF-11 | Animações | Marquee, parallax leve, hover exagerado, reveal on scroll; respeitando `prefers-reduced-motion` |
| RF-12 | SEO | Metadados por rota, Open Graph/Twitter cards, `sitemap.ts`, `robots.ts`, dados estruturados (ProfessionalService) |
| RF-13 | 404 | Página de erro estilizada como pôster da marca |

---

## 8. Requisitos Não Funcionais (RNF)

| ID | Requisito | Detalhes |
|---|---|---|
| RNF-01 | Performance | Bundle otimizado, imagens com `next/image` (avif/webp), fontes auto-otimizadas, lazy loading das seções abaixo da dobra |
| RNF-02 | Acessibilidade | Semântica correta (header/main/section/footer), contraste AA, foco visível, labels nos campos, ARIA em accordion/slider/menu |
| RNF-03 | Responsividade | Breakpoints mobile (375px) → desktop (1440px+), sem overflow horizontal |
| RNF-04 | Manutenibilidade | Conteúdo isolado em arquivos `data/*`; componentes tipados; TypeScript strict sem `any` |
| RNF-05 | Segurança | Sem segredos no client; env variables para e-mail; validação de input no servidor |
| RNF-06 | SEO técnico | Canonical, meta description, alt text em todas as imagens |
| RNF-07 | Compatibilidade | Chrome, Edge, Firefox, Safari (2 últimas versões) |
| RNF-08 | Privacidade (LGPD) | Link de Política de Privacidade acessível no rodapé; formulário coleta dados pessoais — consentimento explícito e envio sem armazenamento desnecessário |

---

## 9. Design System — Identidade Visual "Trak"

### 9.1 Conceito geral

A sensação transmitida é: **criativa, ousada, artística, irreverente, experimental, anti-corporativa**. A marca quer parecer um estúdio que quebra regras — referências: Locomotive, Dogstudio, Active Theory, Studio Freight, DIA Studio, Ciao Studio, Bureau Borsche, Studio Dumbar.

### 9.2 Direção artística (5 movimentos)

| Movimento | Aplicação |
|---|---|
| **A) Brutalismo** | Muito espaço vazio, muito preto, pouquíssimos efeitos, quase agressivo |
| **B) Editorial** | Página como revista impressa: texto grande, alinhamento, grid, contraste; jornal de arte |
| **C) Psicodelia** | Ilustrações coloridas, personagens, formas orgânicas, visual anos 60 |
| **D) Design suíço** | Caos aparente, mas grid invisível extremamente alinhado — nada aleatório |
| **E) Poster Design** | Cada seção é um cartaz independente; a página é uma coleção de posters empilhados |

### 9.3 Paleta de cores (reduzida)

| Cor | Código | Uso |
|---|---|---|
| Vermelho (primária) | Token UI `#D41F16` · Marca `#E1261C` / `#E31F19` | CTAs, destaques, acentos (varia por seção) — token escurecido p/ contraste AA (ver nota) |
| Preto (fundo) | `#0F0F0F` | Quase preto absoluto; fundo padrão |
| Branco quente | `#F7F4EE` | Não é branco puro; texto claro e fundos "papel" |
| Azul vibrante | `#1D3BFF` | Áreas pontuais, muito seletivo |
| Amarelo, verde, rosa, laranja, lilás | — | **Somente nas ilustrações, nunca no layout** |

> Regra: poucas cores no layout; muitas cores apenas nos desenhos.

> ⚠️ Paleta **provisória** — o cliente confirma a paleta final após a Fase 1 (storyboard).
>
> **Ajuste de contraste (WCAG AA):** o token `--primary` foi escurecido de `#E1261C` para `#D41F16` (4.86:1 com `#F7F4EE` em texto normal, acima do AA 4.5:1). `#E1261C` permanece como vermelho de marca (ilustrações, `--ring`, hovers). Evitar vermelho sobre preto em texto pequeno (3.65:1 < 4.5:1) — ex.: o link ativo do header usa sublinhado vermelho em vez de texto vermelho.

### 9.4 Tipografia (elemento mais importante — ~60% da identidade)

- **Famílias de referência:** Recoleta Black, Canela Display, Editorial New, Noe Display, Cooper adaptada, Druk Serif, Windsor.
- **Características:** serifada, muito pesada (Black/Extra Black), condensada, caixa alta, alto contraste, tracking muito fechado (letras quase encostam), leading muito pequeno (linhas extremamente próximas).
- **Web (Google Fonts):** *Fraunces* (Black/ExtraBold) como display principal — boa aproximação de Druk Serif/Editorial New; alternativa: *Playfair Display* Black. Corpo: *Inter* ou *Archivo*.
- **Nota de execução:** nenhuma das famílias do Google Fonts é serif *condensada* de verdade; simular condensação com `letter-spacing` muito negativo e `leading` pequeno.
- **Exemplo de composição:** "THIS MIGHT BE A DESIGN STUDIO" — quase sem espaço vertical.

### 9.5 Hierarquia (3 níveis)

| Nível | Tamanho | Uso |
|---|---|---|
| Nível 1 | 300–600 px (desktop) | Headlines gigantes, apenas impacto |
| Nível 2 | 40–80 px | Subtítulos |
| Nível 3 | 16–22 px | Texto corrido |

> No mobile, escalar proporcionalmente (ex.: clamp) mantendo o impacto.

### 9.6 Layout e grid

- Blocos: Hero → Banner ilustrado → Serviços → Projetos → Equipe → Contato.
- Grid de **12 colunas** rigoroso, margens enormes, muita respiração lateral.
- Muito espaço vazio (especialmente no Hero) contrastando com a tipografia gigante.

### 9.7 Contraste (3 tipos)

- **Escala:** texto gigante ↔ texto pequeno.
- **Cor:** vermelho ↔ preto ↔ branco quente.
- **Densidade:** áreas totalmente vazias ↔ áreas extremamente ilustradas.

### 9.8 Ilustrações (SVG autorais)

- Estilo: cartoon + desenho infantil + psicodelia + gravura + serigrafia.
- Características: contorno grosso, pouco sombreado, cores chapadas, muito detalhe.
- Elementos recorrentes da identidade: **letras enormes cortadas** pela borda da tela e **colagens** (recortes sobrepostos).
- Usar em: banner ilustrado, detalhes de seções, 404. **Nunca no layout como decoração genérica.**

### 9.9 Fotografias e texturas

- Fotografias quase inexistentes; quando aparecem: tintadas, recortadas, nunca naturais.
- Texturas: fundo "papel" nas seções claras; linhas horizontais discretas no fundo preto (papel impresso); grain (granulado) muito leve global.

### 9.10 Botões, cards e bordas

- Botões simples: "SEE THE WORK" — vermelho, pequeno, sem sombra/gradiente/brilho.
- Cards de projetos: apenas imagem, sem bordas complexas.
- `border-radius`: **0 ou 8px** — nada muito arredondado.

### 9.11 Movimento

- Marquee infinito, parallax, hover exagerado, elementos girando lentamente, zoom/escala/fade.
- Tudo com fallback para `prefers-reduced-motion` (pausar/desativar).

### 9.12 Tokens (variáveis CSS do shadcn)

- `background: #0F0F0F`, `foreground: #F7F4EE`
- `primary: #E1261C`, `primary-foreground: #F7F4EE`
- `accent: #1D3BFF` (pontual), `muted`, `border`, `input`, `ring` derivados da paleta
- `radius`: 0.5rem (8px) — consistente com §9.10
- Dark mode via `.dark` com `next-themes`; `#0F0F0F` como default

### 9.13 Componentes shadcn/ui a adotar

`button`, `card`, `badge`, `accordion`, `form` (+ `react-hook-form` + `zod`), `input`, `textarea`, `select`, `label`, `sheet` (menu mobile), `separator`, `sonner` (toasts). Ícones: **lucide-react** (uso mínimo — a identidade é tipográfica).

### 9.14 Sensação psicológica do visitante

Criatividade → Curiosidade → Caos controlado → Confiança artística → Personalidade.

---

## 10. Estrutura do Projeto

```
Trak-Acessoria/
├── app/
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, Header/Footer
│   ├── page.tsx                # Página única (compõe as seções)
│   ├── globals.css             # Tailwind v4 + variáveis CSS (tokens)
│   ├── not-found.tsx           # Página 404
│   ├── sitemap.ts              # Sitemap gerado
│   ├── robots.ts               # Robots.txt gerado
│   └── api/
│       └── contact/
│           └── route.ts        # POST /api/contact (valida e encaminha e-mail)
├── components/
│   ├── ui/                     # Componentes primitivos do shadcn (gerados via CLI)
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── mobile-nav.tsx
│   │   └── footer.tsx
│   └── sections/
│       ├── hero.tsx
│       ├── marquee.tsx            # Marquee + banner ilustrado
│       ├── services.tsx
│       ├── projects.tsx
│       ├── team.tsx
│       ├── contact.tsx            # + FAQ opcional
│       └── poster.tsx             # Wrapper visual "cartaz" reutilizável (opcional)
├── data/                       # Conteúdo editável sem tocar em componentes
│   ├── site.ts                 # Nome (Trak), contatos, redes, WhatsApp
│   ├── services.ts
│   ├── projects.ts
│   ├── team.ts
│   └── faq.ts
├── art/                         # Ilustrações SVG autorais — importadas como componentes (ou movidas para public/art/)
├── lib/
│   ├── utils.ts                # cn() (clsx + tailwind-merge)
│   └── contact.ts              # Lógica de envio de e-mail (servidor)
├── hooks/                      # useScrollPosition, useSectionObserver, useReducedMotion etc.
├── types/                      # Tipos compartilhados (Service, Project, TeamMember…)
├── public/                     # Imagens, ícones, manifest
├── vitest.config.mts           # Testes unitários/componentes (Vitest + RTL)
├── vitest.setup.ts             # Setup: jest-dom + mocks (matchMedia, IntersectionObserver)
├── playwright.config.ts        # Testes E2E (Playwright): 3 browsers + mobile 375px
├── e2e/
│   └── smoke.spec.ts           # Smoke E2E: navegação, dark mode, menu mobile, a11y (axe)
├── .github/
│   └── workflows/
│       └── ci.yml              # CI: lint + typecheck + vitest + coverage + playwright
└── components.json             # Config do shadcn/ui
```

---

## 11. Stack e Dependências

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15+ (App Router, `create-next-app` com TS + Tailwind + App Router) |
| Linguagem | TypeScript (strict) |
| Estilo | Tailwind CSS v4 (via shadcn/ui) |
| UI Kit | shadcn/ui (`npx shadcn@latest init` + `npx shadcn@latest add <componente>`) |
| Tema | next-themes |
| Formulário | react-hook-form + zod + @hookform/resolvers |
| Toasts | sonner |
| Animação | CSS/IntersectionObserver (sem lib pesada) — ou `motion` se necessário |
| E-mail | Resend (plano gratuito) — API key em env vars; o WhatsApp funciona como canal reserva |
| Testes unitários | Vitest 4 + React Testing Library + jest-dom + user-event (jsdom) |
| Testes E2E | Playwright + @axe-core/playwright (WCAG AA) |
| CI | GitHub Actions — lint, typecheck, Vitest + gate de cobertura, Playwright |
| Deploy | Vercel (padrão Next.js) |

---

## 12. Plano de Ação — Fases de Desenvolvimento

> Ordem executável: cada fase termina com um **critério de aceitação** verificável antes de avançar.

### Fase 0 — Setup do projeto *(pré-requisito de tudo)*

| # | Tarefa |
|---|---|
| 0.1 | `npx create-next-app@latest Trak-Acessoria` com flags `--typescript --tailwind --app` (pasta/repositório: `Trak-Acessoria`) |
| 0.2 | `npx shadcn@latest init` (base neutra, e depois ajustar tokens na Fase 1) |
| 0.3 | Instalar e configurar `next-themes` (ThemeProvider no root layout) |
| 0.4 | Configurar variáveis de ambiente (`.env.local` **gitignored**): `CONTACT_EMAIL=contato@trakassessoria.com.br`, `WHATSAPP=5511999990000`, `RESEND_API_KEY=<chave já criada>`, URLs — com `.env.example` documentado **sem valores reais** |
| 0.5 | Criar estrutura de pastas (components/layout, components/sections, data, lib, hooks, types) |
| 0.6 | Adicionar componentes-base do shadcn: button, card, badge, accordion, input, textarea, select, label, sheet, separator, sonner, form |
| 0.7 | Instalar dependências de formulário já na base: `react-hook-form`, `zod`, `@hookform/resolvers` (mantém o lockfile estável) |
| 0.8 | Commit inicial com convenção de mensagens (ex.: conventional commits) |

**Aceite:** `npm run dev` abre a página padrão; `npm run build` passa sem erros; shadcn funcionando.

---

### Fase 1 — Design System

| # | Tarefa |
|---|---|
| 1.1 | Aplicar a paleta Trak em tokens: vermelho `#E1261C`/`#E31F19` (primary), preto `#0F0F0F` (background), branco quente `#F7F4EE`, azul `#1D3BFF` (accent pontual) — **paleta provisória, a confirmar pelo cliente** |
| 1.2 | Configurar tipografia: display serif pesada (Fraunces Black / Playfair Display) em caixa alta com tracking fechado; corpo Inter/Archivo |
| 1.3 | Implementar hierarquia de 3 níveis: N1 (300–600px), N2 (40–80px), N3 (16–22px) com `clamp()` no mobile |
| 1.4 | Aplicar tokens em `globals.css` (`:root` e `.dark`) |
| 1.5 | Configurar fontes via `next/font` (auto-otimizadas, sem layout shift) |
| 1.6 | Criar **storyboard/página de teste de componentes** (dev only): botões "SEE THE WORK", cards só-imagem, radius 0/8px, texturas (grain, linhas) |

**Aceite:** tokens aplicados; contraste AA verificado nas cores principais; fonte display sem CLS.

---

### Fase 2 — Layout Shell

| # | Tarefa |
|---|---|
| 2.1 | `Header` sticky com logo, navegação âncora e botão CTA + toggle de tema |
| 2.2 | `MobileNav` (Sheet) com links âncora e CTA |
| 2.3 | `Footer` com marca, navegação, contatos, redes sociais e créditos |
| 2.4 | Scroll suave (`scroll-behavior: smooth` + `scroll-margin-top` nas seções) e destaque da seção ativa |

**Aceite:** navegação funcional em mobile e desktop; rolagem suave; foco visível.

---

### Fase 3 — Seções (núcleo da página)

| # | Tarefa |
|---|---|
| 3.1 | **Hero** — headline gigante (N1), espaço vazio dominante, 2 CTAs, indicadores de autoridade |
| 3.2 | **Marquee/Banner Ilustrado** — faixa de texto em movimento contínuo + ilustração SVG psicodélica (art/) |
| 3.3 | **Services** — grid editorial de 6 cards a partir de `data/services.ts` |
| 3.4 | **Projects** — grade de posters com métricas a partir de `data/projects.ts` (cards só-imagem) |
| 3.5 | **Team** — bloco editorial a partir de `data/team.ts` |
| 3.6 | **Contact** — formulário (Fase 4) + bloco de contato + WhatsApp |
| 3.7 | **FAQ** — accordion acessível (`data/faq.ts`) — opcional, junto ao Contato |
| 3.8 | Ilustrações SVG autorais (contorno grosso, cores chapadas) no banner e 404 |
| 3.9 | Texturas: grain leve global, linhas discretas no fundo preto, fundo "papel" nas seções claras |
| 3.10 | Movimento: marquee infinito, parallax leve, hover exagerado, reveal on scroll — com fallback `prefers-reduced-motion` |

**Aceite:** todas as seções renderizadas a partir de `data/*`; mobile ok; sem erros de console.

---

### Fase 4 — Formulário de Contato

| # | Tarefa |
|---|---|
| 4.1 | Schema Zod (nome ≥ 2 chars, e-mail válido, tipo de empresa, mensagem ≥ 10 chars) |
| 4.2 | Componente com react-hook-form + estados (idle, loading, success, error) |
| 4.3 | API Route `POST /api/contact` com validação server-side e envio de e-mail via **Resend** (plano gratuito) |
| 4.4 | Feedback com toast (sonner) e rate limiting básico (ex.: limite por IP/tempo) |
| 4.5 | Testes unitários do **schema Zod** (válidos, inválidos, casos-limite) — Vitest |
| 4.6 | Testes da API Route `POST /api/contact` com **Resend mockado** (sucesso, erro, rate limit) — Vitest |
| 4.7 | Testes do componente do formulário (estados idle/loading/success/error + validação client) — RTL + user-event |

**Aceite:** envio real testado de ponta a ponta; campos inválidos bloqueiam com mensagens claras; testes de formulário passando.

---

### Fase 5 — SEO, Performance e Qualidade

| # | Tarefa |
|---|---|
| 5.1 | Metadados (title, description, Open Graph, Twitter) via `metadata` do Next |
| 5.2 | `sitemap.ts`, `robots.ts`, canonical, dados estruturados (JSON-LD ProfessionalService) |
| 5.3 | Página 404 estilizada (`not-found.tsx`) com navegação de retorno |
| 5.4 | Imagens otimizadas com `next/image` + alt text; lazy loading |
| 5.5 | Analytics leve (ex.: Plausible ou GA4) para medir KPIs da §3.2 (conversão, scroll depth, CTAs) — com aviso de privacidade coerente à LGPD |
| 5.6 | Página/rodapé com link de **Política de Privacidade (LGPD)** — o formulário coleta dados pessoais |
| 5.7 | `npm run build` limpo; auditoria Lighthouse (perf, a11y, best practices, SEO ≥ 90) |
| 5.8 | Teste manual de responsividade (375 / 768 / 1024 / 1440) e navegação por teclado |
| 5.9 | Revisão de código (lint + types) e refatoração de trechos repetidos |
| 5.10 | Testes **E2E (Playwright)** dos fluxos principais: âncoras, menu mobile, dark mode, formulário — Chromium, Firefox, WebKit e mobile 375px |
| 5.11 | Auditoria de acessibilidade automatizada com `@axe-core/playwright` (WCAG AA — sem violações critical/serious) no E2E |

**Aceite:** Lighthouse ≥ 90 nas 4 categorias (mobile); sem warnings de acessibilidade; build estável.

---

### Fase 6 — QA Final e Deploy

| # | Tarefa |
|---|---|
| 6.1 | Checklist de aceite (DoD §14) completo |
| 6.2 | Deploy de preview na Vercel + teste do formulário em produção (staging) |
| 6.3 | Sem domínio próprio (decisão do cliente) — publicar na URL padrão da Vercel |
| 6.4 | Entrega + documentação rápida (README com comandos e como editar conteúdo em `data/`) |
| 6.5 | Pipeline de **CI (GitHub Actions)**: lint, typecheck, Vitest + gate de cobertura e Playwright a cada push/PR |

**Aceite:** página no ar na URL padrão da Vercel; formulário funcionando; README entregue.

---

## 13. Estratégia e Ferramentas de Teste

> Implementada na transição Fase 2 → Fase 3 (01/08/2026). Motivação: reforçar a qualidade antes de avançar — o DoD exige lint/build/testes limpos, a Fase 4.5 exige testes do formulário e os KPIs (§3.2) exigem a11y ≥ 90.

### 13.1 Visão geral (pirâmide de testes)

| Camada | Ferramenta | O que valida |
|---|---|---|
| **Unit** | **Vitest 4** (jsdom) | Lógica pura: `data/*`, `lib/utils`, hooks, schemas **Zod**, API Route (Resend mockado) |
| **Componente** | **React Testing Library** + jest-dom + user-event | Comportamento e acessibilidade dos componentes (seções, formulário, navegação, theme toggle) |
| **E2E** | **Playwright** (+ `@axe-core/playwright`) | Fluxos reais no navegador: âncoras, dark mode, menu mobile, formulário, a11y WCAG AA, responsividade |

**Por que Vitest e não Jest?** Padrão recomendado pela documentação oficial do Next.js (guia dedicado + template oficial); compatível nativamente com React 19/ESM/TypeScript; muito mais rápido (pipeline do Vite).

**Por que Playwright e não Cypress?** Integração nativa com App Router e Vercel; paralelização gratuita em CI (sharding); WebKit real (Safari — RNF-07); `@axe-core/playwright` de primeira; maior adoção no ecossistema Next.js.

### 13.2 Arquivos de configuração

| Arquivo | Papel |
|---|---|
| `vitest.config.mts` | Ambiente jsdom, setup, alias `@`, gate de cobertura |
| `vitest.setup.ts` | Matchers jest-dom, cleanup pós-teste, mocks de `matchMedia` e `IntersectionObserver` |
| `playwright.config.ts` | 3 browsers (Chrome/Firefox/Safari) + projeto mobile 375px; webServer automático na porta 3100 |
| `e2e/smoke.spec.ts` | Smoke E2E: carregamento, âncoras, dark mode, CTA, menu mobile, a11y axe |

### 13.3 O que testar (mapa por fase)

| Fase | Testes |
|---|---|
| 0–2 (base/layout) | `lib/utils`, `data/site`, hooks (`useScrollPosition`, `useReducedMotion`), Footer, ThemeToggle — **implementados** |
| 3 (seções) | Cards Serviços/Projetos/Equipe renderizados de `data/*`; marquee respeita `prefers-reduced-motion`; FAQ (accordion acessível) — **seções novas devem vir com testes** (política do gate) |
| 4 (formulário) | Schema Zod (4.5), API route com Resend mockado (4.6), componente do formulário com RTL (4.7) |
| 5 (SEO/QA) | E2E dos fluxos principais (5.10); axe WCAG AA (5.11); Lighthouse CI para os KPIs |
| 6 (deploy) | CI completo no GitHub Actions (6.5) |

### 13.4 Comandos

| Comando | O que faz |
|---|---|
| `npm run test:run` | Unit/componente uma vez |
| `npm test` | Watch mode |
| `npm run test:coverage` | Cobertura + **gate** (thresholds abaixo) |
| `npm run test:e2e` | E2E completo (4 projetos) |
| `npm run test:e2e:ui` | E2E com UI mode (debugging) |
| `npm run test:e2e:report` | Abre o relatório HTML |
| `npx playwright install` | Baixa os navegadores (primeira vez) |

### 13.5 Cobertura e gate

Gate em `vitest.config.mts`: **statements ≥ 80%, branches ≥ 70%, functions ≥ 80%, lines ≥ 85%** — `npm run test:coverage` falha abaixo disso. Unidades críticas da Fase 4.5 (schema, API, formulário) devem mirar **≥ 90%**. Política: **todo código novo entra com teste**.

### 13.6 Mocking e casos especiais

| Caso | Abordagem |
|---|---|
| Resend (envio de e-mail) | Mock do SDK — asserta payload e tratamento de erro, sem chamadas reais |
| `next-themes` | `vi.mock` + `vi.hoisted` (estado controlado pelo teste) |
| `IntersectionObserver` / `matchMedia` | Mocks no `vitest.setup.ts`; testes específicos sobrescrevem com estado controlável |
| Server Components | Não testáveis em unit (jsdom) — cobrir via E2E (recomendação oficial do Next.js) |
| `prefers-reduced-motion` | `useReducedMotion` retorna `true` apenas quando a preferência é `reduce` |

### 13.7 CI (GitHub Actions)

Workflow `.github/workflows/ci.yml` em todo push/PR:
- **Job `quality`:** `npm ci` → lint → `tsc --noEmit` → `vitest run` → `test:coverage`
- **Job `e2e`:** `npm ci` → `npx playwright install --with-deps chromium firefox webkit` → `npx playwright test` (4 projetos) → relatório HTML anexado em caso de falha

---

## 14. Definição de Pronto (Definition of Done)

- [ ] Todas as seções do §6 implementadas e responsivas
- [ ] Formulário enviando e-mails reais com validação client + server
- [ ] Lighthouse ≥ 90 (4 categorias) no mobile
- [ ] Navegação 100% por teclado; foco visível; contraste AA
- [ ] TypeScript strict sem erros; `npm run lint`, `npm run build`, `npm run test:run` e `npm run test:coverage` (gate ≥ 80%) limpos
- [ ] E2E Playwright verde nos fluxos principais (âncoras, dark mode, menu mobile, formulário) em Chrome/Firefox/Safari/mobile — axe sem violações critical/serious
- [ ] SEO: title/description/OG/sitemap/robots/JSON-LD presentes
- [ ] Dark mode funcional e persistido
- [ ] Marquee/parallax/hover implementados e respeitando `prefers-reduced-motion`
- [ ] Ilustrações SVG (incl. letras cortadas/colagens) presentes no banner e 404
- [ ] Texturas aplicadas: grain, linhas no fundo preto, fundo "papel" nas seções claras
- [ ] Identidade fiel: sem sombras, gradientes ou glassmorphism no layout
- [ ] Analytics instalado e medindo KPIs (conversão, scroll depth, CTAs)
- [ ] Link de Política de Privacidade (LGPD) presente no rodapé
- [ ] Conteúdo editável via `data/` sem tocar em componentes

---

## 15. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Identidade visual complexa de executar com fidelidade | Médio | Tokens e storyboard na Fase 1 (antes das seções); validar hierarquia tipográfica cedo |
| Conteúdo real (projetos, equipe) indisponível | Médio | Dados de exemplo em `data/*`; troca trivial depois |
| Envio de e-mail dependente de serviço externo | Alto | `.env.example` + fallback documentado (ex.: WhatsApp como canal reserva) |
| Formulário alvo de spam | Médio | Rate limiting na API + validação no servidor |
| Vazamento da API key do Resend | Alto | `RESEND_API_KEY` apenas em `.env.local` (gitignored) e nas env vars do Vercel; nunca no repositório; rotacionar a chave se vazar |
| Animação pesada afetando performance | Baixo | CSS + IntersectionObserver; evitar libs grandes; reduzir em `prefers-reduced-motion` |
| Testes flaky / CI instável | Baixo | Retries (2x) e traces no CI; porta E2E dedicada (3100); `reuseExistingServer` apenas local |

---

## 16. Roadmap Futuro (pós-v1)

- Blog institucional (Next.js MDX) para SEO de conteúdo.
- Páginas individuais por serviço.
- Integração com CRM (HubSpot/Sheets) no envio do formulário.
- Multi-idioma (i18n).
- Versão com CMS headless (Sanity/Contentlayer) para o cliente editar sozinho.

---

## 17. Próximo Passo

**Dados já definidos:**
- **Repositório/pasta:** `Trak-Acessoria`
- **Nome:** Trak Assessoria · e-mail `contato@trakassessoria.com.br` · WhatsApp `+55 11 99999-0000` (fictícios, portfólio)
- **Provedor de e-mail:** Resend (gratuito) — **conta criada e API key pronta** (configurada em `.env.local` na Fase 0)
- **Conteúdo:** fictício, criado por mim (foco: divulgação + recursos para empresas artísticas)
- **Domínio:** não será criado neste projeto — usaremos a URL padrão da Vercel
- **Vercel:** você decidirá e criará a conta quando chegarmos à Fase 6
- **Paleta:** provisória (§9.3) — confirmação após a Fase 1

**Próximo passo:** **iniciar a Fase 3 (Seções)** — a base de testes (Vitest + RTL + Playwright + axe) já está implementada e validada; manter o gate de cobertura e os E2E verdes a cada fase.

---

## 18. Pontos de Intervenção do Usuário

> Onde você precisará agir em cada fase (o restante eu executo).

| Fase | O que você faz | Quando |
|---|---|---|
| **0 — Setup** | ✅ Nada — repositório já definido: `Trak-Acessoria` | — |
| **1 — Design System** | Confirmar a **paleta final** após ver o storyboard (paleta atual é provisória) | Após a Fase 1 |
| **3 — Seções** | ✅ Nada — conteúdo fictício criado por mim (foco: divulgação + recursos) | — |
| **4 — Formulário** | ✅ Nada — conta Resend já criada e API key pronta (configurada na Fase 0) | — |
| **5 — SEO/QA** | Escolher o analytics (opcional); sem domínio próprio — URL padrão da Vercel | Durante a Fase 5 |
| **6 — Deploy** | **Vercel:** criar/logar na conta, importar o repositório, configurar as env vars (`RESEND_API_KEY`, `CONTACT_EMAIL`, `WHATSAPP`) no painel e aprovar o resultado final | Fase 6 |

> **Testes:** nenhuma ação sua — rodam local (`npm run test:run`, `npm run test:e2e`) e no CI. O token `--primary` foi ajustado para `#D41F16` (WCAG AA) — paleta segue provisória (§9.3).
>
> Observações: (1) o envio de e-mail só funcionará de verdade após a API key do Resend estar configurada localmente e no Vercel; (2) no plano gratuito do Resend, e-mails saem do endereço de envio verificado da conta até um domínio próprio ser validado (neste projeto usaremos a URL padrão da Vercel); (3) a API key é um **segredo** — fica apenas em `.env.local` (gitignored) e nas env vars do Vercel, nunca no repositório.
