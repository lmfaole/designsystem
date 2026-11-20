import type { ReactNode } from "react"

import type { PictureSource } from "../lib/picture-sources"
import { barPercents, changeWords, type RankChange } from "../lib/ranked"
import { Icon } from "./icon"
import { Picture, type PictureCorners } from "./picture"
import { details } from "./picture-rows"
import { SrTableHead } from "./sr-table-head"

/** One place in a ranking. Its rank is its position in the list: the list is already in order, and the component counts. */
export interface RankedRow {
  key: string
  /** The picture's address, `null` where there is none; ignored when the list has no `ratio`. */
  picture?: string | null
  sources?: readonly PictureSource[]
  /** This row's shape, where it differs from the list's (see `PictureCorners`). */
  corners?: PictureCorners
  /** What is ranked: a name, a link to its page. It has the whole width. */
  title: ReactNode
  /** Under the title, after the change: by whom, from which album. Build it with `details`. */
  detail?: ReactNode
  /** What it scored, in words, at the end of the line under the title: «141 avspillinger». */
  value: string
  /** The same score as a number: the bars are drawn from it, each as a share of the largest. Without it the row has no bar. */
  amount?: number
  /** How the place moved since the list before; `null` where there was no list before. */
  change?: RankChange | null
}

const WITH_PICTURE = "grid-cols-[1.75rem_auto_minmax(0,1fr)_auto] [grid-template-areas:'rank_picture_title_title'_'rank_picture_detail_value'_'rank_picture_bar_bar']"
const WITHOUT_PICTURE = "grid-cols-[1.75rem_minmax(0,1fr)_auto] [grid-template-areas:'rank_title_title'_'rank_detail_value'_'rank_bar_bar']"

/**
 * A top list: the place of each thing, its picture, its name, how its place moved and what it scored, with a thin bar that
 * shows how far each is from the first. The places are counted by the list, so the order is the data's and nothing can be
 * numbered wrong. A table for a screen reader, which hears the place, the name and the score of a row together; the layout is a grid.
 * The change is always in words («Opp 3», «Ny») and the bar is decoration beside the score in words.
 */
export function RankedRows({ rows, ratio, corners = "normal", rankLabel = "Plass" }: { rows: readonly RankedRow[]; /** Pictures in front of the names, in this shape; none, and the rows have none. */ ratio?: "poster" | "square"; /** What kind of thing the list is of, as a shape (`PictureCorners`). */ corners?: PictureCorners; /** What the first column is called for a screen reader. */ rankLabel?: string }) {
  const bars = barPercents(rows.map((row) => row.amount))
  const withPicture = ratio !== undefined
  return (
    <table role="table" className="block">
      <SrTableHead columns={[rankLabel, ...(withPicture ? ["Bilde"] : []), "Navn", "Endring og mer", "Antall"]} />
      <tbody role="rowgroup" className="grid gap-y-3">
        {rows.map((row, index) => {
          const bar = bars[index] ?? null
          return (
            <tr role="row" key={row.key} className={`grid items-center gap-x-3 ${withPicture ? WITH_PICTURE : WITHOUT_PICTURE}`}>
              <td role="cell" className={`self-center text-lg font-semibold tabular-nums [grid-area:rank] ${index === 0 ? "" : "text-muted-foreground"}`}>
                {index + 1}
              </td>
              {withPicture ? (
                <td role="cell" className="[grid-area:picture]">
                  <Picture ratio={ratio} corners={row.corners ?? corners} src={row.picture ?? null} {...(row.sources === undefined ? {} : { sources: row.sources })} />
                </td>
              ) : null}
              <td role="rowheader" className="min-w-0 font-medium [grid-area:title] [overflow-wrap:anywhere]">
                {row.title}
              </td>
              <td role="cell" className="min-w-0 text-sm text-muted-foreground [grid-area:detail]">
                {details([row.change === undefined || row.change === null ? null : <ChangeNote key="change" change={row.change} />, row.detail])}
              </td>
              <td role="cell" className="text-right text-sm font-medium whitespace-nowrap tabular-nums [grid-area:value]">
                {row.value}
              </td>
              <td role="cell" aria-hidden="true" className="[grid-area:bar]">
                {bar === null ? null : (
                  <div className="bg-muted mt-1 h-1 rounded-full">
                    <div className="bg-foreground/70 h-full rounded-full" style={{ width: `${bar}%` }} />
                  </div>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** The words of a change, with a small arrow where it moved: the arrow is a hint for those who see it, the words are the meaning. */
function ChangeNote({ change }: { change: RankChange }) {
  const moved = (change.kind === "up" || change.kind === "down") && Math.round(change.by) >= 1
  return (
    <span className="inline-flex items-center gap-1">
      {moved ? <Icon name={change.kind === "up" ? "trend-up" : "trend-down"} size="sm" /> : null}
      {changeWords(change)}
    </span>
  )
}
