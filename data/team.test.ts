import { describe, expect, it } from "vitest";

import { team } from "./team";

describe("team — integrantes (data/team.ts)", () => {
  it("lista ao menos 3 integrantes", () => {
    expect(team.length).toBeGreaterThanOrEqual(3);
  });

  it("cada integrante tem nome, papel, bio e áreas de atuação", () => {
    for (const member of team) {
      expect(member.name.trim().length).toBeGreaterThan(0);
      expect(member.role.trim().length).toBeGreaterThan(0);
      expect(member.bio.length).toBeGreaterThan(20);
      expect(member.focus.length).toBeGreaterThan(0);
      for (const area of member.focus) {
        expect(area.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("papéis são distintos entre si", () => {
    const roles = team.map((m) => m.role);
    expect(new Set(roles).size).toBe(roles.length);
  });
});
