import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { team } from "@/data/team";
import { Team } from "./team";

describe("Team (Fase 3.5 / RF-06)", () => {
  it("renderiza os integrantes a partir de data/team.ts", () => {
    render(<Team />);

    for (const member of team) {
      expect(
        screen.getByRole("heading", { name: member.name })
      ).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
      expect(screen.getByText(member.bio)).toBeInTheDocument();
      for (const area of member.focus) {
        expect(screen.getByText(area)).toBeInTheDocument();
      }
    }
  });

  it("mantém a âncora #equipe", () => {
    render(<Team />);
    expect(screen.getByRole("region")).toHaveAttribute("id", "equipe");
  });
});
