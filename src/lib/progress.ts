import { formatChartValue } from "./chart-format.ts"

/** A value as a whole percent of its range, kept between 0 and 100; 0 for a range with no size. */
export function percentOf(value: number, max: number): number {
  if (max <= 0) return 0
  return Math.round((Math.min(Math.max(value, 0), max) / max) * 100)
}

/** What a meter says in words: the value, and the goal when it has one («93 % · mål 100 %» becomes «12 av 40 · mål 30»). */
export function meterText(valueText: string | undefined, value: number, max: number, target: number | undefined): string {
  const said = valueText ?? `${percentOf(value, max)} %`
  return target === undefined ? said : `${said} · mål ${formatChartValue(target)}`
}
