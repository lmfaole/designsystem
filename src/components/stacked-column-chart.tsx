import { type ChartTooltipOptions, barY, defineChart, stack } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { tooltip } from "@tanstack/charts/tooltip"

import { defaultSeriesColor } from "../lib/chart-colors"
import { formatChartValue } from "../lib/chart-format"
import { stackedRows } from "../lib/chart-rows"
import { ChartFrame } from "./chart-frame"
import { ChartEmpty } from "./chart-empty"
import { ChartSummary } from "./chart-summary"
import { EMPTY_CHART_MESSAGE } from "../lib/chart-format"
import { ChartTable } from "./chart-table"

export interface StackedDatum {
  label: string
  series: string
  value: number
}

interface StackedColumnChartProps {
  /** One row per label and series; a missing pair is nothing. */
  data: StackedDatum[]
  /** Bottom to top in the stack, and the legend's order. At most five (more is a ranking or a table); the first three are grey steps and the rest take `series-4` and on. */
  series: string[]
  ariaLabel: string
  height: number
  /** A colour as CSS for each series, in the order of `series`; a series with none (or `null`) has the grey step of its place (the first three) or `series-4` and on. */
  colors?: readonly (string | null | undefined)[]
  /** A text that says what the chart shows (type, range, trend, extremes), visible under it. `summariseSeries` writes one. */
  summary?: string
  /** Offer the exact values as a table anyone can open (`Vis tallene`), not only a screen reader. */
  showTable?: boolean
  /** What the chart says when there is no data; «Ingen data i denne perioden.» by default. */
  emptyMessage?: string
}

const stackedTooltip: ChartTooltipOptions<StackedDatum>["content"] = (points) => {
  const datum = points[0]?.datum
  if (datum === undefined) return { rows: [] }
  return { title: datum.label, rows: [{ label: datum.series, value: formatChartValue(datum.value) }] }
}


/** Columns divided into the parts that make each up, for how a total splits: a count per year by category. */
export function StackedColumnChart({ data, series, ariaLabel, height, colors = [], summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: StackedColumnChartProps) {
  if (data.length === 0) return <ChartEmpty height={height} message={emptyMessage} />
  const colourOf = (index: number): string => colors[index] ?? defaultSeriesColor(index)
  const labels = [...new Set(data.map((datum) => datum.label))]
  const padding = Math.max(0.12, 1 - 0.1 * labels.length)
  const definition = defineChart({
    marks: [barY(data, { x: "label", y: "value", color: "series", layout: stack({ order: series }), inset: 1, radius: 3 })],
    scales: {
      x: {
        scale: () => scaleBand<string>().domain(labels).padding(padding),
        axis: { ticks: { size: 0 } },
      },
      y: { scale: scaleLinear, nice: true, grid: true, axis: false },
    },
    color: { domain: series, range: series.map((_, index) => colourOf(index)) },
    tooltip: { use: tooltip, content: stackedTooltip },
  })
  return (
    <div className="@container">
      <div className="grid gap-3 @3xl:grid-cols-[1fr_auto] @3xl:items-start @3xl:gap-x-8">
        <div className="min-w-0">
          <ChartFrame definition={definition} ariaLabel={ariaLabel} height={height} />
          {summary === undefined ? null : <ChartSummary text={summary} />}
          <ChartTable caption={ariaLabel} columns={["Kategori", ...series]} rows={stackedRows(data, series)} visible={showTable} />
        </div>
        <ul className="text-muted-foreground grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-x-4 gap-y-1 text-xs @3xl:grid-cols-1 @3xl:content-start @3xl:pt-2">
          {series.map((name, index) => (
            <li key={name} className="grid grid-cols-[auto_1fr] items-center gap-2">
              <span aria-hidden data-chart-mark="" className="size-2.5 rounded-full" style={{ background: colourOf(index) }} />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
