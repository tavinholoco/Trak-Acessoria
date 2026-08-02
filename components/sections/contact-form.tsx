"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  companyTypeOptions,
  contactSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { trackEvent } from "@/lib/analytics";

/** Estados do envio (Fase 4.2): idle → success | error. O loading do botão
 * vem de `formState.isSubmitting` (RHF) — sem estado duplicado. */
type SubmitStatus = "idle" | "success" | "error";

/**
 * Formulário de contato (RF-08 / Fase 4.2-4.4).
 * react-hook-form + zodResolver (schema compartilhado com a API Route).
 * Envia via POST /api/contact e dá feedback com toast (sonner) + estado inline.
 */
export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const form = useForm<ContactFormValues>({
    // O schema é estrito (sem "" no enum); o tipo do formulário amplia
    // companyType para "" (placeholder) — o resolver valida no submit.
    resolver: zodResolver(contactSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      name: "",
      email: "",
      companyType: "",
      message: "",
      honeypot: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    // Some a mensagem anterior (success/error) enquanto reenvia.
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.error ?? "Não foi possível enviar a mensagem.");
      }

      setStatus("success");
      // Conversão (KPI §3.2) — no-op sem consentimento LGPD (Fase 5.5).
      trackEvent("form_submit", { ok: true, source: "contato" });
      toast.success("Mensagem enviada! Responderemos em breve.");
      form.reset();
    } catch (error) {
      setStatus("error");
      toast.error(
        error instanceof Error
          ? error.message
          : "Algo deu errado. Tente novamente."
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome"
                    autoComplete="name"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="voce@galeria.com.br"
                    autoComplete="email"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de empresa</FormLabel>
              <Select
                value={field.value || null}
                onValueChange={(value) => field.onChange(value ?? "")}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo de empresa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companyTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte sobre o seu momento e o que você precisa…"
                  className="min-h-28"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot anti-spam (RNF-05): campo invisível que bots preenchem;
        o servidor descarta submissões com honeypot preenchido (route.ts). */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
          {...form.register("honeypot")}
        />

        {/* Feedback inline (aria-live) + CTA */}
        <div className="flex flex-col gap-3">
          {status === "success" && (
            <p
              aria-live="polite"
              className="border border-border bg-background px-4 py-3 font-sans text-sm font-bold uppercase tracking-wide text-primary"
            >
              Mensagem enviada com sucesso! ✓
            </p>
          )}
          {status === "error" && (
            <p
              aria-live="assertive"
              className="border border-destructive/40 bg-destructive/5 px-4 py-3 font-sans text-sm font-bold uppercase tracking-wide text-destructive"
            >
              Não foi possível enviar. Tente novamente ou fale no WhatsApp.
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Enviando…
              </>
            ) : (
              "ENVIAR MENSAGEM"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
