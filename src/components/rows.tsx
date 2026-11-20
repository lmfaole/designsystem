import type { ReactNode } from "react"

import { Icon } from "./icon"
import type { IconName } from "../lib/icons"
import { SrTableHead } from "./sr-table-head"

export interface RowData {
  key: string
  /** The poster of a row, for `lead="poster"`; a rank is counted by the list. */
  lead?: ReactNode
  /** What the row is: a name, a link, a name with its line below. */
  body: ReactNode
  /** What it has: a count, a rating, a time. Leave it out of every row where the time or the count sits in the body's own line (a long title then has the whole width): the column is not drawn. */
  trailing?: ReactNode
  /** The kind of the row, for `lead="icon"`: a pull request, an issue, a kind of weather. */
  icon?: IconName
  /** What the icon means to a screen reader (`Pull request`); without it the icon is hidden, so give it where the kind is not in the words. */
  iconLabel?: string
  /** `destructive` for a kind that stops something; `muted` is the default. */
  iconTone?: "muted" | "destructive" | "primary"
}

interface RowsProps {
  rows: readonly RowData[]
  lead?: "rank" | "poster" | "icon"
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
export function Rows({ rows, lead, columns }: RowsProps) {
  const withValue = rows.some((row) => row.trailing !== undefined && row.trailing !== null)
  const layout = lead === "rank" ? (withValue ? "grid-cols-[2rem_1fr_auto] items-baseline" : "grid-cols-[2rem_1fr] items-baseline") : lead === "poster" ? (withValue ? "grid-cols-[auto_1fr_auto] items-center" : "grid-cols-[auto_1fr] items-center") : lead === "icon" ? (withValue ? "grid-cols-[1rem_1fr_auto] items-start" : "grid-cols-[1rem_1fr] items-start") : withValue ? "grid-cols-[1fr_auto] items-baseline" : "grid-cols-1"
  return (
    <table role="table" className="block">
      <SrTableHead columns={[...(lead === undefined ? [] : [lead === "rank" ? "Rang" : lead === "icon" ? "Type" : "Bilde"]), columns?.name ?? "Navn", ...(withValue ? [columns?.value ?? "Antall"] : [])]} />
      <tbody role="rowgroup" className="grid gap-y-2">
        {rows.map((row, index) => (
          <tr role="row" key={row.key} className={`grid gap-x-3 ${layout}`}>
            {lead === "rank" ? (
              <td role="cell" className="text-sm text-muted-foreground tabular-nums">
                {index + 1}
              </td>
            ) : lead === "poster" ? (
              <td role="cell">{row.lead}</td>
            ) : lead === "icon" ? (
              <td role="cell" className="pt-0.5">
                {row.icon === undefined ? null : <Icon name={row.icon} tone={row.iconTone ?? "muted"} {...(row.iconLabel === undefined ? {} : { label: row.iconLabel })} />}
              </td>
            ) : null}
            <td role="rowheader" className="min-w-0 [overflow-wrap:anywhere]">
              {row.body}
            </td>
            {withValue ? (
              <td role="cell" className="text-right text-sm whitespace-nowrap text-muted-foreground">
                {row.trailing}
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
