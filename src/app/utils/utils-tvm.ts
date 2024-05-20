export function computeFutureValue({ pv, r, n, pmt = 0, m = 1, d = false }: { pv: number, r: number, n: number, pmt?: number, m?: number, d?: boolean }) {
    if (n < 0 || m < 0) throw new Error('value cannot be negative')
    const periods = n * m
    const rate = r / 100 / m
    const fv = pv * Math.pow(1 + rate, periods) + pmt * ((Math.pow(1 + rate, periods) - 1) / rate)
    // annuity due or ordinary annuity.
    return d ? fv * (1 + rate) : fv 
}

export function computePresentValue({ fv, r, n, pmt = 0, m = 1 }: { fv: number, r: number, n: number, pmt?: number, m?: number }) {
    if (n < 0 || m < 0) throw new Error('value cannot be negative')
    const periods = n * m
    const rate = r / 100 / m
    // const rate = r < 1 ? r / m : r / 100 / m
    return fv / Math.pow(1 + rate, periods) - pmt * ((Math.pow(1 + rate, periods) - 1) / rate)
}

export function computeN({ fv, pv, r, pmt = 0, m = 1 }: { fv: number, pv: number, r: number, pmt?: number, m?: number }): number {
    if (r < 0 || m < 0) throw new Error('value cannot be negative')
    const rate = r < 1 ? r / m : r / 100 / m
    return (Math.log((fv * rate + pmt) / (pv * rate + pmt)) / Math.log(1 + rate))/m
}

export function computeR({ fv, pv, n, pmt = 0, m = 1 }: { fv: number, pv: number, n: number, pmt?: number, m?: number }): number {
    return Math.pow((fv / pv), 1 / n) - 1
}

export function computePMT({ fv, pv ,r ,n, m = 1 } : { fv: number, pv: number, r: number, n: number, m?: number }): number {
  const rate = r / 100
  return (fv - pv * Math.pow(1 + rate, n)) / ((Math.pow(1 + rate, n) - 1) / rate)
}

export function continuousCompoundingFV({pv, r, n} : {pv: number, r: number, n: number}) {
  return pv * Math.exp(r/100 * n)
}


export function effectiveAnnualRate({ r, m }: { r: number, m: number }) {
  return Math.pow(1 + r / m, m) - 1
}

/**
 * Calculates the annual rate from the effective annual rate (EAR).

 * @param params.ear - The effective annual rate.
 * @param params.m - The number of compounding periods per year.
 * @returns The annual rate.
 */
export function annualRateFromEAR({ ear, m }: { ear: number, m: number }) {
  return m * (Math.pow(1 + ear/100, 1/m) - 1)
}

// regular payments that increase at rate g.
export function fvOfGrowingAnnuity({ pmt, r, g, n }: { pmt: number, r: number, g: number, n: number }) {
  const rate = r / 100
  const growthRate = g / 100
  return pmt * (1 + growthRate) * ((1 - (Math.pow(1 + growthRate, n) / Math.pow(1 + rate, n))) / (rate - growthRate))
}

export function pvPerpetuity({ pmt, r }: { pmt: number, r: number }) {
  return pmt / (r / 100)
}

export function pvGrowingPerpetuity({ pmt, r, g }: { pmt: number, r: number, g: number }) {
  return pmt / ((r - g) / 100)
}