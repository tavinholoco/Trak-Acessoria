import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  RATE_LIMIT_MAX,
  checkRateLimit,
  resetRateLimits,
} from "./rate-limit";

describe("checkRateLimit (Fase 4.4 / RF-08)", () => {
  beforeEach(() => {
    resetRateLimits();
  });

  afterEach(() => {
    resetRateLimits();
    vi.useRealTimers();
  });

  it("permite até o limite por chave e bloqueia a partir daí", () => {
    const key = "ip:1";
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      expect(checkRateLimit(key)).toBe(true);
    }
    expect(checkRateLimit(key)).toBe(false);
  });

  it("chaves diferentes têm contagens independentes", () => {
    expect(checkRateLimit("ip:a")).toBe(true);
    expect(checkRateLimit("ip:a")).toBe(true);
    // IP b não é afetado pelo consumo de IP a
    expect(checkRateLimit("ip:b")).toBe(true);
    expect(checkRateLimit("ip:b")).toBe(true);
    expect(checkRateLimit("ip:b")).toBe(true);
    expect(checkRateLimit("ip:b")).toBe(false);
  });

  it("a janela expira após o tempo configurado", () => {
    vi.useFakeTimers();
    const key = "ip:expira";
    expect(checkRateLimit(key, 1, 1000)).toBe(true);
    expect(checkRateLimit(key, 1, 1000)).toBe(false);

    vi.advanceTimersByTime(1001);
    expect(checkRateLimit(key, 1, 1000)).toBe(true);
  });

  it("resetRateLimits limpa o estado", () => {
    const key = "ip:reset";
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit(key);
    }
    expect(checkRateLimit(key)).toBe(false);

    resetRateLimits();
    expect(checkRateLimit(key)).toBe(true);
  });
});
