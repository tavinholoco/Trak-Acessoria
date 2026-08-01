import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useScrollPosition } from "./use-scroll-position";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    value,
    writable: true,
    configurable: true,
  });
}

describe("useScrollPosition (Header scrolled state)", () => {
  afterEach(() => setScrollY(0));

  it("retorna false quando a página não rolou", () => {
    setScrollY(0);
    const { result } = renderHook(() => useScrollPosition(8));
    expect(result.current).toBe(false);
  });

  it("retorna true quando rola além do threshold", () => {
    setScrollY(100);
    const { result } = renderHook(() => useScrollPosition(8));
    expect(result.current).toBe(true);
  });

  it("atualiza quando o evento de scroll é disparado", () => {
    setScrollY(0);
    const { result } = renderHook(() => useScrollPosition(8));
    expect(result.current).toBe(false);

    act(() => {
      setScrollY(50);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toBe(true);
  });

  it("volta a false ao rolar de volta para o topo", () => {
    setScrollY(100);
    const { result } = renderHook(() => useScrollPosition(8));
    expect(result.current).toBe(true);

    act(() => {
      setScrollY(2);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toBe(false);
  });
});
