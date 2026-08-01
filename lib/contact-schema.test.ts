import { describe, expect, it } from "vitest";

import {
  COMPANY_TYPE_VALUES,
  companyTypeOptions,
  contactSchema,
} from "./contact-schema";

const validInput = {
  name: "Ana Souza",
  email: "ana@galeria.com.br",
  companyType: "galeria",
  message: "Quero uma proposta para minha galeria de arte.",
};

describe("contactSchema (Fase 4.1 / RF-08)", () => {
  it("aceita dados válidos", () => {
    expect(contactSchema.safeParse(validInput).success).toBe(true);
  });

  it("rejeita nome com menos de 2 caracteres", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejeita nome com apenas espaços (trim antes do min)", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "   " });
    expect(result.success).toBe(false);
  });

  it("rejeita e-mail inválido", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "nao-e-email" });
    expect(result.success).toBe(false);
  });

  it("rejeita tipo de empresa fora da lista", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      companyType: "governo",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita mensagem com menos de 10 caracteres", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "oi" });
    expect(result.success).toBe(false);
  });

  it("aplica trim em nome e mensagem", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "  Ana Souza  ",
      message: "  Quero uma proposta para minha galeria de arte.  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Ana Souza");
      expect(result.data.message).toBe("Quero uma proposta para minha galeria de arte.");
    }
  });

  it("corpo vazio gera issues para todos os campos", () => {
    const result = contactSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join("."));
      expect(paths).toEqual(
        expect.arrayContaining(["name", "email", "companyType", "message"])
      );
    }
  });

  it("mensagens de erro são amigáveis (pt-BR)", () => {
    // Valores do tipo certo, mas que falham no check — é onde as mensagens
    // customizadas do Zod v4 se aplicam (undefined gera a mensagem de tipo).
    const result = contactSchema.safeParse({
      name: "A",
      email: "invalido",
      companyType: "x",
      message: "curta",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain("Informe seu nome (mínimo 2 caracteres).");
      expect(messages).toContain("Informe um e-mail válido.");
      expect(messages).toContain("Selecione o tipo de empresa.");
      expect(messages).toContain(
        "Sua mensagem precisa de pelo menos 10 caracteres."
      );
    }
  });
});

describe("companyTypeOptions (Fase 4.1)", () => {
  it("cobre todos os valores do enum com rótulos únicos", () => {
    const values = companyTypeOptions.map((option) => option.value);
    expect(new Set(values)).toEqual(new Set(COMPANY_TYPE_VALUES));
    const labels = companyTypeOptions.map((option) => option.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
