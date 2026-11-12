import type { ReactNode } from "react"

import { LIST_COLUMNS } from "../lib/page-width"
import { SrTableHead } from "./sr-table-head"

export interface RowData {
  key: string
  /** The poster of a row, for `lead="poster"`; a rank is counted by the list. */
  lead?: ReactNode
  /** What the row is: a name, a link, a name with its line below. */
  body: ReactNode
  /** What it has: a count, a rating, a time. */
  trailing: ReactNode
}

const GAPS = { small: "gap-y-1", medium: "gap-y-2", large: "gap-y-3" } as const

interface RowsProps {
  rows: readonly RowData[]
  lead?: "rank" | "poster"
  gap?: keyof typeof GAPS
  /** What the columns are called for a screen reader, which hears them with every cell: the name, and what each row has. */
  columns?: { name?: string; value?: string }
}

/**
 * A list of rows in the one layout every app uses: the body on the left and what it has on the right, with a rank
 * (`lead="rank"`) or a poster (`lead="poster"`) in front where the list has one. The rows say what they hold; this
 * says how they are laid out, so a ranking looks the same wherever it is shown.
 *
 * It is a table, since a row is a name and what it has: the headers are for a screen reader only. The layout is a grid
 * and the roles are written out, so the table stays a table when `display` is not `table`.
 */
export function Rows({ rows, lead, gap = "medium", columns }: RowsProps) {
  const layout = lead === "rank" ? "grid-cols-[2rem_1fr_auto] items-baseline" : lead === "poster" ? "grid-cols-[auto_1fr_auto] items-center" : "grid-cols-[1fr_auto] items-baseline"
  return (
    <table role="table" className="block">
      <SrTableHead columns={[...(lead === undefined ? [] : [lead === "rank" ? "Rang" : "Omslag"]), columns?.name ?? "Navn", columns?.value ?? "Antall"]} />
      <tbody role="rowgroup" className={`grid ${LIST_COLUMNS} ${GAPS[gap]}`}>
        {rows.map((row, index) => (
          <tr role="row" key={row.key} className={`grid gap-x-3 ${layout}`}>
            {lead === "rank" ? (
              <td role="cell" className="text-sm text-muted-foreground tabular-nums">
                {index + 1}
              </td>
            ) : lead === "poster" ? (
              <td role="cell">{row.lead}</td>
            ) : null}
            <td role="rowheader" className="min-w-0 [overflow-wrap:anywhere]">
              {row.body}
            </td>
            <td role="cell" className="text-right text-sm whitespace-nowrap text-muted-foreground">
              {row.trailing}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
