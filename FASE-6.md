# Fase 6 — QA Final e Deploy (checklist executável)

> Status de entrada: **Fase 5 concluída e commitada** (`b283f0f` — push feito para `origin/master`).
> Lighthouse local (mobile): Performance **92** · Acessibilidade **100** · Boas Práticas **100** · SEO **100** (≥ 90 ✅).

## 0. Pré-requisitos

- [ ] Push feito para `origin/master` (CI do GitHub Actions disparado automaticamente).
- [ ] CI verde no último push: lint → tsc → vitest → coverage → Playwright (ver aba *Actions* no GitHub).
- [ ] Conta **Vercel** criada/logada (https://vercel.com) — decisão do cliente.
- [ ] Repositório `tavinholoco/Trak-Acessoria` acessível pela conta Vercel (import via GitHub).

## 1. Deploy na Vercel (6.2 + 6.3)

- [ ] **Vercel → Add New → Project → Import Git Repository** → escolher `Trak-Acessoria`.
- [ ] Framework: **Next.js** (auto-detectado). Build command: `npm run build` (padrão).
- [ ] **Sem domínio próprio** (decisão do PRD §6.3): manter a URL padrão da Vercel
      (ex.: `https://trak-acessoria.vercel.app`).
- [ ] No painel do projeto: **Settings → Environment Variables** — adicionar no ambiente
      `Production` (e `Preview` se quiser testar em staging):

| Variável | Valor | Observação |
|---|---|---|
| `CONTACT_EMAIL` | `contato@trakassessoria.com.br` | Obrigatória |
| `WHATSAPP` | `5511999990000` | Obrigatória |
| `RESEND_API_KEY` | chave real da conta Resend | **Obrigatória** — segredo, nunca no git |
| `RESEND_FROM` | `Trak Assessoria <onboarding@resend.dev>` | Opcional (ou e-mail verificado) |
| `NEXT_PUBLIC_SITE_URL` | `https://trak-assessoria.vercel.app` (URL final) | Obrigatória p/ canonical/sitemap/OG |
| `NEXT_PUBLIC_ANALYTICS` | `plausible` | Opcional — só se quiser medir KPIs §3.2 |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | mesmo domínio da URL final | Opcional — junto do analytics |

- [ ] Clicar **Deploy** e aguardar o build concluir (aprovar quando pronto).

## 2. Validação pós-deploy (6.1 + 6.2)

### Formulário (RF-08 / Fase 4)
- [ ] Enviar mensagem pelo formulário de produção → **e-mail real chega na caixa do Resend**.
- [ ] Campos inválidos bloqueiam com mensagens claras (validação client + server).
- [ ] Toast de sucesso aparece e o formulário reseta.

### Navegação e tema
- [ ] Âncoras (Início/Serviços/Projetos/Equipe/Contato) rolam suavemente; seção ativa destacada.
- [ ] Menu mobile abre/fecha; CTA "Falar no WhatsApp" funciona no mobile.
- [ ] Dark mode alterna e **persiste** após reload (next-themes).

### SEO / infra (RF-12 / Fase 5)
- [ ] `/sitemap.xml` responde 200 e lista `/` + `/privacidade`.
- [ ] `/robots.txt` responde 200, permite indexação e aponta o sitemap.
- [ ] `/privacidade` abre; link no rodapé e no banner de consentimento.
- [ ] OG image gerada (compartilhar URL no WhatsApp → preview 1200×630).
- [ ] 404 estilizado abre em URL inexistente.

### Analytics (se habilitado — Fase 5.5)
- [ ] Banner LGPD aparece para visitante novo; "ACEITAR" ativa; "RECUSAR" mantém off.
- [ ] Eventos (scroll depth 25/50/75/100%, cliques em CTA) aparecem no painel do Plausible após aceite.

### Performance / acessibilidade
- [ ] **Lighthouse mobile ≥ 90** nas 4 categorias na URL de produção (local já validado: 92/100/100/100).
- [ ] Navegação 100% por teclado; foco visível; contraste AA.
- [ ] Core Web Vitals: LCP < 2,5 s · CLS < 0,1 · INP < 200 ms (validar no PageSpeed Insights).

## 3. DoD — conferência final (§14)

- [ ] Todas as seções §6 implementadas e responsivas (375 → 1440px).
- [ ] Formulário enviando e-mails reais (client + server).
- [ ] Lighthouse ≥ 90 (4 categorias) no mobile.
- [ ] Navegação por teclado; foco visível; contraste AA.
- [ ] TypeScript strict sem erros; `lint`, `build`, `test:run`, `test:coverage` (gate ≥ 80%) limpos.
- [ ] E2E Playwright verde (Chrome/Firefox/Safari/mobile) + axe sem critical/serious.
- [ ] SEO: title/description/OG/sitemap/robots/JSON-LD presentes.
- [ ] Dark mode funcional e persistido.
- [ ] Marquee/parallax/hover respeitando `prefers-reduced-motion`.
- [ ] Ilustrações SVG no banner e 404; texturas aplicadas.
- [ ] Identidade fiel: sem sombras, gradientes ou glassmorphism no layout.
- [ ] Analytics instalado e medindo KPIs (conversão, scroll depth, CTAs) — se habilitado.
- [ ] Link de Política de Privacidade (LGPD) no rodapé.
- [ ] Conteúdo editável via `data/` sem tocar em componentes.

## 4. Entrega e documentação (6.4)

- [ ] **README** atualizado com: comandos (`npm run dev|build|test:run|test:coverage|test:e2e`),
      como editar conteúdo em `data/*`, e onde está a Política de Privacidade.
- [ ] Confirmar com o cliente a **paleta final** (§9.3 ainda é provisória) e, se disponível,
      trocar dados fictícios pelos reais em `data/*`.

## 5. CI (6.5)

- [ ] `.github/workflows/ci.yml` já existe (lint, typecheck, vitest + coverage, playwright) —
      verificar que o **último run pós-push está verde** no GitHub Actions.

---

## ✅ Aceite da Fase 6

- [ ] Página no ar na URL padrão da Vercel.
- [ ] Formulário funcionando (e-mail real recebido em produção).
- [ ] README entregue com comandos e guia de edição de conteúdo.
