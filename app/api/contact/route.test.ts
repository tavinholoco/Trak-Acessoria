import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RATE_LIMIT_MAX, resetRateLimits } from "@/lib/rate-limit";
import { POST } from "./route";

// Mock do SDK do Resend (PRD §13.6): asserta payload e erros sem chamadas reais.
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

const validPayload = {
  name: "Ana Souza",
  email: "ana@galeria.com.br",
  companyType: "galeria",
  message: "Quero uma proposta para minha galeria de arte.",
};

function makeRequest(body: unknown, ip = "127.0.0.1") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact (Fase 4.3-4.6 / RF-08)", () => {
  beforeEach(() => {
    resetRateLimits();
    sendMock.mockReset();
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    vi.stubEnv("CONTACT_EMAIL", "contato@trakassessoria.com.br");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("200 — envia e-mail com payload correto e retorna ok", async () => {
    sendMock.mockResolvedValue({
      data: { id: "email_1" },
      error: null,
      headers: null,
    });

    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });

    expect(sendMock).toHaveBeenCalledTimes(1);
    const call = sendMock.mock.calls[0][0];
    expect(call.to).toEqual(["contato@trakassessoria.com.br"]);
    expect(call.replyTo).toBe(validPayload.email);
    expect(call.subject).toContain(validPayload.name);
    expect(call.html).toContain(validPayload.name);
  });

  it("400 — payload inválido retorna issues e NÃO chama o Resend", async () => {
    const response = await POST(
      makeRequest({ name: "A", email: "x", companyType: "governo", message: "oi" })
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Dados inválidos.");
    expect(body.issues.length).toBeGreaterThan(0);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("400 — corpo que não é JSON válido", async () => {
    const response = await POST(makeRequest("não-é-json"));
    expect(response.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("429 — bloqueia após o limite de tentativas por IP (rate limit)", async () => {
    sendMock.mockResolvedValue({
      data: { id: "email_1" },
      error: null,
      headers: null,
    });

    // 3 requisições dentro do limite (RATE_LIMIT_MAX = 3)
    for (let i = 0; i < 3; i++) {
      const response = await POST(makeRequest(validPayload, "203.0.113.9"));
      expect(response.status).toBe(200);
    }

    // 4ª tentativa do mesmo IP é bloqueada
    const blocked = await POST(makeRequest(validPayload, "203.0.113.9"));
    expect(blocked.status).toBe(429);
  });

  it("502 — erro do Resend retorna mensagem genérica (sem vazar detalhes)", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    sendMock.mockResolvedValue({
      data: null,
      error: {
        message: "quota excedida",
        statusCode: 429,
        name: "application_error",
      },
      headers: null,
    });

    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(502);
    const body = await response.json();
    // O erro interno é logado no servidor, mas NÃO vaza para o client.
    expect(body.error).toBe(
      "Não foi possível enviar a mensagem. Tente novamente ou fale no WhatsApp."
    );
    expect(consoleError).toHaveBeenCalled();
  });

  it("502 — RESEND_API_KEY ausente não chama o Resend", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(502);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("200 — honeypot preenchido é descartado silenciosamente (anti-bot)", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, honeypot: "spam-bot" })
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("413 — corpo acima do limite de tamanho é rejeitado (anti-DoS)", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, message: "a".repeat(20 * 1024) })
    );
    expect(response.status).toBe(413);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("429 — spoofing de x-forwarded-for não zera o limite (usa o último IP)", async () => {
    sendMock.mockResolvedValue({
      data: { id: "email_1" },
      error: null,
      headers: null,
    });

    // O IP real (anexado por último pela Vercel) é 203.0.113.9; o atacante
    // varia o primeiro valor forjado a cada request.
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      const response = await POST(
        makeRequest(validPayload, `203.0.113.${i}, 203.0.113.9`)
      );
      expect(response.status).toBe(200);
    }

    // 4ª tentativa do mesmo IP real é bloqueada mesmo com prefixo forjado novo.
    const blocked = await POST(
      makeRequest(validPayload, "999.9.9.9, 203.0.113.9")
    );
    expect(blocked.status).toBe(429);
  });
});
