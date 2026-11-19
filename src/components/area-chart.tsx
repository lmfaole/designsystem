import { areaY, defineChart, dot, lineY } from "@tanstack/charts"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"

import { datumRows } from "../lib/chart-rows"
import { type ChartDatum, ChartFrame, datumTooltip } from "./chart-frame"
import { ChartEmpty } from "./chart-empty"
import { ChartSummary } from "./chart-summary"
import { EMPTY_CHART_MESSAGE } from "../lib/chart-format"
import { ChartTable } from "./chart-table"

interface AreaChartProps {
  /** In order along the axis, e.g. months oldest first. */
  data: ChartDatum[]
  /** Names the chart for a screen reader, e.g. "Plays per month". */
  ariaLabel: string
  /** What a value counts, for the tooltip, e.g. "Plays". */
  valueLabel: string
  height: number
  /** How a category reads on the axis; the label as it is by default. */
  formatLabel?: (label: string) => string
  /** The series' colour, as CSS; the theme's primary by default. */
  color?: string | undefined
  /** A text that says what the chart shows (type, range, trend, extremes), visible under it. `summariseSeries` writes one. */
  summary?: string
  /** Offer the exact values as a table anyone can open (`Vis tallene`), not only a screen reader. */
  showTable?: boolean
  /** What the chart says when there is no data; «Ingen data i denne perioden.» by default. */
  emptyMessage?: string
}

/** One filled area for a trend: the shape over time, not an exact comparison of two points. */
export function AreaChart({ data, ariaLabel, valueLabel, height, color, formatLabel = (label) => label, summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: AreaChartProps) {
  if (data.length === 0) return <ChartEmpty height={height} message={emptyMessage} />
  const labels = data.map((datum) => datum.label)
  const definition = defineChart({
    marks: [
      areaY(data, { x: "label", y: "value", fillOpacity: 0.15 }),
      lineY(data, { x: "label", y: "value", strokeWidth: 2 }),
      // A point per category, so a single month still shows; an area needs two.
      dot(data, { x: "label", y: "value", r: 2.5 }),
    ],
    scales: {
      x: {
        scale: () => scalePoint<string>().domain(labels),
        axis: { ticks: { size: 0, format: (label: string) => formatLabel(label) }, tickLabels: { thin: { minGap: 24 } } },
      },
      y: { scale: scaleLinear, nice: true, grid: true, axis: false },
    },
    tooltip: datumTooltip(valueLabel, formatLabel),
  })
  return (
    <>
      <ChartFrame definition={definition} ariaLabel={ariaLabel} height={height} color={color} />
      {summary === undefined ? null : <ChartSummary text={summary} />}
      <ChartTable caption={ariaLabel} columns={["Tidspunkt", valueLabel]} rows={datumRows(data, formatLabel)} visible={showTable} />
    </>
  )
}
