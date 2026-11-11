import type { ChartRow } from "../lib/chart-rows"

/**
 * The exact values a chart only draws, as a table a screen reader can move through: the chart itself takes no keyboard
 * focus, and a tooltip is for a pointer. Invisible, so it is the same page for everyone else; in a box of its own, since a
 * table ignores the 1px height of `sr-only` and would stretch the page.
 */
export function ChartTable({ caption, columns, rows }: { caption: string; columns: readonly string[]; rows: readonly ChartRow[] }) {
  return (
    <div className="sr-only">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row[0]}</th>
              {row.slice(1).map((value, column) => (
                <td key={column}>{typeof value === "number" ? value.toLocaleString("nb-NO") : value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
