import { heatColour } from "../lib/chart-colors"
import { EMPTY_CHART_MESSAGE, formatChartValue } from "../lib/chart-format"
import { summariseHeatMatrix, type Unit, unitWord } from "../lib/chart-summary-complex"
import { heatLevels } from "../lib/heatmap"
import { ChartEmpty } from "./chart-empty"
import { ChartSummary } from "./chart-summary"
import { ChartTable } from "./chart-table"
import { HeatLegend } from "./heat-legend"

export interface HeatCell {
  row: string
  column: string
  /** `null` is no data, which is not zero. */
  value: number | null
}

interface HeatmapProps {
  /** The rows (weekdays) and columns (hours) in the order to draw them. */
  rows: readonly string[]
  columns: readonly string[]
  cells: readonly HeatCell[]
  ariaLabel: string
  /** What a value counts: the plural alone, or `{ one, many }` so a count of one reads right. */
  unit: Unit
  /** Label every nth column only, for a crowded axis (24 hours: every 3rd). */
  labelEvery?: number
  /** What a row is, for the table's first column: «Ukedag». */
  rowName?: string
  /** Write the number in each cell: for a small matrix, where it is then read as a table of numbers with colour as help. */
  showValues?: boolean
  summary?: string
  showTable?: boolean
  emptyMessage?: string
}

/**
 * A matrix of two categories, a value in each cell as one of four steps: when something happens (weekday by hour), where two things meet. It
 * is for finding the pattern, not for reading a number; `showValues` writes the numbers in a small one. Steps are quantiles of the values above zero,
 * and a cell with no data is empty and not the lightest step.
 */
export function Heatmap({ rows, columns, cells, ariaLabel, unit, rowName = "Rad", labelEvery = 1, showValues = false, summary, showTable = false, emptyMessage = EMPTY_CHART_MESSAGE }: HeatmapProps) {
  if (cells.every((cell) => cell.value === null)) return <ChartEmpty height={96} message={emptyMessage} />
  const valueAt = new Map(cells.map((cell) => [`${cell.row}\u0000${cell.column}`, cell.value]))
  const level = heatLevels(cells.map((cell) => cell.value ?? 0))
  const text = summary ?? summariseHeatMatrix(cells, unit)
  return (
    <div className="grid gap-3">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${ariaLabel}, rull sideveis`}>
        <div role="img" aria-label={ariaLabel} className="text-muted-foreground grid w-max min-w-full gap-[3px] text-xs" style={{ gridTemplateColumns: `auto repeat(${columns.length}, minmax(${showValues ? 28 : 14}px, 1fr))` }}>
          <span />
          {columns.map((column, index) => (
            <span key={column} className="text-center" aria-hidden>
              {index % labelEvery === 0 ? column : ""}
            </span>
          ))}
          {rows.flatMap((row) => [
            <span key={row} className="pe-2 text-end leading-[1.6]" aria-hidden>
              {row}
            </span>,
            ...columns.map((column) => {
              const value = valueAt.get(`${row}\u0000${column}`) ?? null
              const step = level(value)
              return (
                <span
                  key={`${row}-${column}`}
                  aria-hidden
                  title={`${row}, ${column}: ${value === null ? "ingen data" : `${formatChartValue(value)} ${unitWord(value, unit)}`}`}
                  className={`border-border grid min-h-6 place-items-center rounded-[3px] border text-[11px] tabular-nums ${step >= 2 ? "text-background" : "text-foreground"}`}
                  style={{ background: heatColour(step), forcedColorAdjust: "none" }}
                >
                  {showValues && value !== null ? formatChartValue(value) : null}
                </span>
              )
            }),
          ])}
        </div>
      </div>
      <HeatLegend />
      {text === null ? null : <ChartSummary text={text} />}
      <ChartTable
        caption={ariaLabel}
        columns={[rowName, ...columns]}
        rows={rows.map((row) => [row, ...columns.map((column) => valueAt.get(`${row}\u0000${column}`) ?? "–")])}
        visible={showTable}
      />
    </div>
  )
}
