import { z } from "zod";

/**
 * Schema do formulário de contato (RF-08 / Fase 4.1).
 * Compartilhado entre client (validação no formulário) e servidor
 * (validação na API Route) — uma única fonte de verdade.
 *
 * Zod v4: z.email() e z.enum() aceitam mensagem customizada como string.
 * `trim` evita campos só de espaços (mantém o valor limpo no submit).
 */

/** Valores aceitos no select "tipo de empresa" (RF-08). */
export const COMPANY_TYPE_VALUES = [
  "galeria",
  "atelie",
  "produtora",
  "artista",
  "outro",
] as const;

export type CompanyType = (typeof COMPANY_TYPE_VALUES)[number];

/** Opções do select — rótulo amigável por valor (uma fonte de verdade). */
export const companyTypeOptions: ReadonlyArray<{
  value: CompanyType;
  label: string;
}> = [
  { value: "galeria", label: "Galeria de arte" },
  { value: "atelie", label: "Ateliê / Estúdio" },
  { value: "produtora", label: "Produtora cultural" },
  { value: "artista", label: "Artista / Empresário" },
  { value: "outro", label: "Outro" },
];

/** Schema estrito — usado pelo servidor e pelo resolver do formulário. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome (mínimo 2 caracteres)."),
  email: z.email("Informe um e-mail válido."),
  companyType: z.enum(COMPANY_TYPE_VALUES, "Selecione o tipo de empresa."),
  message: z
    .string()
    .trim()
    .min(10, "Sua mensagem precisa de pelo menos 10 caracteres."),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Valores do formulário no cliente — o select começa vazio ("") para exibir o
 * placeholder; o schema estrito valida no submit e na API Route.
 */
export type ContactFormValues = {
  name: string;
  email: string;
  companyType: CompanyType | "";
  message: string;
};
