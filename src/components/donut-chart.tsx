import { ChartEmpty } from "./chart-empty"
import { ChartSummary } from "./chart-summary"
import { EMPTY_CHART_MESSAGE } from "../lib/chart-format"
import { type DonutInput, donutGradient, donutSlices, sliceColor } from "../lib/donut"

interface DonutChartProps {
  data: readonly DonutInput[]
  /** Names the chart for a screen reader, e.g. "Share of listening per genre". */
  ariaLabel: string
  /** How many items get their own slice; the rest are one «Andre». At most five: more is a ranking, not shares of a whole. */
  keep?: 1 | 2 | 3 | 4 | 5
  /** A text that says what the chart shows (the biggest share, how it divides), visible under it. */
  summary?: string
  /** What the chart says when there is no data (or only zero and negative values); «Ingen data i denne perioden.» by default. */
  emptyMessage?: string
  /** How a value reads in the legend, e.g. "12 plays"; the share is always shown. */
  formatValue?: (value: number) => string
}

const SHARE = new Intl.NumberFormat("nb-NO", { style: "percent", maximumFractionDigits: 0 })

/**
 * A ring of shares with its legend beside it, in CSS: a `conic-gradient` for the
 * ring and a grid for the legend, so it takes the page's colours (set
 * `--donut-base` on an ancestor to change the base colour) without a chart
 * library. The legend is the data, so no share is only readable from the colour.
 */
export function DonutChart({ data, ariaLabel, keep = 5, formatValue, summary, emptyMessage = EMPTY_CHART_MESSAGE }: DonutChartProps) {
  const slices = donutSlices(data, keep)
  if (slices.length === 0) return <ChartEmpty height={160} message={emptyMessage} />

  return (
    <>
    <figure
      aria-label={ariaLabel}
      className="@container grid items-center gap-x-8 gap-y-4 [grid-template-areas:'ring'_'legend'] sm:grid-cols-[auto_minmax(0,28rem)] sm:justify-center sm:[grid-template-areas:'ring_legend']"
    >
      <div
        aria-hidden="true"
        data-chart-mark=""
        className="mx-auto aspect-square w-40 rounded-full @2xl:w-56 @4xl:w-72 [grid-area:ring] [mask:radial-gradient(farthest-side,transparent_58%,black_59%)]"
        style={{ background: donutGradient(slices) }}
      />
      <ul className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5 text-sm [grid-area:legend]">
        {slices.map((slice, index) => (
          <li key={slice.label} className="contents">
            <span aria-hidden="true" data-chart-mark="" className="size-3 rounded-sm" style={{ background: sliceColor(index, slices.length, slice.other, slice.color) }} />
            <span className="min-w-0 truncate">{slice.label}</span>
            <span className="text-muted-foreground tabular-nums">
              {SHARE.format(slice.share)}
              {formatValue ? <span className="ml-3">{formatValue(slice.value)}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </figure>
    {summary === undefined ? null : <ChartSummary text={summary} />}
    </>
  )
}
