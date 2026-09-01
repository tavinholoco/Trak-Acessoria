import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { AnalyticsTracker } from "@/components/layout/analytics-tracker";
import { ConsentBanner } from "@/components/layout/consent-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/data/site";
import { seoJsonLd, serializeJsonLd } from "@/lib/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Terceiro papel tipográfico (Fase B.1): índices de seção, labels, metadados
 * e microcopy em caixa-alta. Fora dos títulos em Fraunces, a página era toda
 * Inter — a fonte mais neutra possível —, então a identidade sumia no texto
 * de apoio. A mono é o que mais aproxima da referência editorial.
 * Não é fonte variável no Google Fonts: os pesos vão explícitos.
 */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

/**
 * Metadados globais (RF-12 / Fase 5.1): title template, description, Open
 * Graph, Twitter, canonical e robots. `metadataBase` resolve URLs relativas.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "assessoria de arte",
    "gestão de empresas de arte",
    "captação de recursos",
    "editais",
    "leis de incentivo",
    "marketing cultural",
    "galerias",
    "ateliês",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Configuração de viewport (Fase 5.1): themeColor com o preto da marca e
 * colorScheme — `themeColor`/`viewport` no Metadata são deprecados nesta
 * versão do Next.js (ver `next/dist/docs`).
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F0F0F",
  // Sem `colorScheme` fixo: o next-themes (RF-10) gerencia o color-scheme
  // via CSS conforme o tema ativo — um meta estático quebraria o light mode.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Dados estruturados (RF-12 / Fase 5.2) — Organization + ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(seoJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Header />
          {/* As páginas renderizam seu próprio <main> (landmark único) */}
          <div className="flex-1">{children}</div>
          <Footer />
          {/* Toasts do formulário (RF-08 / Fase 4.4) — dentro do ThemeProvider */}
          <Toaster />
          {/* Analytics LGPD (Fase 5.5): consentimento + KPIs (scroll/CTA) */}
          <ConsentBanner />
          <AnalyticsTracker />
        </ThemeProvider>
        {/* Vercel Speed Insights (Fase 6): RUM de Core Web Vitals — sem cookies
        de rastreamento; dados anônimos; só envia dados em produção na Vercel. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
