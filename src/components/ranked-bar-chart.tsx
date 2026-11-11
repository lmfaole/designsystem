import { barX, defineChart } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { datumRows } from "../lib/chart-rows"
import { type ChartDatum, ChartFrame, datumTooltip } from "./chart-frame"
import { ChartTable } from "./chart-table"

const ROW_HEIGHT_PX = 26

interface RankedBarChartProps {
  /** Longest first; drawn top to bottom in this order. */
  data: ChartDatum[]
  /** Names the chart for a screen reader, e.g. "Plays per genre". */
  ariaLabel: string
  /** What a value counts, for the tooltip, e.g. "Plays". */
  valueLabel: string
}

/**
 * Horizontal bars, one row per category, for a ranked breakdown whose labels
 * are too long to sit under a column: genres, places. One series, so one hue
 * and no legend; the heading around it names what is measured.
 */
export function RankedBarChart({ data, ariaLabel, valueLabel }: RankedBarChartProps) {
  const labels = data.map((datum) => datum.label)
  const definition = defineChart({
    marks: [barX(data, { x: "value", y: "label", inset: 1, radius: 3 })],
    scales: {
      x: { scale: scaleLinear, nice: true, axis: false },
      y: {
        scale: () => scaleBand<string>().domain(labels).padding(0.12),
        axis: { ticks: { size: 0 } },
      },
    },
    tooltip: datumTooltip(valueLabel),
  })
  return (
    <>
      <ChartFrame definition={definition} ariaLabel={ariaLabel} height={data.length * ROW_HEIGHT_PX + 8} />
      <ChartTable caption={ariaLabel} columns={["Kategori", valueLabel]} rows={datumRows(data)} />
    </>
  )
}
