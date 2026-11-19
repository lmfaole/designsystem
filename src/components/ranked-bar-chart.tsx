import { barX, defineChart } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { datumRows } from "../lib/chart-rows"
import { type ChartDatum, ChartFrame, datumTooltip } from "./chart-frame"
import { ChartEmpty } from "./chart-empty"
import { ChartSummary } from "./chart-summary"
import { EMPTY_CHART_MESSAGE } from "../lib/chart-format"
import { ChartTable } from "./chart-table"

const ROW_HEIGHT_PX = 26

interface RankedBarChartProps {
  /** Longest first; drawn top to bottom in this order. */
  data: ChartDatum[]
  /** Names the chart for a screen reader, e.g. "Plays per genre". */
  ariaLabel: string
  /** What a value counts, for the tooltip, e.g. "Plays". */
  valueLabel: string
  /** A text that says what the chart shows (type, range, trend, extremes), visible under it. `summariseSeries` writes one. */
  summary?: string
  /** Offer the exact values as a table anyone can open (`Vis tallene`), not only a screen reader. */
  showTable?: boolean
  /** What the chart says when there is no data; «Ingen data i denne perioden.» by default. */
  emptyMessage?: string
}

/**
 * Horizontal bars, one row per category, for a ranked breakdown whose labels
 * are too long to sit under a column: genres, places. One series, so one hue
 * and no legend; the heading around it names what is measured.
 */
export function RankedBarChart({ data, ariaLabel, valueLabel, summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: RankedBarChartProps) {
  if (data.length === 0) return <ChartEmpty height={ROW_HEIGHT_PX * 3} message={emptyMessage} />
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
      <ChartFrame definition={definition} ariaLabel={ariaLabel} height={data.length * ROW_HEIGHT_PX + 8} grow={false} />
      {summary === undefined ? null : <ChartSummary text={summary} />}
      <ChartTable caption={ariaLabel} columns={["Kategori", valueLabel]} rows={datumRows(data)} visible={showTable} />
    </>
  )
}
