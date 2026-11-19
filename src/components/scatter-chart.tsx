import { type ChartTooltipOptions, defineChart, dot, lineY } from "@tanstack/charts"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { tooltip } from "@tanstack/charts/tooltip"

import { EMPTY_CHART_MESSAGE, formatChartValue } from "../lib/chart-format"
import { summariseScatter } from "../lib/chart-summary-complex"
import { linearFit } from "../lib/stats"
import { ChartEmpty } from "./chart-empty"
import { ChartFrame } from "./chart-frame"
import { ChartSummary } from "./chart-summary"
import { ChartTable } from "./chart-table"
import { Text } from "./text"

export interface ScatterPoint {
  x: number
  y: number
  /** Names the point in the tooltip and the table: «Abbey Road», «Mandag». */
  label?: string
}

interface ScatterChartProps {
  points: readonly ScatterPoint[]
  /** What each axis measures, with its unit: «Lengde (min)», «Vurdering». They are written above the chart, since an axis with no title is a guess. */
  xName: string
  yName: string
  ariaLabel: string
  height: number
  /** Draw the least-squares line when there are three points or more and it has something to say; on by default. */
  trend?: boolean
  summary?: string
  showTable?: boolean
  emptyMessage?: string
}

/**
 * Two measures of the same things, a dot for each, for **whether and how they go together**: length against rating, plays against age. Position on two
 * scales is the most accurate thing a person can read (Cleveland and McGill), which is why this and not a pair of columns. The trend line and r² say how strong
 * the relation is and the summary says in words that it is not a cause. Dots are translucent, so where they pile up it shows. Fewer than three points are a table.
 */
export function ScatterChart({ points, xName, yName, ariaLabel, height, trend = true, summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: ScatterChartProps) {
  if (points.length === 0) return <ChartEmpty height={height} message={emptyMessage} />
  const fit = trend ? linearFit(points) : null
  const xs = points.map((point) => point.x)
  const from = Math.min(...xs)
  const to = Math.max(...xs)
  const rows = points.map((point) => ({ ...point, name: point.label ?? "" }))
  const scatterTooltip: ChartTooltipOptions<(typeof rows)[number]>["content"] = (found) => {
    const datum = found[0]?.datum
    if (datum === undefined) return { rows: [] }
    return { ...(datum.name === "" ? {} : { title: datum.name }), rows: [{ label: xName, value: formatChartValue(datum.x) }, { label: yName, value: formatChartValue(datum.y) }] }
  }
  const line = fit === null ? [] : [{ x: from, y: fit.intercept + fit.slope * from, name: "" }, { x: to, y: fit.intercept + fit.slope * to, name: "" }]
  const definition = defineChart({
    marks: [
      dot(rows, { x: "x", y: "y", r: 4, fillOpacity: 0.55, stroke: "var(--foreground)", strokeOpacity: 0.7, strokeWidth: 1 }),
      ...(line.length === 0 ? [] : [lineY(line, { x: "x", y: "y", stroke: "var(--foreground)", strokeWidth: 2, strokeDasharray: "7 4" })]),
    ],
    scales: {
      x: { scale: scaleLinear, nice: true, axis: { ticks: { size: 0, format: (value: number) => formatChartValue(value) } } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { ticks: { size: 0, format: (value: number) => formatChartValue(value) } } },
    },
    tooltip: { use: tooltip, content: scatterTooltip },
  })
  const text = summary ?? summariseScatter(fit, points.length, xName, yName)
  return (
    <>
      <Text size="xs" tone="muted">{`Opp: ${yName}. Bort: ${xName}.`}</Text>
      <ChartFrame definition={definition} ariaLabel={ariaLabel} height={height} />
      {text === null ? null : <ChartSummary text={text} />}
      <ChartTable caption={ariaLabel} columns={["Punkt", xName, yName]} rows={points.map((point, index) => [point.label ?? `Punkt ${index + 1}`, point.x, point.y])} visible={showTable} />
    </>
  )
}
