# Trak Assessoria — Landing Page

Landing page institucional da **Trak Assessoria**, assessoria para empresas e profissionais do
mercado de arte (galerias, ateliês, estúdios, produtoras culturais, curadores e artistas).

> Projeto pessoal de portfólio — nome, e-mail e WhatsApp são fictícios (dados de demonstração).
> Especificação completa no `PRD.md` (raiz do projeto).

**Stack:** Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui ·
Vitest + React Testing Library · Playwright (+ axe-core) · Vercel

---

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (`http://localhost:3000`) |
| `npm run build` | Build de produção (Next.js) |
| `npm run start` | Serve a build de produção |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck (sem emitir arquivos) |
| `npm run test:run` | Testes unitários/componentes (uma vez) |
| `npm test` | Testes em watch mode |
| `npm run test:coverage` | Testes + relatório de cobertura com **gate** (≥ 80%) |
| `npm run test:e2e` | E2E Playwright (Chromium, Firefox, WebKit, mobile 375px) |
| `npm run test:e2e:ui` | E2E com UI mode (debugging interativo) |

Primeira vez com Playwright: `npx playwright install` baixa os navegadores.

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha (nunca commitar `.env.local`):

| Variável | Uso |
|---|---|
| `CONTACT_EMAIL` | Destinatário do formulário de contato |
| `WHATSAPP` | Número do WhatsApp (formato `5511999990000`) |
| `RESEND_API_KEY` | Chave da API do Resend (envio de e-mail) |
| `RESEND_FROM` | Remetente (padrão: `onboarding@resend.dev`) |
| `NEXT_PUBLIC_SITE_URL` | URL pública (canonical, sitemap, OG) |
| `NEXT_PUBLIC_ANALYTICS` | `plausible` para ativar o analytics (opcional) |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Domínio no provider de analytics (opcional) |

> **No deploy (Vercel):** configurar `RESEND_API_KEY`, `CONTACT_EMAIL`, `WHATSAPP` e
> `NEXT_PUBLIC_SITE_URL` no painel (Settings → Environment Variables). O Vercel Speed Insights
> é ativado automaticamente pela plataforma — sem configuração adicional.

---

## Como editar o conteúdo

Todo o conteúdo fica isolado em `data/` — edite os arquivos sem tocar em componentes:

| Arquivo | Conteúdo |
|---|---|
| `data/site.ts` | Nome, tagline, descrição, e-mail, WhatsApp, URL e redes |
| `data/services.ts` | Os 6 serviços (grid da seção Serviços) |
| `data/projects.ts` | Cases/pôsteres com métricas (seção Projetos) |
| `data/team.ts` | Integrantes e mini-bios (seção Equipe) |
| `data/faq.ts` | Perguntas do accordion (FAQ, junto ao Contato) |
| `data/marquee.ts` | Itens do marquee infinito e headline do banner |
| `data/privacidade.ts` | Política de Privacidade (LGPD) |

> Política de Privacidade disponível em `/privacidade` (link no rodapé e no banner de
> consentimento de analytics).

---

## Estrutura do projeto

```
app/                  # Rotas (página única + /privacidade + API de contato + sitemap/robots)
components/
  ui/                 # Primitivos shadcn/ui
  layout/             # Header, mobile-nav, footer, consent-banner, analytics-tracker
  sections/           # Hero, marquee, services, projects, team, contact, faq, poster…
data/                 # Conteúdo editável (ver tabela acima)
lib/                  # Utils, SEO (JSON-LD), analytics, contact (Resend), schemas Zod
hooks/                # useScrollDepth, useScrollPosition, useReducedMotion, useSectionObserver
art/                  # Ilustrações SVG autorais
e2e/                  # Testes Playwright (smoke, seo, consent, privacidade)
```

---

## SEO, performance e analytics

- Metadados globais (title/description/OG/Twitter/canonical) no `app/layout.tsx`.
- `sitemap.xml` e `robots.txt` gerados em `/`.
- Dados estruturados JSON-LD (Organization + ProfessionalService) em `lib/seo.ts`.
- **Vercel Speed Insights** (`@vercel/speed-insights`) coleta Core Web Vitals anônimos em
  produção — sem cookies, sem consentimento necessário (ver Política de Privacidade).
- **Analytics opcional** (Plausible-compatível): só ativo após consentimento LGPD no banner.

---

## Testes e CI

- Unit/componente: Vitest + RTL (`vitest.config.mts`, `vitest.setup.ts`).
- E2E: Playwright (`playwright.config.ts`, porta 3100) — smoke, SEO, consentimento LGPD,
  Política de Privacidade e auditoria **axe** (WCAG AA).
- CI: `.github/workflows/ci.yml` roda lint → tsc → vitest → coverage → Playwright em todo
  push/PR no GitHub Actions.

---

## Deploy

Hospedado na **Vercel** (URL padrão, sem domínio próprio): `https://trak-acessoria.vercel.app`.
Importar o repositório `tavinholoco/Trak-Acessoria` no painel da Vercel e configurar as
variáveis de ambiente acima. O checklist completo da Fase 6 está em `FASE-6.md`.
