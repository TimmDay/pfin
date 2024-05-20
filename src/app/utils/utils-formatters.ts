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
