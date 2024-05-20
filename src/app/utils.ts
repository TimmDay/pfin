// prettier-ignore
// Format Functions
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

export function formatYearsToHumanReadable(
  yearsDecimal: number,
  incExact?: boolean
) {
  const AVG_DAYS_IN_YEAR = 365.25 // Considering leap years.
  const AVG_DAYS_IN_MONTH = 30.44
  const totalDays = Math.floor(yearsDecimal * AVG_DAYS_IN_YEAR)
  const years = Math.floor(totalDays / AVG_DAYS_IN_YEAR)
  const remainingDaysAfterYears = totalDays % AVG_DAYS_IN_YEAR
  const months = Math.floor(remainingDaysAfterYears / AVG_DAYS_IN_MONTH)
  const days = Math.floor(remainingDaysAfterYears % AVG_DAYS_IN_MONTH) // Remaining days.
  return `${years} years, ${months} months, ${days} days${
    incExact ? `\n or ${yearsDecimal.toFixed(4)}` : ""
  }`
}

export function capitaliseString(string: string) {
  return string
    .split(" ")
    .map((word) =>
      word.length >= 3 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join(" ")
}

// TMV Formulae
export function computeFutureValue({ pv, r, n, pmt = 0, m = 1 }: { pv: number, r: number, n: number, pmt?: number, m?: number }) {
    if (r < 0 || n < 0 || m < 0) throw new Error('value cannot be negative')
    const periods = n * m
    const rate = r < 1 ? r / m : r / 100 / m
    return pv * Math.pow(1 + rate, periods) + pmt * ((Math.pow(1 + rate, periods) - 1) / rate)
}

export function computePresentValue({ fv, r, n, pmt = 0, m = 1 }: { fv: number, r: number, n: number, pmt?: number, m?: number }) {
    if (r < 0 || n < 0 || m < 0) throw new Error('value cannot be negative')
    const periods = n * m
    const rate = r < 1 ? r / m : r / 100 / m
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
 *
 * @param params.ear - The effective annual rate.
 * @param params.m - The number of compounding periods per year.
 * @returns The annual rate.
 */
export function annualRateFromEAR({ ear, m }: { ear: number, m: number }) {
  return m * (Math.pow(1 + ear, 1/m) - 1)
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