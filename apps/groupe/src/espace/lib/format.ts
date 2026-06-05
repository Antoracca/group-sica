export function formatFcfa(value: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value);
}

export function formatFcfaCompact(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${m % 1 === 0 ? m : m.toFixed(1)} M FCFA`;
  }
  if (value >= 1_000) return `${Math.round(value / 1_000)} k FCFA`;
  return `${value} FCFA`;
}
