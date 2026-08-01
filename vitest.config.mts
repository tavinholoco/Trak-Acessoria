import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Sem @vitejs/plugin-react: o esbuild do Vite já transforma JSX com o
  // runtime automático via "jsx": "react-jsx" do tsconfig (React 19).
  resolve: {
    alias: {
      // Espelha o alias "@/*" do tsconfig.json.
      "@": rootDir,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: [
      "node_modules/**",
      "e2e/**",
      ".next/**",
      "playwright-report/**",
      "test-results/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "coverage",
      // Gate mínimo de cobertura (PRD — Estratégia de Testes).
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 85,
      },
      exclude: [
        "e2e/**",
        "playwright.config.ts",
        "vitest.config.mts",
        "vitest.setup.ts",
        "next.config.ts",
        "eslint.config.mjs",
        "postcss.config.mjs",
        "app/storyboard/**",
        "components/ui/**",
        "components.json",
      ],
    },
  },
});
