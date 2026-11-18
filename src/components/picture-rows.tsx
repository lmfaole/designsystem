import { Fragment, type ReactNode } from "react"

import { Picture } from "./picture"
import { SrTableHead } from "./sr-table-head"

/** One row of a list of things with a picture: the picture, what it is, a line under it, and a short note (a date, a count) at the end of that line. */
export interface PictureRow {
  key: string
  /** The picture's address, `null` where there is none. */
  picture: string | null
  title: ReactNode
  /** Under the title: whatever is worth a line (by whom, a rating, a place). Build it with `details`. */
  detail: ReactNode
  /** Ends the line under the title: a day, a time, a count. */
  aside: string
}

/** The parts of a row's line under the title, those it has, set apart by « · ». */
export function details(parts: readonly (ReactNode | null | undefined | false)[]): ReactNode {
  const present = parts.filter((part): part is ReactNode => part !== null && part !== undefined && part !== false && part !== "")
  return present.map((part, index) => (
    <Fragment key={index}>
      {index === 0 ? null : " · "}
      {part}
    </Fragment>
  ))
}

// The title has the whole width; the aside ends the line under it, so a long title never squeezes it into a narrow column.
const AREAS = "grid grid-cols-[auto_minmax(0,max-content)_auto_1fr] items-center gap-x-1 [grid-template-areas:'picture_title_title_title'_'picture_detail_aside_.']"

/**
 * Rows with a picture in one layout: the picture, the title, and under it a line that ends with a short note. A table for a
 * screen reader, which hears each cell with its column; the layout is a grid.
 */
export function PictureRows({ rows, ratio }: { rows: readonly PictureRow[]; ratio: "poster" | "square" }) {
  return (
    <table role="table" className="block">
      <SrTableHead columns={["Bilde", "Tittel", "Detaljer", "Notat"]} />
      <tbody role="rowgroup" className="grid gap-y-2">
        {rows.map((row) => (
          <tr role="row" key={row.key} className={AREAS}>
            <td role="cell" className="mr-2 [grid-area:picture]">
              <Picture ratio={ratio} src={row.picture} />
            </td>
            <td role="rowheader" className="min-w-0 truncate font-medium [grid-area:title]">
              {row.title}
            </td>
            <td role="cell" className="min-w-0 truncate text-sm text-muted-foreground [grid-area:detail]">
              {row.detail}
            </td>
            <td role="cell" className="text-sm whitespace-nowrap text-muted-foreground [grid-area:aside] before:content-['·_']">
              {row.aside}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
