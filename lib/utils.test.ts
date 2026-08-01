import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn — combina classes (clsx + tailwind-merge)", () => {
  it("combina classes simples", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("ignora valores falsy", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("resolve conflitos de Tailwind (última classe vence)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("aceita objetos condicionais", () => {
    expect(cn("a", { b: true, c: false })).toBe("a b");
  });

  it("mantém classes de grupos diferentes", () => {
    expect(cn("px-2 py-4", "text-sm")).toBe("px-2 py-4 text-sm");
  });
});
