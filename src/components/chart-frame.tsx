import type { ChartTooltipOptions } from "@tanstack/charts"
import { Chart, type ChartDefinition } from "@tanstack/charts/react"
import { tooltip } from "@tanstack/charts/tooltip"
import "../lib/css-variables"
import { cn } from "cn"

/** One value per category, the shape every chart here draws. */
export interface ChartDatum {
  label: string
  value: number
}

/**
 * The tooltip every chart here shares: the category as its title and one row
 * naming the value, e.g. "1990s" over "Plays 12". Without it the rows are the
 * channel names, `x` and `y`.
 */
export function datumTooltip(valueLabel: string, formatLabel: (label: string) => string = (label) => label) {
  const content: ChartTooltipOptions<ChartDatum>["content"] = (points) => {
    const datum = points[0]?.datum
    if (datum === undefined) return { rows: [] }
    return { title: formatLabel(datum.label), rows: [{ label: valueLabel, value: datum.value.toLocaleString() }] }
  }
  return { use: tooltip, content }
}

interface ChartFrameProps<TDatum> {
  definition: ChartDefinition<TDatum>
  ariaLabel: string
  height: number
  className?: string
  /** The colour of the series, for a chart of one thing that has a colour of its own (an album's cover); the theme's primary by default. */
  color?: string | undefined
}

/**
 * Where TanStack Charts meets the design system's theme: the series colour and
 * the tooltip come from the `theme.css` tokens, so a chart follows light and
 * dark mode with the rest of the page and no colour is written down here. A chart is not a control, so it does not take
 * keyboard focus (`keyboard: false`); the pointer's tooltip stays.
 */
export function ChartFrame<TDatum>({ definition, ariaLabel, height, className, color }: ChartFrameProps<TDatum>) {
  const chart = (
    <Chart
      definition={{ ...definition, keyboard: false }}
      ariaLabel={ariaLabel}
      height={height}
      className={cn(
        "text-muted-foreground w-full text-xs",
        "[--ts-chart-1:var(--chart-accent,var(--primary))] [--ts-chart-tooltip-background:var(--popover)] [--ts-chart-tooltip-color:var(--popover-foreground)]",
        "[--ts-chart-tooltip-border:1px_solid_var(--border)] [--ts-chart-tooltip-border-radius:var(--radius)]",
        className,
      )}
    />
  )
  return color === undefined ? chart : <div style={{ "--chart-accent": color }}>{chart}</div>
}
