import { Fragment, type ReactNode } from "react"

import { Cover } from "./cover"
import { SrTableHead } from "./sr-table-head"

/** One row of a list of what the owner played, watched or read, the same in every app: the picture, what it was, who or what it was by, and when. */
export interface MediaRow {
  key: string
  /** The picture as the app serves it, `null` where there is none. */
  cover: string | null
  title: ReactNode
  /** Under the title: the artist, the show, the maker, and whatever else is worth a line (the rating, the place, the time played). */
  subtitle: ReactNode
  /** The day or the time, as text. */
  when: string
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

const AREAS = "grid grid-cols-[auto_1fr_auto] items-center gap-x-3 [grid-template-areas:'cover_title_when'_'cover_subtitle_when']"

/**
 * The rows of every log, the front pages' latest and the history alike: the picture, the title, a line under it and the
 * date. A table for a screen reader, which hears each cell with its column; the layout is a grid.
 */
export function MediaRows({ rows, coverRatio }: { rows: readonly MediaRow[]; coverRatio: "poster" | "square" }) {
  return (
    <table role="table" className="block">
      <SrTableHead columns={["Omslag", "Tittel", "Detaljer", "Dato"]} />
      <tbody role="rowgroup" className="grid gap-2">
        {rows.map((row) => (
          <tr role="row" key={row.key} className={AREAS}>
            <td role="cell" className="[grid-area:cover]">
              <Cover ratio={coverRatio} url={row.cover} />
            </td>
            <td role="rowheader" className="min-w-0 truncate font-medium [grid-area:title]">
              {row.title}
            </td>
            <td role="cell" className="min-w-0 truncate text-sm text-muted-foreground [grid-area:subtitle]">
              {row.subtitle}
            </td>
            <td role="cell" className="text-sm whitespace-nowrap text-muted-foreground [grid-area:when]">
              {row.when}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
