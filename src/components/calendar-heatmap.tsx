import { heatColour } from "../lib/chart-colors"
import { EMPTY_CHART_MESSAGE, formatChartValue } from "../lib/chart-format"
import { summariseCalendar, type Unit, unitWord } from "../lib/chart-summary-complex"
import { type CalendarDay, calendarWeeks, dayName, monthRows } from "../lib/heatmap"
import { ChartEmpty } from "./chart-empty"
import { ChartSummary } from "./chart-summary"
import { ChartTable } from "./chart-table"
import { HeatLegend } from "./heat-legend"

interface CalendarHeatmapProps {
  /** One row per day with something to say, `YYYY-MM-DD`; a day with no row is drawn as nothing, a row with 0 as zero. */
  days: readonly CalendarDay[]
  ariaLabel: string
  /** What a value counts: the plural alone («avspillinger»), or `{ one: "avspilling", many: "avspillinger" }` so a count of one reads right. */
  unit: Unit
  /** A text under the chart; `summariseCalendar` writes one by default. */
  summary?: string
  /** Offer the months as a table anyone can open (`Vis tallene`). */
  showTable?: boolean
  emptyMessage?: string
}

const WEEKDAYS = ["man.", "", "ons.", "", "fre.", "", ""]
const CELL = 14

/**
 * A day-by-day calendar, one column a week (Monday first), for rhythm: which days, which weekdays, which stretches had anything. Four steps from
 * the quantiles of the busy days (one huge day does not flatten the rest), and every step is also in the cell's title and the table by month.
 * Plain HTML on the server, no script; a year is wider than a phone, so it scrolls inside its own box. Not for a total, a trend or a comparison: those
 * are columns and lines.
 */
export function CalendarHeatmap({ days, ariaLabel, unit, summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: CalendarHeatmapProps) {
  const weeks = calendarWeeks(days)
  if (weeks.length === 0) return <ChartEmpty height={96} message={emptyMessage} />
  const text = summary ?? summariseCalendar(days, unit)
  return (
    <div className="grid gap-3">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${ariaLabel}, rull sideveis`}>
        <div role="img" aria-label={ariaLabel} className="grid w-max grid-cols-[auto_auto] gap-x-2 text-xs">
          <span />
          <div className="text-muted-foreground grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, ${CELL}px)` }} aria-hidden>
            {weeks.map((week, index) => (
              <span key={index} className="overflow-visible whitespace-nowrap">
                {week.month}
              </span>
            ))}
          </div>
          <div className="text-muted-foreground grid grid-rows-7 gap-[3px] text-end" aria-hidden>
            {WEEKDAYS.map((name, index) => (
              <span key={index} className="leading-[14px]">
                {name}
              </span>
            ))}
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, ${CELL}px)` }} aria-hidden>
            {weeks.flatMap((week, weekIndex) =>
              week.days.map((cell, dayIndex) =>
                cell === null ? (
                  <span key={`${weekIndex}-${dayIndex}`} />
                ) : (
                  <span
                    key={cell.date}
                    title={`${dayName(cell.date)}: ${cell.value === null ? "ingen data" : `${formatChartValue(cell.value)} ${unitWord(cell.value, unit)}`}`}
                    className="border-border size-[14px] rounded-[3px] border"
                    style={{ background: heatColour(cell.level), forcedColorAdjust: "none" }}
                  />
                ),
              ),
            )}
          </div>
        </div>
      </div>
      <HeatLegend />
      {text === null ? null : <ChartSummary text={text} />}
      <ChartTable caption={ariaLabel} columns={["Måned", `Sum (${unitWord(2, unit)})`, "Dager med noe"]} rows={monthRows(days)} visible={showTable} />
    </div>
  )
}
