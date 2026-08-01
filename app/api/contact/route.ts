import { sendContactEmail } from "@/lib/contact";
import { contactSchema } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/contact (RF-08 / Fase 4.3-4.4).
 * Validação server-side (Zod) + rate limiting por IP + envio via Resend.
 * Route Handler do App Router — POST não é cacheado (ver docs Next 16).
 */
export async function POST(request: Request) {
  // IP do visitante (Vercel define x-forwarded-for; fallback "unknown").
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(`contact:${ip}`)) {
    return Response.json(
      { error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Dados inválidos.",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const result = await sendContactEmail(parsed.data);
  if (!result.ok) {
    // 502: falha no provedor (ou chave ausente) — o client mostra o toast de
    // erro e o WhatsApp segue como canal reserva (PRD §15).
    return Response.json({ error: result.error }, { status: 502 });
  }

  return Response.json({ ok: true });
}
