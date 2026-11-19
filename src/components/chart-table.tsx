import { formatChartValue } from "../lib/chart-format"
import type { ChartRow } from "../lib/chart-rows"
import { Disclosure } from "./disclosure"

/**
 * The exact values a chart only draws, as a table a screen reader can move through: the chart itself takes no keyboard
 * focus, and a tooltip is for a pointer. By default invisible, so it is the same page for everyone else; in a box of its own, since a
 * table ignores the 1px height of `sr-only` and would stretch the page. With `visible` it is a table anyone can open («Vis tallene»), for a reader
 * who wants the numbers and has no pointer (a phone): the W3C asks that the long description is for everyone.
 */
export function ChartTable({ caption, columns, rows, visible = false }: { caption: string; columns: readonly string[]; rows: readonly ChartRow[]; visible?: boolean }) {
  const table = (
    <table className={visible ? "w-full border-collapse text-left text-sm tabular-nums" : undefined}>
      <caption className={visible ? "sr-only" : undefined}>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col" className={visible ? "text-muted-foreground py-1 pr-4 text-xs font-medium" : undefined}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <th scope="row" className={visible ? "py-1 pr-4 font-normal" : undefined}>
              {row[0]}
            </th>
            {row.slice(1).map((value, column) => (
              <td key={column} className={visible ? "py-1 pr-4" : undefined}>
                {typeof value === "number" ? formatChartValue(value) : value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
  return visible ? <Disclosure summary="Vis tallene">{table}</Disclosure> : <div className="sr-only">{table}</div>
}
