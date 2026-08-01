This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testes

Testes **unitários/componentes** com **Vitest + React Testing Library** e **E2E** com **Playwright** (+ `@axe-core/playwright` para acessibilidade WCAG AA).

```bash
npm run test:run        # unit/componente (uma vez)
npm test                # watch mode
npm run test:coverage   # com relatório e gate de cobertura
npm run test:e2e        # E2E: chromium, firefox, webkit e mobile (375px)
npm run test:e2e:ui     # E2E com UI mode (debugging interativo)
```

Primeira vez com Playwright: `npx playwright install` baixa os navegadores.

- Config unit: `vitest.config.mts` + `vitest.setup.ts`
- Config E2E: `playwright.config.ts` (porta 3100, servidor automático)
- E2E: `e2e/smoke.spec.ts` (navegação, dark mode, menu mobile, a11y axe)
- CI: `.github/workflows/ci.yml` (lint, typecheck, vitest + coverage, playwright)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
