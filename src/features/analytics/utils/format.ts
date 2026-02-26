export function formatCompact(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function formatPercent(n: number) {
  return new Intl.NumberFormat("en", { style: "percent", maximumFractionDigits: 1 }).format(n);
}