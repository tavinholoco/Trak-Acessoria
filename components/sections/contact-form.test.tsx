import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "./contact-form";

// Toast mockado: asserta feedback sem depender do DOM do sonner.
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const fetchMock = vi.fn();

const validValues = {
  name: "Ana Souza",
  email: "ana@galeria.com.br",
  companyType: "galeria",
  message: "Quero uma proposta para minha galeria de arte.",
  honeypot: "",
};

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nome"), validValues.name);
  await user.type(screen.getByLabelText("E-mail"), validValues.email);
  // Abre o select (Base UI) e escolhe "Galeria de arte"
  await user.click(screen.getByRole("combobox"));
  await user.click(await screen.findByRole("option", { name: "Galeria de arte" }));
  await user.type(screen.getByLabelText("Mensagem"), validValues.message);
}

describe("ContactForm (Fase 4.2/4.7 / RF-08)", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renderiza os campos com labels associados (a11y)", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Mensagem")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Tipo de empresa" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ENVIAR MENSAGEM" })
    ).toBeInTheDocument();
  });

  it("bloqueia o submit e mostra mensagens de validação (client)", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "ENVIAR MENSAGEM" }));

    expect(
      await screen.findByText("Informe seu nome (mínimo 2 caracteres).")
    ).toBeInTheDocument();
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(screen.getByText("Selecione o tipo de empresa.")).toBeInTheDocument();
    expect(
      screen.getByText("Sua mensagem precisa de pelo menos 10 caracteres.")
    ).toBeInTheDocument();

    // Validação falhou: nada foi enviado
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("estado loading — botão desabilitado enquanto aguarda a API", async () => {
    let resolveFetch!: (value: unknown) => void;
    fetchMock.mockImplementation(
      () => new Promise((resolve) => (resolveFetch = resolve))
    );

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);

    await user.click(screen.getByRole("button", { name: "ENVIAR MENSAGEM" }));

    // loading: botão desabilitado com rótulo "Enviando…"
    const button = screen.getByRole("button", { name: /Enviando…/ });
    expect(button).toBeDisabled();

    resolveFetch({ ok: true, json: async () => ({ ok: true }) });
    await waitFor(() =>
      expect(screen.getByText(/Mensagem enviada com sucesso/)).toBeInTheDocument()
    );
  });

  it("envia com sucesso — fetch com payload, toast e reset do formulário", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);

    await user.click(screen.getByRole("button", { name: "ENVIAR MENSAGEM" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse((init as RequestInit).body as string)).toEqual(validValues);

    // feedback inline + toast
    expect(
      await screen.findByText(/Mensagem enviada com sucesso/)
    ).toBeInTheDocument();

    // reset do formulário: campos vazios de novo
    await waitFor(() => expect(screen.getByLabelText("Nome")).toHaveValue(""));
  });

  it("estado error — toast de erro quando a API responde com falha", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({ error: "Falha no provedor de e-mail." }),
    });

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);

    await user.click(screen.getByRole("button", { name: "ENVIAR MENSAGEM" }));

    expect(
      await screen.findByText(/Não foi possível enviar. Tente novamente/)
    ).toBeInTheDocument();
  });
});
