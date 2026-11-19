import { boxX, defineChart } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { EMPTY_CHART_MESSAGE, formatChartValue } from "../lib/chart-format"
import { summariseBoxes } from "../lib/chart-summary-complex"
import { fiveNumbers } from "../lib/stats"
import { ChartEmpty } from "./chart-empty"
import { ChartFrame } from "./chart-frame"
import { ChartSummary } from "./chart-summary"
import { ChartTable } from "./chart-table"

export interface BoxGroup {
  name: string
  /** The raw values of the group; at least five make a box worth drawing. */
  values: readonly number[]
}

interface BoxPlotProps {
  /** One to eight groups, drawn top to bottom in this order. */
  groups: readonly BoxGroup[]
  /** What is measured, with its unit: «Lengde (min)». */
  valueName: string
  unit: string
  ariaLabel: string
  summary?: string
  showTable?: boolean
  emptyMessage?: string
}

const ROW = 56

/**
 * How the values of several groups spread and how the groups compare: the box is the middle half, the line in it the median, the whiskers reach the
 * last value within 1.5 box lengths (Tukey) and the dots beyond are single values, each drawn. Horizontal, so the group names read as words. It
 * shows the spread a mean hides; to the reader who has not seen one, the summary says what a box is. Fewer than five values in a group is a list.
 */
export function BoxPlot({ groups, valueName, unit, ariaLabel, summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: BoxPlotProps) {
  const summaries = groups.map((group) => ({ name: group.name, summary: fiveNumbers(group.values) }))
  const rows = groups.flatMap((group) => group.values.filter(Number.isFinite).map((value) => ({ group: group.name, value })))
  const height = 48 + ROW * groups.length
  if (rows.length === 0) return <ChartEmpty height={height} message={emptyMessage} />
  const definition = defineChart({
    marks: [boxX(rows, { x: "value", y: "group", fill: "var(--foreground)", fillOpacity: 0.18, stroke: "var(--foreground)", strokeWidth: 2, inset: 8, r: 3.5 })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { ticks: { size: 0, format: (value: number) => formatChartValue(value) } } },
      y: { scale: () => scaleBand<string>().domain(groups.map((group) => group.name)).padding(0.2), axis: { ticks: { size: 0 } } },
    },
  })
  const text = summary ?? summariseBoxes(summaries, unit)
  return (
    <>
      <ChartFrame definition={definition} ariaLabel={ariaLabel} height={height} grow={false} />
      <ChartSummary text="Boksen er den midtre halvdelen av verdiene, streken i den er medianen, og strekene ut til sidene viser resten. Prikker er enkeltverdier langt fra de andre." />
      {text === null ? null : <ChartSummary text={text} />}
      <ChartTable
        caption={`${ariaLabel} (${valueName})`}
        columns={["Gruppe", "Antall", `Minste (${unit})`, "Nedre kvartil", "Median", "Øvre kvartil", "Største"]}
        rows={summaries.map(({ name, summary: s }) => (s === null ? [name, 0, "–", "–", "–", "–", "–"] : [name, s.n, s.min, s.q1, s.median, s.q3, s.max]))}
        visible={showTable}
      />
    </>
  )
}
