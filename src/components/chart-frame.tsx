import type { ChartTooltipOptions } from "@tanstack/charts"
import { Chart, type ChartDefinition } from "@tanstack/charts/react"
import { tooltip } from "@tanstack/charts/tooltip"
import { useEffect, useRef, useState } from "react"
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
  /** The least height in px; the chart grows with its width (see `grow`). */
  height: number
  /** Whether the height follows the width, up to 480px (a fifth of a wide chart, not a flat strip); off for a chart whose height is its rows. */
  grow?: boolean
  /** The colour of the series, for a chart of one thing that has a colour of its own (an album's cover); the theme's primary by default. */
  color?: string | undefined
}

/**
 * Where TanStack Charts meets the design system's theme: the series colour and
 * the tooltip come from the `theme.css` tokens, so a chart follows light and
 * dark mode with the rest of the page and no colour is written down here. A chart is not a control, so it does not take
 * keyboard focus (`keyboard: false`); the pointer's tooltip stays.
 */
export function ChartFrame<TDatum>({ definition, ariaLabel, height, grow = true, color }: ChartFrameProps<TDatum>) {
  const box = useRef<HTMLDivElement>(null)
  // 0 until measured, so the server and the first browser render agree on the numeric height.
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const element = box.current
    if (!grow || element === null) return
    const observer = new ResizeObserver(([entry]) => {
      // Rounded to 16px steps, so a scrollbar or a sub-pixel change cannot set off a resize loop.
      if (entry) setWidth(Math.round(entry.contentRect.width / 16) * 16)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [grow])
  const shownHeight = grow ? Math.round(Math.min(Math.max(height, width * 0.22), Math.max(height, 480))) : height
  const chart = (
    <Chart
      definition={{ ...definition, keyboard: false }}
      ariaLabel={ariaLabel}
      height={shownHeight}
      className={cn(
        "text-muted-foreground w-full text-xs",
        "[--ts-chart-1:var(--chart-accent,var(--primary))] [--ts-chart-tooltip-background:var(--popover)] [--ts-chart-tooltip-color:var(--popover-foreground)]",
        "[--ts-chart-tooltip-border:1px_solid_var(--border)] [--ts-chart-tooltip-border-radius:var(--radius)]",
      )}
    />
  )
  return (
    <div ref={box} className="w-full min-w-0" style={color === undefined ? undefined : { "--chart-accent": color }}>
      {chart}
    </div>
  )
}
