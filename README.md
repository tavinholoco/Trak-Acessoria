# 🎨 Trak Assessoria — Landing Page

Landing page institucional **one-page** da **Trak Assessoria**, assessoria/consultoria para empresas e
profissionais do mercado de arte — galerias, ateliês, estúdios, produtoras culturais, curadores e
artistas que se organizam como negócio.

> 💼 **Projeto pessoal de portfólio:** nome, e-mail e WhatsApp são fictícios (dados de demonstração).
> Especificação completa no [`PRD.md`](PRD.md).

---

## 🛠️ Stack & Tecnologias

| Categoria | Tecnologias |
|---|---|
| **Framework** | ![Next.js 16](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React 19](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black) |
| **Linguagem** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| **Estilo & UI** | ![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS%20v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=black) ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![Base UI](https://img.shields.io/badge/Base%20UI-4F46E5?style=for-the-badge) ![Lucide](https://img.shields.io/badge/Lucide-FF5C00?style=for-the-badge&logo=lucide&logoColor=white) |
| **Tema & Animações** | ![next-themes](https://img.shields.io/badge/next--themes-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![tw-animate-css](https://img.shields.io/badge/tw--animate--css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black) |
| **Formulário** | ![react-hook-form](https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white) ![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white) ![sonner](https://img.shields.io/badge/sonner-F97316?style=for-the-badge) |
| **Testes (unit/componente)** | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white) ![Testing Library](https://img.shields.io/badge/Testing%20Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white) ![jsdom](https://img.shields.io/badge/jsdom-323330?style=for-the-badge) |
| **Testes (E2E)** | ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white) ![axe-core](https://img.shields.io/badge/axe--core-0E7AC4?style=for-the-badge) |
| **Qualidade** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Vercel Speed Insights](https://img.shields.io/badge/Speed%20Insights-000000?style=for-the-badge&logo=vercel&logoColor=white) |
| **CI/CD & Deploy** | ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

### Detalhamento das tecnologias

| Camada | Tecnologia | Papel no projeto |
|---|---|---|
| Framework | **Next.js 16** (App Router) | SSR/SSG, rotas, API Routes, otimização de imagens e fontes |
| UI | **React 19** | Renderização de componentes |
| Linguagem | **TypeScript** (strict) | Tipagem estática — sem `any` |
| Estilo | **Tailwind CSS v4** + `@tailwindcss/postcss` | Design system utilitário, tokens CSS |
| UI Kit | **shadcn/ui** (v4, via CLI) | Componentes primitivos (`components/ui/*`) |
| Primitivas | **@base-ui/react** | Componentes headless de acessibilidade usados pelo shadcn |
| Icons | **lucide-react** | Ícones (uso mínimo — identidade tipográfica) |
| Utilitários CSS | **class-variance-authority**, **clsx**, **tailwind-merge** | `cn()` em `lib/utils.ts` |
| Animações | **tw-animate-css** + CSS/IntersectionObserver | Transições leves sem lib pesada |
| Tipografia | **Fraunces** (display) + **Inter** (corpo) + **IBM Plex Mono** (labels e dados) via `next/font` | Três papéis tipográficos, self-hosted e sem layout shift |
| Tema | **next-themes** | Dark mode persistido (preto `#0F0F0F` default) |
| Formulário | **react-hook-form** + **@hookform/resolvers** + **Zod** | Validação client + server |
| Toasts | **sonner** | Feedback do envio do formulário |
| E-mail | **Resend** | Envio dos contatos via API Route |
| Observabilidade | **@vercel/speed-insights** | Core Web Vitals anônimos em produção |
| Testes unitários | **Vitest 4** + **jsdom** + **@vitest/coverage-v8** | Lógica pura, hooks, schemas, API |
| Testes de componente | **Testing Library** + **jest-dom** + **user-event** | Comportamento e a11y dos componentes |
| Testes E2E | **Playwright** + **@axe-core/playwright** | 3 navegadores + mobile 375px, auditoria WCAG AA |
| Lint | **ESLint 9** + `eslint-config-next` | Qualidade de código |
| CI | **GitHub Actions** | lint → typecheck → vitest → coverage → Playwright |
| Deploy | **Vercel** | Hospedagem (URL padrão, sem domínio próprio) |

---

## ✨ Funcionalidades

- **Página única** com navegação por âncoras: Início · Serviços · Projetos · Equipe · Contato.
- **Seções em bloco-pôster** numeradas de 03 a 07: grid de 6 serviços, cases com métricas, equipe
  editorial, dúvidas em accordion e contato. Antes delas, o Hero gigante, o marquee infinito e um
  banner com as ilustrações autorais em colagem sangrando nas bordas.
- **Formulário de contato** funcional com validação Zod (client + server), envio via **Resend**
  e feedback com **sonner**.
- **Botão de WhatsApp** como canal reserva.
- **Dark mode** alternável e persistido (identidade brutalista com preto `#0F0F0F`). O tema escuro é
  escuro na página inteira: as seções neutras variam por um degrau discreto e o ritmo vem da cor da
  marca — o bloco azul `#1D3BFF` da Equipe, a faixa e a barra de consentimento em vermelho.
- **Animações** com respeito a `prefers-reduced-motion`: marquee, parallax leve, hover exagerado, reveal on scroll.
- **SEO técnico**: metadados, Open Graph/Twitter, `sitemap.xml`, `robots.txt` e dados estruturados JSON-LD.
- **Acessibilidade WCAG AA**: navegação por teclado, contraste AA, `@axe-core` no E2E.
- **LGPD**: Política de Privacidade em `/privacidade` + banner de consentimento de analytics.
- **404 estilizado** como pôster da marca.
- **Conteúdo editável** em `data/*` — sem tocar em componentes.

---

## 📁 Estrutura do projeto

```
Trak-Acessoria/
├── app/
│   ├── layout.tsx              # Root layout: fontes, ThemeProvider, Header/Footer
│   ├── page.tsx                # Página única (compõe as seções)
│   ├── globals.css             # Tailwind v4 + tokens CSS
│   ├── not-found.tsx           # Página 404
│   ├── sitemap.ts / robots.ts  # Sitemap e robots gerados
│   ├── privacidade/            # Política de Privacidade (LGPD)
│   ├── storyboard/             # Página de teste de componentes (dev only)
│   └── api/contact/route.ts    # POST /api/contact (valida e envia e-mail via Resend)
├── components/
│   ├── ui/                     # Primitivos shadcn/ui
│   ├── layout/                 # Header, mobile-nav, footer, consent-banner, analytics-tracker
│   └── sections/               # Hero, marquee, services, projects, team, contact, faq…
├── data/                       # Conteúdo editável (ver seção abaixo)
├── lib/                        # utils, seo (JSON-LD), analytics, contact (Resend), schemas Zod
├── hooks/                      # useScrollDepth, useScrollPosition, useReducedMotion, useSectionObserver
├── types/                      # Tipos compartilhados
├── art/                        # Ilustrações SVG autorais
├── e2e/                        # Testes Playwright (smoke, seo, consent, privacidade)
├── vitest.config.mts           # Config do Vitest + gate de cobertura
├── vitest.setup.ts             # Setup: jest-dom + mocks (matchMedia, Intersection/ResizeObserver)
├── playwright.config.ts        # E2E: 3 browsers + mobile 375px (porta 3100)
└── .github/workflows/ci.yml    # CI: lint + typecheck + vitest + coverage + playwright
```

---

## 📋 Pré-requisitos

| Ferramenta | Versão | Como verificar |
|---|---|---|
| **Node.js** | **≥ 22** (LTS) | `node --version` |
| **npm** | ≥ 10 (vem com o Node) | `npm --version` |
| **Git** | qualquer recente | `git --version` |

> 💡 Recomendamos o Node 22 LTS. O CI do projeto roda na versão 22 — manter localmente a mesma
> versão evita diferenças de comportamento.

---

## 🚀 Como rodar localmente (passo a passo)

### 1. Clonar o repositório

```bash
git clone git@github.com:tavinholoco/Trak-Acessoria.git
cd Trak-Acessoria
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

O projeto usa variáveis de ambiente para e-mail, WhatsApp e analytics. Existe um modelo em
`.env.example` — copie-o e preencha:

```bash
cp .env.example .env.local
```

> ⚠️ `.env.local` está no `.gitignore` e **nunca** deve ser commitado (contém a chave da API do Resend).
> O arquivo `.env.example` é o único versionado.

Abra o `.env.local` e preencha os valores:

| Variável | Obrigatória? | Descrição |
|---|---|---|
| `CONTACT_EMAIL` | ✅ | E-mail que recebe os contatos do formulário |
| `WHATSAPP` | ✅ | Número do WhatsApp no formato `5511999990000` |
| `RESEND_API_KEY` | ✅ | Chave da API do Resend (`re_...`). Crie uma conta gratuita em [resend.com](https://resend.com) |
| `RESEND_FROM` | ❌ | Remetente. Padrão: `Trak Assessoria <onboarding@resend.dev>` |
| `NEXT_PUBLIC_SITE_URL` | ✅ | URL pública (canonical, sitemap, OG). Local: `http://localhost:3000` |
| `NEXT_PUBLIC_ANALYTICS` | ❌ | `plausible` para ativar analytics (opcional, com consentimento LGPD) |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | ❌ | Domínio no provider de analytics (usar junto do analytics) |
| `NEXT_PUBLIC_ANALYTICS_SCRIPT_URL` | ❌ | URL do script do provider (padrão: `https://plausible.io/js/script.js`; use para self-hosted) |

### 4. Subir o servidor de desenvolvimento

```bash
npm run dev
```

Abra **http://localhost:3000** no navegador. A página recarrega automaticamente a cada alteração
(hot reload).

> 🎨 Dica: a página de **storyboard** (teste visual dos componentes) fica em
> **http://localhost:3000/storyboard** (dev only).

### 5. (Opcional) Testar o envio de e-mail do formulário

Para o formulário enviar e-mails de verdade, a `RESEND_API_KEY` precisa ser válida. Sem ela, o
formulário continua validando, mas o envio retorna erro — o WhatsApp funciona como canal reserva.

---

## 📜 Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (`http://localhost:3000`) |
| `npm run build` | Build de produção (Next.js) |
| `npm run start` | Serve a build de produção (após `build`) |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck (sem emitir arquivos) |
| `npm run test:run` | Testes unitários/componentes (uma vez) |
| `npm test` | Testes em **watch mode** |
| `npm run test:coverage` | Testes + relatório de cobertura com **gate** (statements ≥ 80%, branches ≥ 70%, functions ≥ 80%, lines ≥ 85%) |
| `npm run test:e2e` | E2E Playwright (Chromium, Firefox, WebKit, mobile 375px) |
| `npm run test:e2e:ui` | E2E com **UI mode** (debugging interativo) |
| `npm run test:e2e:report` | Abre o relatório HTML do último run |

---

## 🧪 Testes e qualidade

O projeto usa uma **pirâmide de testes** (PRD §13):

| Camada | Ferramenta | O que valida |
|---|---|---|
| **Unit** | Vitest (jsdom) | Lógica pura: `data/*`, `lib/utils`, hooks, schemas Zod, API Route (Resend mockado) |
| **Componente** | Testing Library + jest-dom + user-event | Comportamento e acessibilidade dos componentes |
| **E2E** | Playwright + axe-core | Fluxos reais: âncoras, dark mode, menu mobile, formulário, consentimento LGPD, WCAG AA |

**Rodando os testes:**

```bash
# Unit/componente (uma vez)
npm run test:run

# E2E — na primeira vez, baixe os navegadores:
npx playwright install
npm run test:e2e
```

> O E2E sobe um servidor próprio na **porta 3100** (`npm run build && npm run start -p 3100`),
> para não conflitar com o `npm run dev` (porta 3000).

**Checklist de qualidade antes de abrir um PR:**

```bash
npm run lint && npx tsc --noEmit && npm run test:run && npm run test:coverage
```

---

## ✏️ Como editar o conteúdo

Todo o conteúdo da página fica isolado em `data/` — edite os arquivos **sem tocar em componentes**:

| Arquivo | Conteúdo |
|---|---|
| `data/site.ts` | Nome, tagline, descrição, e-mail, WhatsApp, URL e redes sociais |
| `data/services.ts` | Os 6 serviços (grid da seção Serviços) |
| `data/projects.ts` | Cases/pôsteres com métricas (seção Projetos) |
| `data/team.ts` | Integrantes e mini-bios (seção Equipe) |
| `data/faq.ts` | Perguntas do accordion (seção Dúvidas) |
| `data/marquee.ts` | Itens do marquee infinito e headline do banner |
| `data/privacidade.ts` | Política de Privacidade (LGPD) |

---

## 🔍 SEO, performance e analytics

- **Metadados** globais (title/description/OG/Twitter/canonical) em `app/layout.tsx`.
- `sitemap.xml` e `robots.txt` gerados automaticamente em `/`.
- **JSON-LD** (Organization + ProfessionalService) em `lib/seo.ts`.
- **Imagens otimizadas** com `next/image` (AVIF/WebP) e fontes auto-otimizadas via `next/font`.
- **Vercel Speed Insights** coleta Core Web Vitals anônimos em produção — sem cookies.
- **Analytics opcional** (compatível com Plausible): só ativa após o consentimento LGPD no banner.
- **Política de Privacidade** em `/privacidade` (link no rodapé e no banner de consentimento).

---

## 🤖 CI/CD e Deploy

### CI — GitHub Actions

O workflow `.github/workflows/ci.yml` roda em todo **push/PR** para `main`/`master`:

- **Job `quality`:** `npm ci` → `npm run lint` → `npx tsc --noEmit` → `npm run test:run` → `npm run test:coverage`
- **Job `e2e`:** `npm ci` → instala os 3 navegadores → `npx playwright test` (4 projetos) → relatório
  HTML anexado em caso de falha.

### Deploy — Vercel

1. Crie/logue na conta em [vercel.com](https://vercel.com) e importe o repositório `Trak-Acessoria`
   (Add New → Project → Import Git Repository).
2. Framework **Next.js** (auto-detectado); build command `npm run build` (padrão).
3. Em **Settings → Environment Variables**, adicione (Production e Preview):
   `CONTACT_EMAIL`, `WHATSAPP`, `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_SITE_URL`,
   e, se desejar analytics, `NEXT_PUBLIC_ANALYTICS` + `NEXT_PUBLIC_ANALYTICS_DOMAIN`
   (+ `NEXT_PUBLIC_ANALYTICS_SCRIPT_URL` se usar Plausible self-hosted).
4. Clique em **Deploy**. O checklist completo da Fase 6 está em [`FASE-6.md`](FASE-6.md).

> Sem domínio próprio (decisão do PRD): a página fica na URL padrão da Vercel, ex.
> `https://trak-assessoria.vercel.app`.

---

## 📄 Documentação relacionada

| Documento | Conteúdo |
|---|---|
| [`PRD.md`](PRD.md) | Especificação completa do produto (escopo, design system, fases, testes) |
| [`FASE-6.md`](FASE-6.md) | Checklist executável de QA final e deploy na Vercel |
| [`AGENTS.md`](AGENTS.md) | Aviso de breaking changes do Next.js 16 (para agentes/LLMs) |

---

## 🗺️ Roadmap (pós-v1)

- Blog institucional (Next.js MDX) para SEO de conteúdo.
- Páginas individuais por serviço.
- Integração com CRM (HubSpot/Sheets) no envio do formulário.
- Multi-idioma (i18n).
- CMS headless (Sanity/Contentlayer) para o cliente editar sozinho.
