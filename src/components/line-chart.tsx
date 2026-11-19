import { type ChartTooltipOptions, defineChart, lineY, text } from "@tanstack/charts"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { tooltip } from "@tanstack/charts/tooltip"

import { greyStep, LINE_STEPS } from "../lib/chart-colors"
import { EMPTY_CHART_MESSAGE, formatChartValue } from "../lib/chart-format"
import { nameOffsets } from "../lib/chart-labels"
import { type LineSeriesData, lineRows, seriesLabels } from "../lib/chart-rows"
import { ChartEmpty } from "./chart-empty"
import { ChartFrame } from "./chart-frame"
import { ChartSummary } from "./chart-summary"
import { ChartTable } from "./chart-table"

export type LineSeries = LineSeriesData

interface LineChartProps {
  /** One to four series, each with its name and its values in order along the axis. More than four is a table or a ranking, not a line chart. */
  series: readonly [LineSeries] | readonly [LineSeries, LineSeries] | readonly [LineSeries, LineSeries, LineSeries] | readonly [LineSeries, LineSeries, LineSeries, LineSeries]
  /** Names the chart for a screen reader and the table, e.g. "Avspillinger per måned". */
  ariaLabel: string
  height: number
  /** How a category reads on the axis; the label as it is by default. */
  formatLabel?: (label: string) => string
  /** A text that says what the chart shows (type, range, trend, extremes), visible under it. */
  summary?: string
  /** Offer the exact values as a table anyone can open (`Vis tallene`), not only a screen reader. */
  showTable?: boolean
  /** What the chart says when there is no data; «Ingen data i denne perioden.» by default. */
  emptyMessage?: string
}

interface Row {
  label: string
  value: number
  series: string
}

/** The first line is solid; the others are dashed in other patterns, so a line is told apart without colour (Primer, data visualization). */
const DASHES = [undefined, "7 4", "2 4", "10 4 2 4"] as const
const colourOf = (index: number) => greyStep(LINE_STEPS[index] ?? 44)

const lineTooltip: ChartTooltipOptions<Row>["content"] = (points) => {
  const first = points[0]?.datum
  if (first === undefined) return { rows: [] }
  const seen = new Set<string>()
  const rows = points.flatMap((point) => (seen.has(point.datum.series) ? [] : (seen.add(point.datum.series), [{ label: point.datum.series, value: formatChartValue(point.datum.value) }])))
  return { title: first.label, rows }
}

/**
 * Up to four lines over the same axis, for how several things moved together. Each line is named **on the chart**, at its last point, so no legend is
 * needed; the first line is solid and the others dashed in different patterns, so they are told apart without colour; the data is a table next to the chart.
 * One series is an `AreaChart`; more than four is a table.
 */
export function LineChart({ series, ariaLabel, height, formatLabel = (label) => label, summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: LineChartProps) {
  if (series.every((one) => one.data.length === 0)) return <ChartEmpty height={height} message={emptyMessage} />
  const labels = seriesLabels(series)
  // Names stand at the last point; where lines end close to each other the lower name goes down a step, so no name covers another.
  const lastOf = (one: LineSeries) => one.data.at(-1)?.value ?? 0
  const values = series.flatMap((one) => one.data.map((datum) => datum.value))
  const range = Math.max(...values) - Math.min(...values)
  const dyByName = nameOffsets(series.map((one) => ({ name: one.name, last: lastOf(one) })), range)
  const rowsOf = (one: LineSeries): Row[] => one.data.map((datum) => ({ label: datum.label, value: datum.value, series: one.name }))
  const marks = series.flatMap((one, index) => {
    const rows = rowsOf(one)
    const dash = DASHES[index]
    const last = rows.at(-1)
    return [
      lineY(rows, { x: "label", y: "value", stroke: colourOf(index), strokeWidth: 2, ...(dash === undefined ? {} : { strokeDasharray: dash }), points: index === 0 }),
      ...(last === undefined ? [] : [text([last], { x: "label", y: "value", text: "series", anchor: "end", dy: dyByName.get(one.name) ?? -8, fontSize: 11, fill: colourOf(index) })]),
    ]
  })
  const definition = defineChart({
    marks,
    scales: {
      x: {
        scale: () => scalePoint<string>().domain(labels),
        axis: { ticks: { size: 0, format: (label: string) => formatLabel(label) }, tickLabels: { thin: { minGap: 24 } } },
      },
      y: { scale: scaleLinear, nice: true, grid: true, axis: false },
    },
    tooltip: { use: tooltip, content: lineTooltip },
  })
  return (
    <>
      <ChartFrame definition={definition} ariaLabel={ariaLabel} height={height} />
      {summary === undefined ? null : <ChartSummary text={summary} />}
      <ChartTable caption={ariaLabel} columns={["Tidspunkt", ...series.map((one) => one.name)]} rows={lineRows(series, formatLabel)} visible={showTable} />
    </>
  )
}
