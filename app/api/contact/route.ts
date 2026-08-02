import { sendContactEmail } from "@/lib/contact";
import { contactSchema } from "@/lib/contact-schema";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

/** Limite de tamanho do corpo da requisição (anti-DoS, RNF-05). */
const MAX_BODY_BYTES = 10 * 1024; // 10 KB

/**
 * POST /api/contact (RF-08 / Fase 4.3-4.4).
 * Validação server-side (Zod) + rate limiting por IP + envio via Resend.
 * Route Handler do App Router — POST não é cacheado (ver docs Next 16).
 */
export async function POST(request: Request) {
  // IP real do visitante (Vercel anexa o IP ao fim de x-forwarded-for; o
  // primeiro valor é forjável — ver getClientIp em lib/rate-limit.ts).
  const ip = getClientIp(request);

  if (!checkRateLimit(`contact:${ip}`)) {
    return Response.json(
      { error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429 }
    );
  }

  // Lê o corpo como texto para limitar o tamanho antes do parse (anti-DoS).
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return Response.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  if (raw.length > MAX_BODY_BYTES) {
    return Response.json(
      { error: "Corpo da requisição muito grande." },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
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

  // Honeypot anti-spam: campo oculto que bots preenchem — simula sucesso
  // sem enviar e-mail (não revela ao bot que ele foi detectado).
  if (parsed.data.honeypot) {
    return Response.json({ ok: true });
  }

  const result = await sendContactEmail(parsed.data);
  if (!result.ok) {
    // 502: falha no provedor (ou chave ausente) — o client mostra o toast de
    // erro e o WhatsApp segue como canal reserva (PRD §15).
    return Response.json({ error: result.error }, { status: 502 });
  }

  return Response.json({ ok: true });
}

