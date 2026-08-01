import { Resend } from "resend";

import type { ContactInput } from "./contact-schema";

/** Resultado do envio — `ok: true` com id, ou `ok: false` com mensagem amigável. */
export type SendContactResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

/**
 * Envia o e-mail de contato via Resend (Fase 4.3 / RF-08).
 * Server-only: usa variáveis de ambiente (RNF-05 — sem segredos no client).
 *
 * Sem RESEND_API_KEY retorna erro controlado: o formulário mostra o toast de
 * erro e o WhatsApp segue como canal reserva (PRD §15).
 */
export async function sendContactEmail(
  input: ContactInput
): Promise<SendContactResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      error: "Serviço de e-mail não configurado no servidor.",
    };
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "Trak Assessoria <onboarding@resend.dev>",
    to: [process.env.CONTACT_EMAIL ?? "contato@trakassessoria.com.br"],
    replyTo: input.email,
    subject: `Novo contato — ${input.name}`,
    text: [
      `Nome: ${input.name}`,
      `E-mail: ${input.email}`,
      `Tipo de empresa: ${input.companyType}`,
      "",
      input.message,
    ].join("\n"),
    html: [
      "<p><strong>Novo contato — Trak Assessoria</strong></p>",
      `<p><strong>Nome:</strong> ${escapeHtml(input.name)}</p>`,
      `<p><strong>E-mail:</strong> ${escapeHtml(input.email)}</p>`,
      `<p><strong>Tipo de empresa:</strong> ${escapeHtml(input.companyType)}</p>`,
      "<p><strong>Mensagem:</strong></p>",
      `<p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>`,
    ].join(""),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, id: data?.id };
}

/** Escapa HTML básico para o corpo do e-mail (RNF-05). */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
