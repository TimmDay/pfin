import { describe, test } from "vitest"
import { annualRateFromEAR, computeFutureValue } from "./utils-tvm"

describe("computeFutureValue", () => {
  const pv = 1000
  const r = 5
  const n = 5
  const pmt = 0
  const m = 1

  test("computes the future value correctly", ({ expect }) => {
    const result = computeFutureValue({ pv, r, n, pmt, m: 12 })
    expect(result).toBeCloseTo(1283.36, 2)
  })

  test("throws an error when n is negative", ({ expect }) => {
    expect(() => computeFutureValue({ pv, r, n: -1, pmt, m })).toThrow(
      "value cannot be negative"
    )
  })

  test("throws an error when m is negative", ({ expect }) => {
    expect(() => computeFutureValue({ pv, r, n, pmt, m: -1 })).toThrow(
      "value cannot be negative"
    )
  })
})

describe("annualRateFromEAR", () => {
  test("calculates the annual rate from the effective annual rate", ({
    expect,
  }) => {
    const ear = 5.09
    const m = 4
    const result = annualRateFromEAR({ ear, m })

    // approximately 0.05 or 5%
    expect(result).toBeCloseTo(0.05, 2)
  })
})
