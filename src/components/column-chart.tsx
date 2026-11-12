import { barY, defineChart } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { datumRows } from "../lib/chart-rows"
import { type ChartDatum, ChartFrame, datumTooltip } from "./chart-frame"
import { ChartTable } from "./chart-table"

interface ColumnChartProps {
  /** In the order to draw them, left to right. */
  data: ChartDatum[]
  /** Names the chart for a screen reader, e.g. "Plays per decade". */
  ariaLabel: string
  /** What a value counts, for the tooltip, e.g. "Plays". */
  valueLabel: string
  height: number
  /** How a category reads under its column; the label as it is by default. */
  formatLabel?: (label: string) => string
  /** The series' colour, as CSS; the theme's primary by default. */
  color?: string | undefined
  /** Label every nth column only, for a crowded axis (24 hours: every 3rd). */
  labelEvery?: number
}

/** Columns in the data's own order, for a shape across categories: decades, hours of the day. */
export function ColumnChart({ data, ariaLabel, valueLabel, height, color, formatLabel = (label) => label, labelEvery = 1 }: ColumnChartProps) {
  const labels = data.map((datum) => datum.label)
  // A column is at most a tenth of the width, so one year or three days do not become slabs.
  const padding = Math.max(0.12, 1 - 0.1 * labels.length)
  const definition = defineChart({
    marks: [barY(data, { x: "label", y: "value", inset: 1, radius: 3 })],
    scales: {
      x: {
        scale: () => scaleBand<string>().domain(labels).padding(padding),
        axis: {
          ticks: {
            size: 0,
            values: labels.filter((_, index) => index % labelEvery === 0),
            format: (label: string) => formatLabel(label),
          },
        },
      },
      y: { scale: scaleLinear, nice: true, grid: true, axis: false },
    },
    tooltip: datumTooltip(valueLabel, formatLabel),
  })
  return (
    <>
      <ChartFrame definition={definition} ariaLabel={ariaLabel} height={height} color={color} />
      <ChartTable caption={ariaLabel} columns={["Kategori", valueLabel]} rows={datumRows(data, formatLabel)} />
    </>
  )
}
