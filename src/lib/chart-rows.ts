/** The rows of the table every chart keeps for a screen reader: the exact values the chart only draws. */
import type { ChartDatum } from "../components/chart-frame"

export type ChartRow = readonly (string | number)[]

interface StackedValue {
  label: string
  series: string
  value: number
}

/** One row per category, in the chart's own order, with the label as the axis shows it. */
export function datumRows(data: readonly ChartDatum[], formatLabel: (label: string) => string = (label) => label): ChartRow[] {
  return data.map((datum) => [formatLabel(datum.label), datum.value])
}

/** One row per label, in the order the labels first appear, with a column for each series: a missing pair is 0 and a pair given twice adds up. */
export function stackedRows(data: readonly StackedValue[], series: readonly string[]): ChartRow[] {
  const byLabel = new Map<string, number[]>()
  for (const datum of data) {
    const row = byLabel.get(datum.label) ?? series.map(() => 0)
    const column = series.indexOf(datum.series)
    if (column !== -1) row[column] = (row[column] ?? 0) + datum.value
    byLabel.set(datum.label, row)
  }
  return [...byLabel].map(([label, values]) => [label, ...values])
}
