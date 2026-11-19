import { formatChartValue } from "./chart-format.ts"

export interface SummaryDatum {
  label: string
  value: number
}

export interface SummaryOptions {
  /** The kind of chart, as it is called: «Søylediagram», «Områdediagram», «Rangering». */
  kind: string
  /** What a value counts, with its unit: «Avspillinger», «Temperatur (°C)». */
  valueLabel: string
  /** How a category reads, as on the axis. */
  formatLabel?: (label: string) => string
  /** The data runs in order (time): then the summary says how it moved. Off for categories, where it says which is highest and lowest. */
  ordered?: boolean
}

/** Below this share of the range, a change is «omtrent uendret». */
const FLAT = 0.02

/**
 * A short text for a chart, in Norwegian: its kind, what it counts, how many values, the highest and the lowest, and, for data in order, how
 * it moved from the first to the last. It does not repeat the title or list every point (the table does that). Nothing for no data. An author
 * can write a better one; this is what a chart says when nobody has (W3C WAI, complex images: a short description and the data).
 */
export function summariseSeries(data: readonly SummaryDatum[], { kind, valueLabel, formatLabel = (label) => label, ordered = false }: SummaryOptions): string | null {
  const first = data[0]
  const last = data.at(-1)
  if (first === undefined || last === undefined) return null
  let max = first
  let min = first
  for (const datum of data) {
    if (datum.value > max.value) max = datum
    if (datum.value < min.value) min = datum
  }
  const count = data.length === 1 ? "én verdi" : `${data.length} verdier`
  const parts = [`${kind}. ${valueLabel}, ${count}.`]
  if (data.length > 1) {
    parts.push(max.value === min.value ? `Alle er ${formatChartValue(max.value)}.` : `Høyest ${formatLabel(max.label)} (${formatChartValue(max.value)}), lavest ${formatLabel(min.label)} (${formatChartValue(min.value)}).`)
  } else {
    parts.push(`${formatLabel(first.label)}: ${formatChartValue(first.value)}.`)
  }
  if (ordered && data.length > 1) {
    const range = max.value - min.value
    const change = last.value - first.value
    parts.push(range === 0 || Math.abs(change) <= range * FLAT ? "Omtrent uendret." : `${change > 0 ? "Økte" : "Falt"} fra ${formatChartValue(first.value)} til ${formatChartValue(last.value)}.`)
  }
  return parts.join(" ")
}
