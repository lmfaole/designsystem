import { type ChartTooltipOptions, barY, defineChart, stack } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { tooltip } from "@tanstack/charts/tooltip"

import { stackedRows } from "../lib/chart-rows"
import { ChartFrame } from "./chart-frame"
import { ChartTable } from "./chart-table"

export interface StackedDatum {
  label: string
  series: string
  value: number
}

interface StackedColumnChartProps {
  /** One row per label and series; a missing pair is nothing. */
  data: StackedDatum[]
  /** Bottom to top in the stack, and the legend's order. At most as many as there are chart colours. */
  series: string[]
  ariaLabel: string
  height: number
}

const stackedTooltip: ChartTooltipOptions<StackedDatum>["content"] = (points) => {
  const datum = points[0]?.datum
  if (datum === undefined) return { rows: [] }
  return { title: datum.label, rows: [{ label: datum.series, value: datum.value.toLocaleString() }] }
}

// The foreground in falling strength, first series strongest: the chart tokens' darkest steps are too close to tell apart.
const SEGMENT_COLORS = [100, 72, 52, 36, 24].map((share) => `color-mix(in oklab, var(--foreground) ${share}%, transparent)`)

/** Columns divided into the parts that make each up, for how a total splits: plays per year by album. */
export function StackedColumnChart({ data, series, ariaLabel, height }: StackedColumnChartProps) {
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
    color: { domain: series, range: SEGMENT_COLORS.slice(0, series.length) },
    tooltip: { use: tooltip, content: stackedTooltip },
  })
  return (
    <div className="grid gap-3">
      <ChartFrame definition={definition} ariaLabel={ariaLabel} height={height} />
      <ChartTable caption={ariaLabel} columns={["Kategori", ...series]} rows={stackedRows(data, series)} />
      <ul className="text-muted-foreground grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-x-4 gap-y-1 text-xs">
        {series.map((name, index) => (
          <li key={name} className="grid grid-cols-[auto_1fr] items-center gap-2">
            <span aria-hidden className="size-2.5 rounded-full" style={{ background: SEGMENT_COLORS[index] }} />
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
