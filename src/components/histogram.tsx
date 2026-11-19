import { barY, defineChart } from "@tanstack/charts"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { EMPTY_CHART_MESSAGE, formatChartValue } from "../lib/chart-format"
import { summariseHistogram } from "../lib/chart-summary-complex"
import { histogramBins, quantile } from "../lib/stats"
import { ChartEmpty } from "./chart-empty"
import { ChartFrame, datumTooltip } from "./chart-frame"
import { ChartSummary } from "./chart-summary"
import { ChartTable } from "./chart-table"

interface HistogramProps {
  /** The raw values, not counts: the chart groups them. Fewer than ten are a list, not a distribution. */
  values: readonly number[]
  /** What a value is, with its unit: «Lengde (min)». */
  valueName: string
  /** The unit, for the summary: «min». */
  unit: string
  ariaLabel: string
  height: number
  /** A number of bins to ask for; by default Freedman–Diaconis picks the width from the data's spread and size, with nice edges. */
  bins?: number
  summary?: string
  showTable?: boolean
  emptyMessage?: string
}

/** The shape of many values of one thing: where they pile up, how wide they spread, whether there is a tail. Bars touch, since the axis is continuous. Counts are on a zero baseline. */
export function Histogram({ values, valueName, unit, ariaLabel, height, bins: binCount, summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: HistogramProps) {
  const bins = histogramBins(values, binCount)
  if (bins.length === 0) return <ChartEmpty height={height} message={emptyMessage} />
  const label = (bin: { from: number; to: number }) => (bin.from === bin.to ? formatChartValue(bin.from) : `${formatChartValue(bin.from)}–${formatChartValue(bin.to)}`)
  const data = bins.map((bin) => ({ label: label(bin), value: bin.count }))
  const names = data.map((datum) => datum.label)
  const definition = defineChart({
    marks: [barY(data, { x: "label", y: "value", inset: 0.5, radius: 2 })],
    scales: {
      x: {
        scale: () => scaleBand<string>().domain(names).padding(0.02),
        // The bin's lower edge is what the label says, so a crowded axis writes every other one.
        axis: { ticks: { size: 0, values: names.filter((_, index) => index % Math.max(1, Math.ceil(names.length / 8)) === 0) } },
      },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { ticks: { size: 0, format: (value: number) => formatChartValue(value) } } },
    },
    tooltip: datumTooltip("Antall"),
  })
  const sorted = [...values].filter(Number.isFinite).sort((a, b) => a - b)
  const median = sorted.length === 0 ? null : quantile(sorted, 0.5)
  const text = summary ?? summariseHistogram(bins, sorted.length, median, unit)
  return (
    <>
      <ChartFrame definition={definition} ariaLabel={ariaLabel} height={height} />
      {text === null ? null : <ChartSummary text={text} />}
      <ChartTable caption={ariaLabel} columns={[valueName, "Antall"]} rows={data.map((datum) => [datum.label, datum.value])} visible={showTable} />
    </>
  )
}
