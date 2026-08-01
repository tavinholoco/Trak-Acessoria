import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { projects } from "@/data/projects";
import { Projects } from "./projects";

describe("Projects (Fase 3.4 / RF-05)", () => {
  it("renderiza todos os cases a partir de data/projects.ts", () => {
    render(<Projects />);

    for (const project of projects) {
      expect(
        screen.getByRole("heading", { name: project.title })
      ).toBeInTheDocument();
      expect(screen.getByText(project.metric.value)).toBeInTheDocument();
      expect(screen.getByText(project.metric.label)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    }
  });

  it("mantém a âncora #projetos", () => {
    render(<Projects />);
    expect(screen.getByRole("region")).toHaveAttribute("id", "projetos");
  });
});
